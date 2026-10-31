import { motion } from 'framer-motion';
import { useSiteContent } from '@/hooks/useSiteContent';
import { BRAND_STORY_DEFAULT } from '@/lib/siteContentDefaults';

export default function BrandStory() {
  const { content } = useSiteContent('brand_story', BRAND_STORY_DEFAULT);

  return (
    <section className="py-16 sm:py-24 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            <p className="text-accent text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-2 sm:mb-3">{content.eyebrow}</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 sm:mb-6">
              {content.headlineLine1}<br />
              <span className="text-gradient">{content.headlineHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
              {content.paragraph1}
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              {content.paragraph2}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group order-1 md:order-2"
          >
            <div className="absolute -inset-3 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500" />
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={content.imageUrl}
                alt="Art In — Brand Story"
                className="w-full aspect-[4/5] sm:aspect-[3/4] object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
