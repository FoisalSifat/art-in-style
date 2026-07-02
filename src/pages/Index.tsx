import Hero from '@/components/home/Hero';
import Marquee from '@/components/home/Marquee';
import FeaturedCollection from '@/components/home/FeaturedCollection';
import BrandStory from '@/components/home/BrandStory';
import BestSellers from '@/components/home/BestSellers';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import InstagramGallery from '@/components/home/InstagramGallery';

const Index = () => {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedCollection />
      <BrandStory />
      <BestSellers />
      <WhyChooseUs />
      <InstagramGallery />
    </>
  );
};

export default Index;
