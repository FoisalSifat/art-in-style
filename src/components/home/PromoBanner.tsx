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
      <div className="min-w-[3rem] sm:min-w-[3.5rem] px-2 py-2 sm:py-2.5 rounded-lg bg-background/10 backdrop-blur-sm border border-background/20 font-display font-bold text-xl sm:text-2xl tabular-nums">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-[10px] uppercase tracking-widest mt-1 opacity-70">{label}</span>
    </div>
  );
}

export default function PromoBanner() {
  const { content, loading } = useSiteContent('promo_banner', PROMO_BANNER_DEFAULT);
  const countdown = useCountdown(content.endDate);

  if (loading || !content.enabled) return null;

  const imageFirst = content.layout === 'image-left';
  const overlay = content.layout === 'overlay';

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-primary text-primary-foreground shadow-2xl"
        >
          {overlay ? (
            <div className="relative min-h-[380px] sm:min-h-[460px] md:min-h-[520px]">
              {content.imageUrl && (
                <img
                  src={content.imageUrl}
                  alt={content.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40" />
              <div className="relative z-10 flex flex-col justify-center h-full min-h-[380px] sm:min-h-[460px] md:min-h-[520px] p-6 sm:p-10 md:p-14 max-w-2xl">
                <BannerContent content={content} countdown={countdown} />
              </div>
            </div>
          ) : (
            <div className={`grid md:grid-cols-2 ${imageFirst ? '' : ''}`}>
              <div className={`p-6 sm:p-10 md:p-14 flex flex-col justify-center ${imageFirst ? 'md:order-2' : ''}`}>
                <BannerContent content={content} countdown={countdown} />
              </div>
              <div className={`relative min-h-[240px] sm:min-h-[320px] md:min-h-[460px] ${imageFirst ? 'md:order-1' : ''}`}>
                {content.imageUrl ? (
                  <img
                    src={content.imageUrl}
                    alt={content.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-primary-foreground/5">
                    <Sparkles className="w-20 h-20 opacity-20" />
                  </div>
                )}
                <div className="md:hidden absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
              </div>
            </div>
          )}

          {/* Corner accent */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-accent/20 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}

function BannerContent({
  content,
  countdown,
}: {
  content: ReturnType<typeof useSiteContent<'promo_banner'>>['content'];
  countdown: { days: number; hours: number; mins: number; secs: number } | null;
}) {
  return (
    <>
      {content.eyebrow && (
        <span className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 sm:mb-5">
          <Sparkles size={12} /> {content.eyebrow}
        </span>
      )}
      <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-3 sm:mb-4">
        {content.title}
      </h2>
      {content.subtitle && (
        <p className="text-sm sm:text-base md:text-lg opacity-80 mb-5 sm:mb-6 max-w-lg">
          {content.subtitle}
        </p>
      )}

      {countdown && (
        <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-7">
          <TimeBox value={countdown.days} label="Days" />
          <TimeBox value={countdown.hours} label="Hrs" />
          <TimeBox value={countdown.mins} label="Min" />
          <TimeBox value={countdown.secs} label="Sec" />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {content.ctaLabel && (
          <Link
            to={content.ctaHref || '/shop'}
            className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-accent text-accent-foreground font-display font-bold text-sm sm:text-base hover:scale-[1.03] transition-transform"
          >
            {content.ctaLabel}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
        {content.accentText && (
          <span className="font-mono text-xs sm:text-sm px-3 py-2 rounded-md border border-dashed border-primary-foreground/40 tracking-wider">
            {content.accentText}
          </span>
        )}
      </div>
    </>
  );
}
