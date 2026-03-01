import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <footer className="relative bg-black pt-32 pb-12 overflow-hidden border-t border-white/5 cursor-none">

                {/* Giant Background Faded Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] text-center pointer-events-none select-none z-0">
                    <h1 className="text-[15vw] md:text-[18vw] font-heading font-black text-white/5 whitespace-nowrap leading-none tracking-tighter">
                        NFS STUDIO
                    </h1>
                </div>

                <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col items-center">

                    {/* Content */}
                    <div className="text-center mb-16">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-xl md:text-2xl font-sans font-light tracking-wide text-white/80 max-w-lg mx-auto"
                        >
                            Premium capturing of life's finest moments.
                        </motion.p>
                    </div>

                    {/* Bottom Bar */}
                    <div className="w-full flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-white/10 text-xs font-sans text-white/50 tracking-widest uppercase">
                        <div className="flex items-center gap-4 mb-4 md:mb-0">
                            <img src="/logo.jpg" alt="NFS Studio Logo" className="w-8 h-8 rounded-full border border-red/50 object-cover" />
                            <p>© {new Date().getFullYear()} NFS Photography. All Rights Reserved.</p>
                        </div>
                        <p className="text-gray-600 text-xs">
                            Built with passion by Nifras · 2026
                        </p>
                    </div>

                </div>
            </footer>

            {/* Fixed Scroll-to-Top Button */}
            <AnimatePresence>
                {showTopBtn && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-red text-white flex justify-center items-center hoverable cursor-none z-50 drop-shadow-[0_0_15px_rgba(230,57,70,0.5)] transform hover:scale-110 transition-transform"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 19V5M5 12l7-7 7 7" />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}
