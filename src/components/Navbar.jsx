import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#" className="logo">NFS <span className="text-accent">STUDIO</span></a>

        <div className="desktop-menu">
          <a href="#hero" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#gallery" className="nav-link">Gallery</a>
          <a href="#contact" className="nav-link btn-outline">Contact</a>
        </div>

        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <a href="#hero" onClick={() => setIsOpen(false)}>Home</a>
              <a href="#about" onClick={() => setIsOpen(false)}>About</a>
              <a href="#gallery" onClick={() => setIsOpen(false)}>Gallery</a>
              <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
