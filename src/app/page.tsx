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
import ScrollToTop from '@/components/ScrollToTop';
import PageTransition from '@/components/animations/PageTransition';
import ErrorBoundary from '@/components/ErrorBoundary';

const marqueeItems = [
  'Supply Chain Optimization',
  'Process Analytics',
  'SAP Signavio',
  'SAP BW/4HANA',
  'BPMN 2.0',
  'Power BI',
  'KNIME',
  'ETL Data Pipelines',
  'KPI Tracking',
  'PPT Framework',
  'Agile Product Management',
  'Jira & Confluence',
  'Digital Transformation',
  'AI-Assisted Workflows',
  'Prompt Engineering',
];

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-nav">Skip to main content</a>
      <Navbar />
      <PageTransition>
        <main id="main-content">
          <ErrorBoundary><Hero /></ErrorBoundary>
          <ErrorBoundary><Marquee items={marqueeItems} speed={25} /></ErrorBoundary>
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
