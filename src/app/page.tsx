'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import HowIWork from '@/components/HowIWork';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SkipToContent from '@/components/SkipToContent';
import PageTransition from '@/components/animations/PageTransition';

// Dynamic import for custom cursor (client-side only)
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false,
});

const marqueeItems = [
  'Business Strategy',
  'Process Optimization',
  'SAP Signavio',
  'BPMN 2.0',
  'Power BI',
  'Data Analytics',
  'Project Management',
  'Technical Execution',
];

export default function Home() {
  return (
    <>
      <SkipToContent />
      <CustomCursor />
      <Navbar />
      <PageTransition>
        <main id="main-content">
          <Hero />
          <Marquee items={marqueeItems} speed={40} />
          <Services />
          <Projects />
          <HowIWork />
          <About />
          <Contact />
        </main>
      </PageTransition>
      <Footer />
    </>
  );
}
