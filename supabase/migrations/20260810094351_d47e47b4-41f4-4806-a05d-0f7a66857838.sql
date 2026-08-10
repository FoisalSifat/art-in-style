CREATE TABLE public.coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL,
  discount_type text NOT NULL DEFAULT 'percentage',
  discount_value numeric NOT NULL DEFAULT 0,
  min_order_amount integer NOT NULL DEFAULT 0,
  max_discount_amount integer,
  expires_at timestamptz,
  usage_limit integer,
  per_customer_limit integer,
  used_count integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  description text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX coupons_code_lower_idx ON public.coupons (lower(code));

GRANT SELECT, INSERT, UPDATE, DELETE ON public.coupons TO anon, authenticated;
GRANT ALL ON public.coupons TO service_role;

ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read coupons" ON public.coupons FOR SELECT USING (true);
CREATE POLICY "Anyone can insert coupons" ON public.coupons FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update coupons" ON public.coupons FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete coupons" ON public.coupons FOR DELETE USING (true);

CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON public.coupons
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.coupon_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id uuid NOT NULL REFERENCES public.coupons(id) ON DELETE CASCADE,
  code text NOT NULL,
  customer_email text,
  customer_phone text,
  order_id uuid,
  discount_amount integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX coupon_usage_coupon_idx ON public.coupon_usage (coupon_id);
CREATE INDEX coupon_usage_email_idx ON public.coupon_usage (lower(customer_email));

GRANT SELECT, INSERT, UPDATE, DELETE ON public.coupon_usage TO anon, authenticated;
GRANT ALL ON public.coupon_usage TO service_role;

ALTER TABLE public.coupon_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read coupon usage" ON public.coupon_usage FOR SELECT USING (true);
CREATE POLICY "Anyone can insert coupon usage" ON public.coupon_usage FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete coupon usage" ON public.coupon_usage FOR DELETE USING (true);

CREATE OR REPLACE FUNCTION public.validate_coupon(
  _code text,
  _subtotal integer,
  _email text DEFAULT NULL,
  _phone text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  c public.coupons%ROWTYPE;
  used_by_customer integer := 0;
  disc numeric := 0;
BEGIN
  SELECT * INTO c FROM public.coupons WHERE lower(code) = lower(trim(_code)) LIMIT 1;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('valid', false, 'reason', 'Invalid coupon code');
  END IF;

  IF NOT c.is_active THEN
    RETURN jsonb_build_object('valid', false, 'reason', 'This coupon is no longer active');
  END IF;

  IF c.expires_at IS NOT NULL AND c.expires_at < now() THEN
    RETURN jsonb_build_object('valid', false, 'reason', 'This coupon has expired');
  END IF;

  IF _subtotal < c.min_order_amount THEN
    RETURN jsonb_build_object('valid', false, 'reason', 'Minimum order of ' || c.min_order_amount || ' required');
  END IF;

  IF c.usage_limit IS NOT NULL AND c.used_count >= c.usage_limit THEN
    RETURN jsonb_build_object('valid', false, 'reason', 'This coupon has reached its usage limit');
  END IF;

  IF c.per_customer_limit IS NOT NULL AND (_email IS NOT NULL OR _phone IS NOT NULL) THEN
    SELECT count(*) INTO used_by_customer
    FROM public.coupon_usage u
    WHERE u.coupon_id = c.id
      AND (
        (_email IS NOT NULL AND lower(u.customer_email) = lower(_email))
        OR (_phone IS NOT NULL AND u.customer_phone = _phone)
      );
    IF used_by_customer >= c.per_customer_limit THEN
      RETURN jsonb_build_object('valid', false, 'reason', 'You have already used this coupon');
    END IF;
  END IF;

  IF c.discount_type = 'percentage' THEN
    disc := _subtotal * c.discount_value / 100.0;
  ELSE
    disc := c.discount_value;
  END IF;

  IF c.max_discount_amount IS NOT NULL AND disc > c.max_discount_amount THEN
    disc := c.max_discount_amount;
  END IF;

  IF disc > _subtotal THEN
    disc := _subtotal;
  END IF;

  RETURN jsonb_build_object(
    'valid', true,
    'coupon_id', c.id,
    'code', c.code,
    'discount_type', c.discount_type,
    'discount_value', c.discount_value,
    'discount_amount', round(disc)
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.validate_coupon(text, integer, text, text) TO anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.redeem_coupon(
  _code text,
  _discount_amount integer,
  _email text DEFAULT NULL,
  _phone text DEFAULT NULL,
  _order_id uuid DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  c public.coupons%ROWTYPE;
BEGIN
  SELECT * INTO c FROM public.coupons WHERE lower(code) = lower(trim(_code)) LIMIT 1;
  IF NOT FOUND THEN
    RETURN;
  END IF;

  UPDATE public.coupons SET used_count = used_count + 1 WHERE id = c.id;

  INSERT INTO public.coupon_usage (coupon_id, code, customer_email, customer_phone, order_id, discount_amount)
  VALUES (c.id, c.code, _email, _phone, _order_id, COALESCE(_discount_amount, 0));
END;
$$;

GRANT EXECUTE ON FUNCTION public.redeem_coupon(text, integer, text, text, uuid) TO anon, authenticated, service_role;

INSERT INTO public.coupons (code, discount_type, discount_value, description)
VALUES ('ARTIN10', 'percentage', 10, 'Legacy launch coupon - 10% off');
