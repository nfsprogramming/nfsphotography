import React, { useEffect, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll } from 'framer-motion';

import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';

import PageTransition from './components/PageTransition';

const Stats = React.lazy(() => import('./components/Stats'));
const Gallery = React.lazy(() => import('./components/Gallery'));
const Process = React.lazy(() => import('./components/Process'));
const Recognition = React.lazy(() => import('./components/Recognition'));
const Contact = React.lazy(() => import('./components/Contact'));

gsap.registerPlugin(ScrollTrigger);

const ScrollBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 h-[2px] bg-red z-[100]"
      style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
    />
  );
};

const SectionSkeleton = () => (
  <div className="w-full h-96 animate-pulse bg-white/5 flex items-center justify-center">
    <div className="text-white/30 text-xs tracking-widest uppercase">Loading...</div>
  </div>
);

function App() {
  useEffect(() => {
    window.ScrollTrigger = ScrollTrigger;
  }, []);

  return (
    <>
      <ScrollBar />
      <div className="grain-overlay" />
      <div className="bg-orb top-[-10%] left-[-10%] w-[40vw] h-[40vw]" />
      <div className="bg-orb bottom-[10%] right-[-5%] w-[30vw] h-[30vw]" style={{ animationDelay: '-3s' }} />
      <div className="bg-orb top-[40%] left-[60%] w-[20vw] h-[20vw]" style={{ animationDelay: '-6s' }} />

      <CustomCursor />
      <Navbar />
      <PageTransition>
        <SmoothScroll>
          <div className="app w-full flex flex-col md-scrollbar">
            <Hero />
            <About />

            <Suspense fallback={<SectionSkeleton />}>
              <Stats />
              <Gallery />
              <Process />
              <Recognition />
              <Contact />
            </Suspense>

            <Footer />
          </div>
        </SmoothScroll>
      </PageTransition>
    </>
  );
}

export default App;
