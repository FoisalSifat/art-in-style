import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Menu, X, Sun, Moon, Search, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useTheme } from '@/context/ThemeContext';

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="font-display text-2xl font-bold tracking-tight">
          ART <span className="text-accent">IN</span>
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
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/login" className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Account">
            <User size={18} />
          </Link>
          <Link to="/shop" className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Search">
            <Search size={18} />
          </Link>
          <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Wishlist">
            <Heart size={18} />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button onClick={() => setIsOpen(true)} className="relative p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Cart">
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(true)} className="p-2 md:hidden" aria-label="Menu">
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background"
          >
            <div className="flex items-center justify-between h-16 px-4">
              <span className="font-display text-2xl font-bold">ART <span className="text-accent">IN</span></span>
              <button onClick={() => setMobileOpen(false)} className="p-2">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col items-center gap-8 pt-16">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-3xl font-bold uppercase tracking-wider hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
