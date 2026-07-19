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
      <div className="min-w-[2.5rem] sm:min-w-[3rem] px-2 py-1.5 rounded-md bg-background/95 text-foreground font-display font-bold text-base sm:text-lg tabular-nums shadow-sm">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-[9px] uppercase tracking-widest mt-1 opacity-80">{label}</span>
    </div>
  );
}

export default function PromoBanner() {
  const { content, loading } = useSiteContent('promo_banner', PROMO_BANNER_DEFAULT);
  const countdown = useCountdown(content.endDate);

  if (loading || !content.enabled) return null;

  const href = content.ctaHref || '/shop';

  return (
    <section className="py-10 sm:py-14 md:py-20 px-4 sm:px-6">
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
            className="group relative block overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/60"
          >
            {/* Image layer */}
            <div className="relative aspect-[16/10] sm:aspect-[21/9] md:aspect-[24/9] w-full bg-primary">
              {content.imageUrl ? (
                <img
                  src={content.imageUrl}
                  alt={content.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-primary">
                  <Sparkles className="w-20 h-20 opacity-20" />
                </div>
              )}

              {/* Readability gradient: strong on left, fading to right */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10 sm:from-black/80 sm:via-black/40 sm:to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-center h-full p-5 sm:p-8 md:p-12 lg:p-14 max-w-[92%] sm:max-w-[70%] md:max-w-[60%] text-white">
                {content.eyebrow && (
                  <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3 sm:mb-4">
                    <Sparkles size={12} /> {content.eyebrow}
                  </span>
                )}
                <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-2 sm:mb-3 drop-shadow-lg">
                  {content.title}
                </h2>
                {content.subtitle && (
                  <p className="text-xs sm:text-sm md:text-base opacity-90 mb-3 sm:mb-5 max-w-lg line-clamp-2 sm:line-clamp-none">
                    {content.subtitle}
                  </p>
                )}

                {countdown && (
                  <div className="hidden sm:flex gap-2 mb-5">
                    <TimeBox value={countdown.days} label="Days" />
                    <TimeBox value={countdown.hours} label="Hrs" />
                    <TimeBox value={countdown.mins} label="Min" />
                    <TimeBox value={countdown.secs} label="Sec" />
                  </div>
                )}
              </div>

              {/* Bottom action bar */}
              <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between gap-3 px-4 sm:px-8 md:px-12 py-3 sm:py-4 bg-gradient-to-t from-black/85 to-transparent">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  {content.ctaLabel && (
                    <span className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-accent text-accent-foreground font-display font-bold text-xs sm:text-sm group-hover:gap-2.5 transition-all">
                      {content.ctaLabel}
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  )}
                  {content.accentText && (
                    <span className="hidden xs:inline-block font-mono text-[10px] sm:text-xs px-2.5 py-1.5 rounded-md bg-white/10 border border-white/25 text-white tracking-wider truncate">
                      {content.accentText}
                    </span>
                  )}
                </div>

                {countdown && (
                  <div className="sm:hidden flex items-center gap-1 text-white font-mono text-xs tabular-nums">
                    <span className="px-1.5 py-0.5 rounded bg-white/15">{String(countdown.days).padStart(2, '0')}d</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/15">{String(countdown.hours).padStart(2, '0')}h</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/15">{String(countdown.mins).padStart(2, '0')}m</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
