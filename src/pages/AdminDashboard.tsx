import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ShoppingCart, BarChart3, Plus, Trash2, Eye, EyeOff, Upload, LogOut, Lock, X, Image as ImageIcon, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Tables } from '@/integrations/supabase/types';
import SiteContentEditor from '@/components/admin/SiteContentEditor';

const ADMIN_PASSWORD = 'artin2024';

type AdminProduct = Tables<'admin_products'>;
type Order = Tables<'orders'>;
type Tab = 'analytics' | 'products' | 'orders' | 'content';

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState<Tab>('analytics');
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  // Product form
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '', description: '', price: '', quantity: '', category: 'Graphic Tees',
    sizes: ['M', 'L', 'XL'], colors: ['Black'], badge: '',
    is_featured: false, is_best_seller: false, is_new: false,
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // Order detail
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [{ data: prods }, { data: ords }] = await Promise.all([
      supabase.from('admin_products').select('*').order('created_at', { ascending: false }),
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
    ]);
    setProducts(prods || []);
    setOrders(ords || []);
    setLoading(false);
  }, []);

  useEffect(() => { if (authenticated) fetchData(); }, [authenticated, fetchData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      toast.success('Welcome, Admin!');
    } else {
      toast.error('Incorrect password');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setImageFiles(prev => [...prev, ...files]);
    setImagePreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
    e.target.value = '';
  };

  const removeImageAt = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) { toast.error('Name and price are required'); return; }
    setSubmitting(true);

    const uploadedUrls: string[] = [];
    for (const file of imageFiles) {
      const ext = file.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('product-images').upload(path, file);
      if (uploadError) { toast.error('Image upload failed'); setSubmitting(false); return; }
      const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(path);
      uploadedUrls.push(urlData.publicUrl);
    }

    const { error } = await supabase.from('admin_products').insert({
      name: form.name,
      description: form.description,
      price: parseInt(form.price),
      quantity: parseInt(form.quantity) || 0,
      category: form.category,
      sizes: form.sizes,
      colors: form.colors,
      badge: form.badge || null,
      image_url: uploadedUrls[0] || '',
      images: uploadedUrls,
      is_featured: form.is_featured,
      is_best_seller: form.is_best_seller,
      is_new: form.is_new,
    });

    if (error) { toast.error('Failed to add product'); }
    else {
      toast.success('Product added!');
      setForm({ name: '', description: '', price: '', quantity: '', category: 'Graphic Tees', sizes: ['M', 'L', 'XL'], colors: ['Black'], badge: '', is_featured: false, is_best_seller: false, is_new: false });
      setImageFiles([]); setImagePreviews([]); setShowForm(false);
      fetchData();
    }
    setSubmitting(false);
  };

  const handleDeleteProduct = async (id: string) => {
    const { error } = await supabase.from('admin_products').delete().eq('id', id);
    if (!error) { toast.success('Product deleted'); fetchData(); }
  };

  const handleUpdateOrderStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('orders').update({ status }).eq('id', id);
    if (!error) { toast.success(`Order marked as ${status}`); fetchData(); }
  };

  const totalProductValue = products.reduce((s, p) => s + p.price * p.quantity, 0);
  const totalStock = products.reduce((s, p) => s + p.quantity, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

  // Login gate
  if (!authenticated) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mx-auto mb-6">
              <Lock className="w-7 h-7 text-accent" />
            </div>
            <h1 className="font-display text-2xl font-black text-center mb-1">Admin Access</h1>
            <p className="text-muted-foreground text-sm text-center mb-6">Enter password to continue</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="text-center pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-bold rounded-full">
                Unlock Dashboard
              </Button>
            </form>
          </div>
        </motion.div>
      </section>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
    { id: 'products', label: 'Products', icon: <Package size={18} /> },
    { id: 'content', label: 'Landing Page', icon: <Layout size={18} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart size={18} /> },
  ];

  return (
    <section className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-black">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm">Manage your store</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setAuthenticated(false)} className="gap-2">
            <LogOut size={14} /> Logout
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-card border border-border rounded-xl p-1 mb-8 w-fit">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${tab === t.id ? 'bg-accent text-accent-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {t.icon} <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Analytics Tab */}
            {tab === 'analytics' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Products', value: products.length, color: 'bg-blue-500/10 text-blue-600' },
                    { label: 'Total Stock', value: totalStock, color: 'bg-emerald-500/10 text-emerald-600' },
                    { label: 'Inventory Value', value: `৳${totalProductValue.toLocaleString()}`, color: 'bg-purple-500/10 text-purple-600' },
                    { label: 'Total Orders', value: orders.length, color: 'bg-accent/10 text-accent' },
                  ].map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                      className="bg-card border border-border rounded-xl p-4 sm:p-6">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="font-display text-xl sm:text-3xl font-black">{stat.value}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-display font-bold mb-4">Pending Orders</h3>
                    <p className="font-display text-4xl font-black text-accent">{pendingOrders}</p>
                    <p className="text-sm text-muted-foreground mt-1">orders awaiting fulfillment</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-display font-bold mb-4">Total Revenue</h3>
                    <p className="font-display text-4xl font-black text-emerald-600">৳{totalRevenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground mt-1">from all orders</p>
                  </div>
                </div>

                {/* Product breakdown */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-display font-bold mb-4">Product Inventory</h3>
                  {products.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No products added yet. Go to Products tab to add some.</p>
                  ) : (
                    <div className="space-y-3">
                      {products.map(p => (
                        <div key={p.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                          <div className="flex items-center gap-3">
                            {p.image_url ? (
                              <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center"><ImageIcon size={16} className="text-muted-foreground" /></div>
                            )}
                            <div>
                              <p className="font-medium text-sm">{p.name}</p>
                              <p className="text-xs text-muted-foreground">{p.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-sm">৳{p.price}</p>
                            <p className="text-xs text-muted-foreground">Qty: {p.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Products Tab */}
            {tab === 'products' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-bold">Products ({products.length})</h2>
                  <Button onClick={() => setShowForm(!showForm)} className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-display">
                    {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add Product</>}
                  </Button>
                </div>

                {/* Add Product Form */}
                <AnimatePresence>
                  {showForm && (
                    <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleAddProduct} className="bg-card border border-border rounded-xl p-6 space-y-4 overflow-hidden">
                      <h3 className="font-display font-bold">New Product</h3>

                      {/* Image upload (multiple) */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Product Images <span className="text-muted-foreground font-normal">(first image is the cover; you can add multiple)</span>
                        </label>
                        <div className="flex flex-wrap items-start gap-3">
                          {imagePreviews.map((src, i) => (
                            <div key={src} className="relative w-24 h-24 rounded-xl overflow-hidden border border-border group">
                              <img src={src} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                              {i === 0 && (
                                <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-accent text-accent-foreground text-[9px] font-bold uppercase">Cover</span>
                              )}
                              <button type="button" onClick={() => removeImageAt(i)}
                                className="absolute top-1 right-1 p-0.5 bg-background/90 rounded-full hover:bg-destructive hover:text-destructive-foreground transition-colors"><X size={12} /></button>
                            </div>
                          ))}
                          <label className="w-24 h-24 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-accent transition-colors">
                            <Upload size={20} className="text-muted-foreground mb-1" />
                            <span className="text-[10px] text-muted-foreground">{imagePreviews.length ? 'Add more' : 'Upload'}</span>
                            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Product Name *</label>
                          <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Tokyo Drift Tee" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Category</label>
                          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                            {['Graphic Tees', 'Oversized', 'Art Series', 'Typography'].map(c => <option key={c}>{c}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Price (BDT) *</label>
                          <Input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="1290" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Quantity</label>
                          <Input type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="50" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                          placeholder="Describe the product..." rows={3}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Badge (optional)</label>
                        <Input value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} placeholder="e.g. New, Best Seller, Limited" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Show on landing page</label>
                        <div className="flex flex-wrap gap-4">
                          <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input type="checkbox" checked={form.is_featured}
                              onChange={e => setForm({ ...form, is_featured: e.target.checked })}
                              className="w-4 h-4 accent-accent" />
                            Featured Collection
                          </label>
                          <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input type="checkbox" checked={form.is_best_seller}
                              onChange={e => setForm({ ...form, is_best_seller: e.target.checked })}
                              className="w-4 h-4 accent-accent" />
                            Best Sellers
                          </label>
                          <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input type="checkbox" checked={form.is_new}
                              onChange={e => setForm({ ...form, is_new: e.target.checked })}
                              className="w-4 h-4 accent-accent" />
                            Mark as New
                          </label>
                        </div>
                      </div>

                      <Button type="submit" disabled={submitting} className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-display font-bold">
                        {submitting ? 'Adding...' : 'Add Product'}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Product list */}
                {products.length === 0 ? (
                  <div className="text-center py-16 text-muted-foreground">
                    <Package size={48} className="mx-auto mb-4 opacity-30" />
                    <p className="font-display font-bold text-lg">No products yet</p>
                    <p className="text-sm mt-1">Click "Add Product" to get started</p>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {products.map(p => (
                      <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex items-center gap-4 bg-card border border-border rounded-xl p-4">
                        {p.image_url ? (
                          <img src={p.image_url} alt={p.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            <ImageIcon size={24} className="text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-display font-bold text-sm truncate">{p.name}</h4>
                            {p.badge && <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-accent/10 text-accent rounded-full">{p.badge}</span>}
                            {p.is_featured && <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-primary/10 text-primary rounded-full">Featured</span>}
                            {p.is_best_seller && <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-destructive/10 text-destructive rounded-full">Best Seller</span>}
                            {p.is_new && <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-green-500/10 text-green-600 rounded-full">New</span>}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{p.category} · Qty: {p.quantity}</p>
                          <p className="text-xs text-muted-foreground truncate">{p.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-sm">৳{p.price}</p>
                          <button onClick={() => handleDeleteProduct(p.id)} className="text-destructive hover:text-destructive/80 mt-1">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Landing Page CMS Tab */}
            {tab === 'content' && <SiteContentEditor />}

            {/* Orders Tab */}
            {tab === 'orders' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <h2 className="font-display text-lg font-bold">Orders ({orders.length})</h2>

                {orders.length === 0 ? (
                  <div className="text-center py-16 text-muted-foreground">
                    <ShoppingCart size={48} className="mx-auto mb-4 opacity-30" />
                    <p className="font-display font-bold text-lg">No orders yet</p>
                    <p className="text-sm mt-1">Orders will appear here when customers place them</p>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {orders.map(o => (
                      <motion.div key={o.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="bg-card border border-border rounded-xl p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-display font-bold text-sm">{o.customer_name}</h4>
                              <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                                o.status === 'pending' ? 'bg-yellow-500/10 text-yellow-600' :
                                o.status === 'confirmed' ? 'bg-blue-500/10 text-blue-600' :
                                o.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-600' :
                                'bg-muted text-muted-foreground'
                              }`}>{o.status}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{o.customer_phone} · {o.customer_email}</p>
                            <p className="text-xs text-muted-foreground">{o.customer_address}, {o.customer_city}</p>
                            <p className="text-xs text-muted-foreground mt-1">Payment: {o.payment_method}</p>
                            <p className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-display font-bold">৳{o.total}</p>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(o)} className="mt-1 gap-1 text-xs">
                              <Eye size={12} /> Details
                            </Button>
                          </div>
                        </div>

                        {/* Status actions */}
                        <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                          {['pending', 'confirmed', 'shipped', 'delivered'].map(s => (
                            <button key={s} onClick={() => handleUpdateOrderStatus(o.id, s)}
                              className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full border transition-colors ${
                                o.status === s ? 'bg-accent text-accent-foreground border-accent' : 'border-border hover:border-foreground/30'
                              }`}>{s}</button>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedOrder(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-lg">Order Details</h3>
                <button onClick={() => setSelectedOrder(null)}><X size={18} /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Customer</p>
                  <p className="font-medium text-sm">{selectedOrder.customer_name}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customer_email}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customer_phone}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Shipping Address</p>
                  <p className="text-sm">{selectedOrder.customer_address}</p>
                  <p className="text-sm">{selectedOrder.customer_city} {selectedOrder.customer_zip}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Items Ordered</p>
                  <div className="space-y-2">
                    {(Array.isArray(selectedOrder.items) ? selectedOrder.items : []).map((item: any, i: number) => (
                      <div key={i} className="flex justify-between text-sm py-1 border-b border-border last:border-0">
                        <span>{item.name} ({item.size}, {item.color}) × {item.quantity}</span>
                        <span className="font-medium">৳{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-3 space-y-1">
                  <div className="flex justify-between text-sm"><span>Subtotal</span><span>৳{selectedOrder.subtotal}</span></div>
                  {selectedOrder.discount > 0 && <div className="flex justify-between text-sm text-accent"><span>Discount</span><span>-{selectedOrder.discount}%</span></div>}
                  <div className="flex justify-between font-display font-bold text-base"><span>Total</span><span>৳{selectedOrder.total}</span></div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Payment</p>
                  <p className="text-sm font-medium">{selectedOrder.payment_method}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}