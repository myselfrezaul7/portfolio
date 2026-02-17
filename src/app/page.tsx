'use client';

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
import ScrollToTop from '@/components/ScrollToTop';
import PageTransition from '@/components/animations/PageTransition';

const marqueeItems = [
  'Supply Chain Optimization',
  'Process Analytics',
  'SAP Signavio',
  'BPMN 2.0',
  'Power BI',
  'KNIME',
  'Data-Driven Operations',
  'Digital Transformation',
  'ERP Systems',
  'Lean Management',
];

export default function Home() {
  return (
    <>
      <SkipToContent />
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
      <ScrollToTop />
    </>
  );
}
