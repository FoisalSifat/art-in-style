import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { q: 'What is Art In?', a: 'Art In is a premium artistic streetwear brand that transforms everyday t-shirts into wearable art pieces, featuring designs from emerging artists worldwide.' },
  { q: 'What fabric do you use?', a: 'We use premium 220 GSM pure cotton for all our products, ensuring maximum comfort and durability.' },
  { q: 'How long does delivery take?', a: 'Nationwide delivery takes 3-5 business days. We also offer express delivery in select cities within 1-2 days.' },
  { q: 'What is your return policy?', a: 'We offer a 7-day hassle-free return policy. Items must be unworn and in original condition with tags attached.' },
  { q: 'Do you ship internationally?', a: 'Currently, we ship within Bangladesh. International shipping is coming soon!' },
  { q: 'How do I find my size?', a: 'Check the size guide on each product page. If you\'re between sizes, we recommend going one size up for a comfortable fit.' },
  { q: 'Can I cancel my order?', a: 'Orders can be cancelled within 2 hours of placement. Contact us immediately if you need to cancel.' },
  { q: 'Do you have a loyalty program?', a: 'Yes! Join our newsletter for exclusive drops, early access, and loyalty rewards coming soon.' },
];

export default function FAQ() {
  return (
    <section className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-3">Help Center</p>
          <h1 className="font-display text-5xl md:text-7xl font-black">FAQ</h1>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <AccordionItem value={`item-${i}`} className="border border-border rounded-lg px-4">
                <AccordionTrigger className="font-display font-bold text-sm hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">{faq.a}</AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
