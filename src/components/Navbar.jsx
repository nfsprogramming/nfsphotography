import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const navLinks = ['About', 'Gallery', 'Recognition', 'Contact'];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (latest > 80) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    if (latest > previous && latest > 150 && !menuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-10% 0px -50% 0px" }
    );

    navLinks.forEach((item) => {
      const section = document.getElementById(item.toLowerCase());
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}
      >
        <div className="container mx-auto px-6 h-24 flex justify-between items-center selection:bg-red selection:text-white">
          {/* Brand */}
          <a href="#" className="font-heading font-bold text-2xl tracking-widest uppercase text-white hoverable cursor-none relative group z-[60]">
            <span className="text-red">NFS</span> STUDIO
            <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-red scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-12 font-sans text-xs tracking-[0.2em] font-medium uppercase z-[60]">
            {navLinks.map((item) => {
              const id = item.toLowerCase();
              const isActive = activeSection === id;
              return (
                <a
                  key={item}
                  href={`#${id}`}
                  className={`transition-colors hoverable cursor-none relative group pb-1 ${isActive ? 'text-red' : 'text-white/70 hover:text-white'}`}
                >
                  <span className="relative z-10">{item}</span>
                  {/* Underline for active state */}
                  {isActive && (
                    <motion.div layoutId="navIndicatorDesktop" className="absolute bottom-0 left-0 w-full h-[1px] bg-red" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-2 hoverable cursor-none z-[60] relative"
          >
            <span className={`w-full h-[2px] bg-white transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[10px]' : ''}`} />
            <span className={`w-full h-[2px] bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-[2px] bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[10px]' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <div className="flex flex-col gap-10 text-center font-heading text-4xl uppercase tracking-widest" onClick={(e) => e.stopPropagation()}>
              {navLinks.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`${activeSection === item.toLowerCase() ? 'text-red' : 'text-white/70'} hover:text-white transition-colors`}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
