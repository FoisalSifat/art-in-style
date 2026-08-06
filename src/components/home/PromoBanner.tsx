import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSiteContent } from '@/hooks/useSiteContent';
import { PROMO_BANNER_DEFAULT } from '@/lib/siteContentDefaults';

function useCountdown(endDate: string) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!endDate) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [endDate]);

  if (!endDate) return null;
  const diff = new Date(endDate).getTime() - now;
  if (isNaN(diff) || diff <= 0) return null;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return { days, hours, mins, secs };
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="min-w-[2.25rem] sm:min-w-[2.75rem] px-1.5 sm:px-2 py-1 sm:py-1.5 rounded bg-background/95 text-foreground font-display font-bold text-sm sm:text-base tabular-nums shadow-sm">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-[8px] sm:text-[9px] uppercase tracking-widest mt-1 opacity-90">{label}</span>
    </div>
  );
}

export default function PromoBanner() {
  const { content, loading } = useSiteContent('promo_banner', PROMO_BANNER_DEFAULT);
  const countdown = useCountdown(content.endDate);

  if (loading || !content.enabled) return null;

  const href = content.ctaHref || '/shop';

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <Link
            to={href}
            aria-label={content.title}
            className="group relative block w-full overflow-hidden rounded-xl sm:rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/60"
          >
            {/* Background image — full banner */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/9] lg:aspect-[3/1] bg-muted overflow-hidden">
              {content.imageUrl ? (
                <img
                  src={content.imageUrl}
                  alt={content.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <Sparkles className="w-20 h-20 opacity-20" />
                </div>
              )}

              {/* Left-side gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent sm:hidden" />

              {/* Content overlaid on the image */}
              <div className="absolute inset-0 flex flex-col justify-center p-5 sm:p-8 md:p-12 lg:p-16">
                <div className="max-w-xl sm:max-w-2xl">
                  {content.eyebrow && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3 sm:mb-4">
                      {content.eyebrow}
                    </span>
                  )}

                  <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.05] tracking-tight mb-2 sm:mb-3">
                    {content.title}
                  </h2>

                  {content.subtitle && (
                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-lg sm:max-w-xl mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-none">
                      {content.subtitle}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    {content.ctaLabel && (
                      <span className="inline-flex items-center justify-center gap-2 w-fit px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-primary text-primary-foreground font-display font-bold text-sm group-hover:gap-3 transition-all">
                        {content.ctaLabel}
                        <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    )}

                    {countdown && (
                      <div className="flex gap-2 sm:gap-3">
                        <TimeBox value={countdown.days} label="Days" />
                        <TimeBox value={countdown.hours} label="Hrs" />
                        <TimeBox value={countdown.mins} label="Min" />
                        <TimeBox value={countdown.secs} label="Sec" />
                      </div>
                    )}
                  </div>

                  {content.accentText && !countdown && (
                    <span className="mt-4 inline-flex font-mono text-xs px-3 py-2 rounded-md bg-muted/80 border border-border text-muted-foreground tracking-wider">
                      {content.accentText}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
