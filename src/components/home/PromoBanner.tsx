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

  const heightClass: Record<string, string> = {
    auto: '',
    compact: 'h-[180px] sm:h-[240px] md:h-[280px]',
    standard: 'h-[260px] sm:h-[360px] md:h-[440px]',
    tall: 'h-[360px] sm:h-[500px] md:h-[620px]',
    fullscreen: 'h-[70vh] md:h-[85vh]',
  };
  const isAuto = (content.height ?? 'auto') === 'auto';
  const radius = content.rounded === false ? '' : 'rounded-xl sm:rounded-2xl';

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div className={`group block w-full ${radius}`}>
            {/* Full image — no text on top */}
            <div className={`w-full overflow-hidden bg-muted ${radius} ${isAuto ? '' : heightClass[content.height]}`}>
              {content.imageUrl ? (
                <picture>
                  {content.mobileImageUrl && (
                    <source media="(max-width: 640px)" srcSet={content.mobileImageUrl} />
                  )}
                  <img
                    src={content.imageUrl}
                    alt={content.title}
                    style={isAuto || content.fit === 'contain' ? undefined : { objectPosition: `center ${content.focalY ?? 50}%` }}
                    className={
                      isAuto
                        ? 'w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-[1.01]'
                        : `w-full h-full ${content.fit === 'contain' ? 'object-contain' : 'object-cover'} transition-transform duration-1000 group-hover:scale-[1.01]`
                    }
                  />
                </picture>
              ) : (
                <div className={`w-full ${isAuto ? 'aspect-[21/9]' : 'h-full'} flex items-center justify-center`}>
                  <Sparkles className="w-16 h-16 opacity-20" />
                </div>
              )}
            </div>

            {/* Text + CTA below the image */}
            <div className="mt-5 sm:mt-7 flex flex-col items-center text-center gap-3 sm:gap-4">
              <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-foreground leading-[1.1] tracking-tight">
                {content.title}
              </h2>

              {countdown && (
                <div className="flex gap-2 sm:gap-3">
                  <TimeBox value={countdown.days} label="Days" />
                  <TimeBox value={countdown.hours} label="Hrs" />
                  <TimeBox value={countdown.mins} label="Min" />
                  <TimeBox value={countdown.secs} label="Sec" />
                </div>
              )}

              {content.ctaLabel && (
                <Link
                  to={href}
                  className="inline-flex items-center justify-center gap-2 px-7 sm:px-9 py-2.5 sm:py-3 rounded-full bg-primary text-primary-foreground font-display font-bold text-sm hover:gap-3 transition-all cursor-pointer"
                >
                  {content.ctaLabel}
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
