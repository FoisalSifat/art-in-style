import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <section className="pt-24 pb-16 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="font-display text-7xl sm:text-9xl font-black text-accent mb-4">404</h1>
        <p className="font-display text-xl sm:text-2xl font-bold mb-2">Page Not Found</p>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-display font-bold px-6">
            <Link to="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full font-display font-bold px-6">
            <Link to="/shop">Browse Shop</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default NotFound;
