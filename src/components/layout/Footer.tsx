import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import logo from '@/assets/logo.jpeg';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <img src={logo} alt="Art In - Born To Be Different" className="h-12 w-auto mb-4" />
            <p className="text-muted-foreground text-sm leading-relaxed">Where art meets fashion. Premium artistic t-shirts for those who dare to stand out.</p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">Shop</h4>
            <div className="flex flex-col gap-2">
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Products</Link>
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">New Arrivals</Link>
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Best Sellers</Link>
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sale</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">Help</h4>
            <div className="flex flex-col gap-2">
              <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
              <Link to="/shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Shipping & Returns</Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms & Conditions</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 border border-border rounded-full hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" className="p-2 border border-border rounded-full hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" className="p-2 border border-border rounded-full hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Facebook"><Facebook size={18} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          © 2026 Art In. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
