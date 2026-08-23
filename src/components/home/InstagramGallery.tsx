import { motion } from 'framer-motion';
import { products } from '@/data/products';
import { useSiteContent } from '@/hooks/useSiteContent';
import { GALLERY_DEFAULT, INSTAGRAM_URL } from '@/lib/siteContentDefaults';

export default function InstagramGallery() {
  const { content } = useSiteContent('gallery', GALLERY_DEFAULT);

  const profileUrl = content.profileUrl || INSTAGRAM_URL;
  const items =
    content.images && content.images.length > 0
      ? content.images.filter((i) => i.url)
      : products.slice(0, 6).map((p, i) => ({ url: p.image, alt: `Instagram ${i + 1}`, href: '' }));

  if (items.length === 0) return null;

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-2 sm:mb-3 inline-block hover:underline"
          >
            {content.eyebrow}
          </a>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black">{content.title}</h2>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-1.5 sm:gap-2">
          {items.map((item, i) => (
            <motion.a
              key={i}
              href={item.href || profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="aspect-square overflow-hidden rounded-lg group cursor-pointer block"
            >
              <img
                src={item.url}
                alt={item.alt || `Art In gallery ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
