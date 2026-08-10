import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Pencil, X, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Tables } from '@/integrations/supabase/types';

type Coupon = Tables<'coupons'>;

const emptyForm = {
  code: '',
  discount_type: 'percentage',
  discount_value: '',
  min_order_amount: '',
  max_discount_amount: '',
  expires_at: '',
  usage_limit: '',
  per_customer_limit: '',
  description: '',
  is_active: true,
};

export default function CouponManager() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('coupons').select('*').order('created_at', { ascending: false });
    if (error) toast.error('Failed to load coupons');
    setCoupons(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { void load(); }, [load]);

  const resetForm = () => {
    setForm({ ...emptyForm });
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (c: Coupon) => {
    setForm({
      code: c.code,
      discount_type: c.discount_type,
      discount_value: String(c.discount_value),
      min_order_amount: c.min_order_amount ? String(c.min_order_amount) : '',
      max_discount_amount: c.max_discount_amount != null ? String(c.max_discount_amount) : '',
      expires_at: c.expires_at ? new Date(c.expires_at).toISOString().slice(0, 16) : '',
      usage_limit: c.usage_limit != null ? String(c.usage_limit) : '',
      per_customer_limit: c.per_customer_limit != null ? String(c.per_customer_limit) : '',
      description: c.description ?? '',
      is_active: c.is_active,
    });
    setEditingId(c.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    const code = form.code.trim().toUpperCase();
    if (!code) return toast.error('Coupon code is required');
    const value = Number(form.discount_value);
    if (!value || value <= 0) return toast.error('Enter a valid discount value');
    if (form.discount_type === 'percentage' && value > 100) return toast.error('Percentage cannot exceed 100');

    const duplicate = coupons.find(c => c.code.toLowerCase() === code.toLowerCase() && c.id !== editingId);
    if (duplicate) return toast.error('A coupon with this code already exists');

    const payload = {
      code,
      discount_type: form.discount_type,
      discount_value: value,
      min_order_amount: form.min_order_amount ? Math.round(Number(form.min_order_amount)) : 0,
      max_discount_amount: form.max_discount_amount ? Math.round(Number(form.max_discount_amount)) : null,
      expires_at: form.expires_at ? new Date(form.expires_at).toISOString() : null,
      usage_limit: form.usage_limit ? Math.round(Number(form.usage_limit)) : null,
      per_customer_limit: form.per_customer_limit ? Math.round(Number(form.per_customer_limit)) : null,
      description: form.description,
      is_active: form.is_active,
    };

    setSaving(true);
    const { error } = editingId
      ? await supabase.from('coupons').update(payload).eq('id', editingId)
      : await supabase.from('coupons').insert(payload);
    setSaving(false);

    if (error) {
      toast.error(error.message.includes('duplicate') ? 'This coupon code already exists' : 'Failed to save coupon');
      return;
    }
    toast.success(editingId ? 'Coupon updated' : 'Coupon created');
    resetForm();
    void load();
  };

  const toggleActive = async (c: Coupon) => {
    const { error } = await supabase.from('coupons').update({ is_active: !c.is_active }).eq('id', c.id);
    if (error) return toast.error('Failed to update coupon');
    toast.success(c.is_active ? 'Coupon paused' : 'Coupon activated');
    void load();
  };

  const remove = async (c: Coupon) => {
    if (!confirm(`Delete coupon ${c.code}? This cannot be undone.`)) return;
    const { error } = await supabase.from('coupons').delete().eq('id', c.id);
    if (error) return toast.error('Failed to delete coupon');
    toast.success('Coupon deleted');
    void load();
  };

  const statusOf = (c: Coupon) => {
    if (!c.is_active) return { label: 'Paused', cls: 'bg-muted text-muted-foreground' };
    if (c.expires_at && new Date(c.expires_at) < new Date()) return { label: 'Expired', cls: 'bg-destructive/15 text-destructive' };
    if (c.usage_limit != null && c.used_count >= c.usage_limit) return { label: 'Used up', cls: 'bg-destructive/15 text-destructive' };
    return { label: 'Active', cls: 'bg-accent/20 text-accent' };
  };

  const field = 'w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent no-spin';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-bold flex items-center gap-2">
          <Ticket size={18} /> Coupons ({coupons.length})
        </h2>
        <Button onClick={() => (showForm ? resetForm() : setShowForm(true))} size="sm" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
          {showForm ? <><X size={14} /> Cancel</> : <><Plus size={14} /> New Coupon</>}
        </Button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-4">
          <h3 className="font-display font-bold text-sm">{editingId ? 'Edit Coupon' : 'Create Coupon'}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Coupon Code *</label>
              <Input value={form.code} onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="EID2026" className="uppercase" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Discount Type *</label>
              <select value={form.discount_type} onChange={e => setForm({ ...form, discount_type: e.target.value })} className={field}>
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (৳)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Discount Value * {form.discount_type === 'percentage' ? '(%)' : '(৳)'}
              </label>
              <input type="number" value={form.discount_value} onChange={e => setForm({ ...form, discount_value: e.target.value })} placeholder={form.discount_type === 'percentage' ? '10' : '100'} className={field} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Minimum Order Amount (৳)</label>
              <input type="number" value={form.min_order_amount} onChange={e => setForm({ ...form, min_order_amount: e.target.value })} placeholder="0 = no minimum" className={field} />
            </div>
            {form.discount_type === 'percentage' && (
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Max Discount Cap (৳)</label>
                <input type="number" value={form.max_discount_amount} onChange={e => setForm({ ...form, max_discount_amount: e.target.value })} placeholder="Optional" className={field} />
              </div>
            )}
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Expiry Date</label>
              <input type="datetime-local" value={form.expires_at} onChange={e => setForm({ ...form, expires_at: e.target.value })} className={field} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Total Usage Limit</label>
              <input type="number" value={form.usage_limit} onChange={e => setForm({ ...form, usage_limit: e.target.value })} placeholder="Unlimited" className={field} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Limit Per Customer</label>
              <input type="number" value={form.per_customer_limit} onChange={e => setForm({ ...form, per_customer_limit: e.target.value })} placeholder="Unlimited" className={field} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-muted-foreground mb-1 block">Internal Note</label>
              <Input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Eid campaign 2026" />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="accent-[hsl(var(--accent))] w-4 h-4" />
            Active (customers can use it right now)
          </label>

          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={saving} className="bg-accent text-accent-foreground hover:bg-accent/90">
              {saving ? 'Saving...' : editingId ? 'Update Coupon' : 'Create Coupon'}
            </Button>
            <Button variant="outline" onClick={resetForm}>Cancel</Button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      ) : coupons.length === 0 ? (
        <p className="text-muted-foreground text-sm">No coupons yet. Create your first one.</p>
      ) : (
        <div className="grid gap-3">
          {coupons.map(c => {
            const status = statusOf(c);
            return (
              <div key={c.id} className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display font-bold tracking-wider">{c.code}</span>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold ${status.cls}`}>{status.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {c.discount_type === 'percentage' ? `${c.discount_value}% off` : `৳${c.discount_value} off`}
                    {c.min_order_amount > 0 && ` · Min ৳${c.min_order_amount}`}
                    {c.max_discount_amount != null && ` · Max ৳${c.max_discount_amount}`}
                    {c.expires_at && ` · Expires ${new Date(c.expires_at).toLocaleDateString()}`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Used {c.used_count}{c.usage_limit != null ? ` / ${c.usage_limit}` : ''}
                    {c.per_customer_limit != null && ` · ${c.per_customer_limit} per customer`}
                    {c.description && ` · ${c.description}`}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm" onClick={() => toggleActive(c)}>{c.is_active ? 'Pause' : 'Activate'}</Button>
                  <Button variant="outline" size="sm" onClick={() => startEdit(c)} className="gap-1"><Pencil size={14} /></Button>
                  <Button variant="outline" size="sm" onClick={() => remove(c)} className="gap-1 text-destructive hover:text-destructive"><Trash2 size={14} /></Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
