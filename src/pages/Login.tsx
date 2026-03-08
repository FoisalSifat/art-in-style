import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info('Authentication will be available when backend is connected.');
  };

  return (
    <section className="pt-24 pb-16 min-h-screen flex items-center">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Link to="/" className="font-display text-3xl font-bold">ART <span className="text-accent">IN</span></Link>
            <h1 className="font-display text-2xl font-bold mt-6">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p className="text-muted-foreground text-sm mt-2">{isLogin ? 'Sign in to your account' : 'Join the Art In family'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input type="text" placeholder="Full Name" required className="w-full px-4 py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            )}
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-bold py-6 rounded-full">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => setIsLogin(!isLogin)} className="text-accent font-medium hover:underline">
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>

          <Button variant="outline" className="w-full mt-4 py-6 rounded-full font-display" asChild>
            <Link to="/shop">Continue as Guest</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
