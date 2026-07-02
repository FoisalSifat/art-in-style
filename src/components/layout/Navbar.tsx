import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Menu, X, Sun, Moon, Store, Phone, Mail, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useTheme } from '@/context/ThemeContext';
import logo from '@/assets/logo.png';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const { wishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/60">
        <nav className="container mx-auto flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src={logo} alt="Art In" className="h-10 sm:h-20 w-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-accent ${
                  location.pathname === link.path ? 'text-accent' : 'text-foreground/70'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button onClick={toggleTheme} className="p-1.5 sm:p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Moon size={16} className="sm:w-[18px] sm:h-[18px]" />}
            </button>
            <Link to="/login" className="hidden sm:flex p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Account">
              <User size={18} />
            </Link>
            <Link to="/contact" className="hidden sm:flex p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Contact">
              <MessageCircle size={18} />
            </Link>
            <Link to="/wishlist" className="relative p-1.5 sm:p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Wishlist">
              <Heart size={16} className="sm:w-[18px] sm:h-[18px]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(true)} className="relative p-1.5 sm:p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Cart">
              <ShoppingBag size={16} className="sm:w-[18px] sm:h-[18px]" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={() => setMobileOpen(true)} className="p-1.5 sm:p-2 md:hidden" aria-label="Menu">
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — rendered OUTSIDE header so backdrop-filter doesn't trap fixed positioning */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{ backgroundColor: 'hsl(var(--background))' }}
            className="fixed inset-0 z-[60] flex flex-col"
          >
            <div className="flex items-center justify-between h-14 px-3 border-b border-border/30 shrink-0">
              <img src={logo} alt="Art In" className="h-10 w-auto" />
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Close menu">
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`font-display text-3xl font-bold uppercase tracking-wider transition-colors ${
                      location.pathname === link.path ? 'text-accent' : 'text-foreground hover:text-accent'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="border-t border-border/30 px-6 py-5 space-y-4 shrink-0"
            >
              <div className="flex items-center justify-center gap-6">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  <User size={20} />
                  <span className="text-[10px] uppercase tracking-wider font-medium">Account</span>
                </Link>
                <Link to="/shop" onClick={() => setMobileOpen(false)} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  <Store size={20} />
                  <span className="text-[10px] uppercase tracking-wider font-medium">Shop</span>
                </Link>
                <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  <Heart size={20} />
                  <span className="text-[10px] uppercase tracking-wider font-medium">Wishlist</span>
                </Link>
                <button onClick={() => { setMobileOpen(false); setIsOpen(true); }} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  <ShoppingBag size={20} />
                  <span className="text-[10px] uppercase tracking-wider font-medium">Cart</span>
                </button>
              </div>
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <a href="tel:01600052600" className="flex items-center gap-1 hover:text-foreground transition-colors">
                  <Phone size={12} /> 01600052600
                </a>
                <span>•</span>
                <a href="mailto:artinclo83@gmail.com" className="flex items-center gap-1 hover:text-foreground transition-colors">
                  <Mail size={12} /> Email Us
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
