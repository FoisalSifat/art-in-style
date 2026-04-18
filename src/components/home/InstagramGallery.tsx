import { motion } from 'framer-motion';
import { products } from '@/data/products';

export default function InstagramGallery() {
  const images = products.slice(0, 6).map(p => p.image);

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <a href="https://www.instagram.com/artin.clo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-accent text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-2 sm:mb-3 inline-block hover:underline">@artin.clo</a>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black">Follow The Art</h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5 sm:gap-2">
          {images.map((img, i) => (
            <motion.a
              key={i}
              href="https://www.instagram.com/artin.clo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="aspect-square overflow-hidden rounded-lg group cursor-pointer block"
            >
              <img src={img} alt={`Instagram ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
