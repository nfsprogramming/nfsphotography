import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { certificates } from '../data/certificates';

export default function Recognition() {
    const sealRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [certIndex, setCertIndex] = useState(0);

    useEffect(() => {
        if (!window.ScrollTrigger) return;

        gsap.fromTo(sealRef.current,
            { strokeDasharray: 1000, strokeDashoffset: 1000 },
            {
                strokeDashoffset: 0,
                duration: 3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sealRef.current,
                    start: "top 80%",
                }
            }
        );
    }, []);

    const handleNext = useCallback((e) => {
        if (e) e.stopPropagation();
        setCertIndex((prev) => (prev === certificates.length - 1 ? 0 : prev + 1));
    }, []);

    const handlePrev = useCallback((e) => {
        if (e) e.stopPropagation();
        setCertIndex((prev) => (prev === 0 ? certificates.length - 1 : prev - 1));
    }, []);

    const closeModal = useCallback(() => setIsModalOpen(false), []);

    useEffect(() => {
        if (!isModalOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeModal();
            if (certificates.length > 1) {
                if (e.key === 'ArrowRight') handleNext();
                if (e.key === 'ArrowLeft') handlePrev();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen, handleNext, handlePrev, closeModal]);

    const activeCert = certificates[certIndex];

    return (
        <section id="recognition" className="relative py-32 bg-black overflow-hidden flex flex-col items-center justify-center min-h-[60vh]">
            <div className="absolute inset-0 bg-gradient-to-br from-red/10 to-transparent pointer-events-none" />

            <motion.div
                initial={{ y: 150, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5, duration: 1.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative z-10 w-full max-w-4xl p-1 md:p-2 bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#AA7C11] rounded-lg shadow-[0_20px_50px_rgba(212,175,55,0.1)]"
            >
                <div className="bg-[#111] w-full h-full rounded-md p-10 md:p-20 text-center relative overflow-hidden backdrop-blur-xl flex flex-col items-center">

                    <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDINTUsMjU1LDAuMDUpIi8+PC9zdmc+')] pointer-events-none" />

                    <h2
                        className="text-4xl md:text-5xl font-heading mb-6 tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#D4AF37] animate-shimmer"
                        style={{ backgroundSize: '200% auto' }}
                    >
                        Certificate of Recognition
                    </h2>

                    <p className="text-white/60 font-sans max-w-2xl mx-auto leading-relaxed mb-12 text-sm md:text-base">
                        Presented to <span className="text-white font-semibold flex items-center justify-center gap-2 mt-2"><img src="/logo.jpg" alt="NFS" className="w-5 h-5 rounded-full inline-block object-cover" /> Nifras</span> for outstanding achievements and contributions in the field of modern mobile photography, mastering composition and light to capture the unseen.
                    </p>

                    <div className="flex justify-center items-center mt-8 group relative" title="View Certificates">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="relative rounded-full hoverable transition-all duration-300 transform group-hover:scale-105 active:scale-95 z-20"
                        >
                            <div className="absolute inset-0 bg-red/30 rounded-full scale-0 active:scale-150 transition-transform duration-500 opacity-0 active:opacity-100 blur-md pointer-events-none" />

                            <svg
                                ref={sealRef}
                                width="140" height="140" viewBox="0 0 100 100"
                                className="transform group-hover:rotate-[5deg] group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.8)] transition-all duration-500"
                            >
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#D4AF37" strokeWidth="2" />
                                <circle cx="50" cy="50" r="38" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4" />
                                <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="#D4AF37" fontSize="12" fontFamily="Cormorant Garamond" fontWeight="bold" letterSpacing="2">
                                    AWARD
                                </text>
                                <path d="M 50 15 A 35 35 0 0 1 85 50" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
                                <path d="M 50 85 A 35 35 0 0 1 15 50" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
                            </svg>
                        </button>
                        <div className="absolute -bottom-10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] tracking-widest uppercase text-[#D4AF37]/90 font-sans">
                            Click to View Certificates
                        </div>
                    </div>

                </div>
            </motion.div>

            {/* Certificate Lightbox Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 lg:p-12 cursor-none"
                        onClick={closeModal}
                    >
                        <motion.div
                            key={activeCert.id}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.85 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="relative flex flex-col items-center hoverable w-full max-w-4xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={activeCert.image}
                                alt={activeCert.title}
                                className="max-w-full lg:max-w-3xl max-h-[60vh] object-contain border-2 border-[#D4AF37] shadow-[0_0_60px_rgba(212,175,55,0.3)] mb-6 user-select-none"
                            />

                            <div className="text-center w-full max-w-2xl px-4 flex flex-col items-center">
                                <h3 className="text-[#D4AF37] font-heading text-xl md:text-3xl mb-1 mt-2">{activeCert.title}</h3>
                                <p className="text-white/80 font-sans text-xs tracking-widest uppercase mb-1">{activeCert.issuer}</p>
                                <p className="text-white/40 font-sans text-[0.65rem] uppercase mb-6">{activeCert.event} &bull; {activeCert.year}</p>

                                <a
                                    href={activeCert.image}
                                    download
                                    className="inline-flex items-center justify-center gap-2 border border-[#D4AF37] text-[#D4AF37] px-6 py-2 rounded-sm uppercase tracking-widest text-[0.65rem] font-sans hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 hoverable cursor-none"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" y1="15" x2="12" y2="3"></line>
                                    </svg>
                                    Download
                                </a>
                            </div>
                        </motion.div>

                        {/* X Button */}
                        <button className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-red transition-colors hoverable z-[10001] p-4" onClick={closeModal}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        {/* Pagination Nav Arrows */}
                        {certificates.length > 1 && (
                            <>
                                <button className="absolute left-1 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#D4AF37] transition-colors hoverable p-4 z-[10001]" onClick={handlePrev}>
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 18 9 12 15 6"></polyline>
                                    </svg>
                                </button>
                                <button className="absolute right-1 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#D4AF37] transition-colors hoverable p-4 z-[10001]" onClick={handleNext}>
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </button>
                            </>
                        )}

                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
