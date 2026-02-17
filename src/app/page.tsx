'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import HowIWork from '@/components/HowIWork';
import SkillsRadar from '@/components/SkillsRadar';
import About from '@/components/About';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SkipToContent from '@/components/SkipToContent';
import ScrollToTop from '@/components/ScrollToTop';
import PageTransition from '@/components/animations/PageTransition';
import ErrorBoundary from '@/components/ErrorBoundary';

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
          <ErrorBoundary><Hero /></ErrorBoundary>
          <ErrorBoundary><Marquee items={marqueeItems} speed={40} /></ErrorBoundary>
          <ErrorBoundary><Services /></ErrorBoundary>
          <ErrorBoundary><Projects /></ErrorBoundary>
          <ErrorBoundary><HowIWork /></ErrorBoundary>
          <ErrorBoundary><SkillsRadar /></ErrorBoundary>
          <ErrorBoundary><About /></ErrorBoundary>
          <ErrorBoundary><Blog /></ErrorBoundary>
          <ErrorBoundary><Contact /></ErrorBoundary>
        </main>
      </PageTransition>
      <Footer />
      <ScrollToTop />
    </>
  );
}
