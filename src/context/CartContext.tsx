import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Product } from '@/data/products';
import { supabase } from '@/integrations/supabase/client';

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface AppliedCoupon {
  code: string;
  discountType: string;
  discountValue: number;
  discountAmount: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (product: Product, size: string, color: string) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  totalPrice: number;
  couponCode: string;
  setCouponCode: (code: string) => void;
  appliedCoupon: AppliedCoupon | null;
  discount: number;
  applyingCoupon: boolean;
  applyCoupon: (email?: string, phone?: string) => Promise<boolean>;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  const getStockFor = (product: Product, size: string) => {
    if (product.sizeStock && size in product.sizeStock) return product.sizeStock[size];
    return product.stock;
  };

  const addItem = useCallback((product: Product, size: string, color: string) => {
    const stock = getStockFor(product, size);
    if (stock !== undefined && stock <= 0) {
      toast.error(`${product.name}${product.sizeStock ? ` (${size})` : ''} is out of stock`);
      return;
    }
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size && i.color === color);
      const currentQty = existing?.quantity ?? 0;
      if (stock !== undefined && currentQty + 1 > stock) {
        toast.error(`Only ${stock} in stock${product.sizeStock ? ` for size ${size}` : ''}`);
        return prev;
      }
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.size === size && i.color === color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1, size, color }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, size: string, color: string) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.size === size && i.color === color)));
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, color: string, qty: number) => {
    if (qty <= 0) {
      removeItem(productId, size, color);
      return;
    }
    setItems(prev => prev.map(i => {
      if (!(i.product.id === productId && i.size === size && i.color === color)) return i;
      const stock = getStockFor(i.product, i.size);
      if (stock !== undefined && qty > stock) {
        toast.error(`Only ${stock} in stock${i.product.sizeStock ? ` for size ${i.size}` : ''}`);
        return { ...i, quantity: stock };
      }
      return { ...i, quantity: qty };
    }));
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
    setCouponCode('');
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  // Recalculate the discount against the live subtotal (percentage coupons scale,
  // fixed coupons never exceed the subtotal).
  let discount = 0;
  if (appliedCoupon) {
    discount = appliedCoupon.discountType === 'percentage'
      ? Math.round((subtotal * appliedCoupon.discountValue) / 100)
      : Math.round(appliedCoupon.discountAmount);
    if (discount > subtotal) discount = subtotal;
  }
  const totalPrice = Math.max(0, subtotal - discount);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setCouponCode('');
  }, []);

  const applyCoupon = useCallback(async (email?: string, phone?: string) => {
    const code = couponCode.trim();
    if (!code) {
      toast.error('Enter a coupon code');
      return false;
    }
    setApplyingCoupon(true);
    const { data, error } = await supabase.rpc('validate_coupon', {
      _code: code,
      _subtotal: Math.round(subtotal),
      _email: email ?? null,
      _phone: phone ?? null,
    });
    setApplyingCoupon(false);

    if (error) {
      toast.error('Could not check the coupon. Try again.');
      return false;
    }

    const result = data as unknown as {
      valid: boolean;
      reason?: string;
      code?: string;
      discount_type?: string;
      discount_value?: number;
      discount_amount?: number;
    };

    if (!result?.valid) {
      setAppliedCoupon(null);
      toast.error(result?.reason || 'Invalid coupon code');
      return false;
    }

    setAppliedCoupon({
      code: result.code!,
      discountType: result.discount_type!,
      discountValue: Number(result.discount_value),
      discountAmount: Number(result.discount_amount),
    });
    setCouponCode(result.code!);
    toast.success(`Coupon ${result.code} applied!`);
    return true;
  }, [couponCode, subtotal]);

  return (
    <CartContext.Provider value={{
      items, isOpen, setIsOpen, addItem, removeItem, updateQuantity, clearCart,
      totalItems, subtotal, totalPrice, couponCode, setCouponCode,
      appliedCoupon, discount, applyingCoupon, applyCoupon, removeCoupon,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
