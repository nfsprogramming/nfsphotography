import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import gsap from 'gsap';
import { certificates } from '../data/certificates';

// Particle that shoots out from the seal on click
function GoldParticle({ angle, distance }) {
    const x = Math.cos((angle * Math.PI) / 180) * distance;
    const y = Math.sin((angle * Math.PI) / 180) * distance;
    return (
        <motion.div
            className="absolute w-1.5 h-1.5 rounded-full bg-[#D4AF37] pointer-events-none"
            style={{ top: '50%', left: '50%', translateX: '-50%', translateY: '-50%' }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x, y, opacity: 0, scale: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0, 0.8, 1] }}
        />
    );
}

export default function Recognition() {
    const sealRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [certIndex, setCertIndex] = useState(0);
    const [burst, setBurst] = useState(false);
    const [particles, setParticles] = useState([]);
    const sealControls = useAnimationControls();
    const ringControls = useAnimationControls();

    useEffect(() => {
        if (!window.ScrollTrigger) return;
        gsap.fromTo(sealRef.current,
            { strokeDasharray: 1000, strokeDashoffset: 1000 },
            {
                strokeDashoffset: 0, duration: 3, ease: "power2.out",
                scrollTrigger: { trigger: sealRef.current, start: "top 80%" }
            }
        );
    }, []);

    const handleSealClick = async () => {
        if (burst) return;

        // Spawn 16 particles in all directions
        setParticles(Array.from({ length: 16 }, (_, i) => ({
            id: i,
            angle: i * 22.5,
            distance: 80 + Math.random() * 40,
        })));
        setBurst(true);

        // Stage 1: fast spin + grow + golden glow pulse
        await sealControls.start({
            rotate: [0, 15, -10, 720],
            scale: [1, 1.15, 1.05, 1.4],
            filter: [
                'drop-shadow(0 0 0px #D4AF37)',
                'drop-shadow(0 0 30px #D4AF37)',
                'drop-shadow(0 0 60px #fff8dc)',
                'drop-shadow(0 0 100px #D4AF37)',
            ],
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
        });

        // Stage 2: implode to nothing
        await sealControls.start({
            scale: 0,
            opacity: 0,
            filter: 'drop-shadow(0 0 0px #D4AF37)',
            transition: { duration: 0.2, ease: 'easeIn' }
        });

        // Open modal
        setIsModalOpen(true);
        setBurst(false);
        setParticles([]);

        // Reset seal for next time
        sealControls.set({ scale: 1, opacity: 1, rotate: 0, filter: 'drop-shadow(0 0 0px #D4AF37)' });
    };

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
                        Presented to <span className="text-white font-semibold flex items-center justify-center gap-2 mt-2">
                            <img src="/logo.jpg" alt="NFS" className="w-5 h-5 rounded-full inline-block object-cover" /> Nifras
                        </span> for outstanding achievements and contributions in the field of modern mobile photography, mastering composition and light to capture the unseen.
                    </p>

                    {/* Seal + Particles */}
                    <div className="flex justify-center items-center mt-8 group relative" title="View Certificates">
                        <div className="relative flex items-center justify-center">

                            {/* Expanding ring on hover */}
                            <motion.div
                                className="absolute rounded-full border border-[#D4AF37]/30 pointer-events-none"
                                animate={{ width: [120, 170, 120], height: [120, 170, 120], opacity: [0.4, 0, 0.4] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            <motion.div
                                className="absolute rounded-full border border-[#D4AF37]/15 pointer-events-none"
                                animate={{ width: [140, 200, 140], height: [140, 200, 140], opacity: [0.2, 0, 0.2] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                            />

                            {/* Particles */}
                            {particles.map((p) => (
                                <GoldParticle key={p.id} angle={p.angle} distance={p.distance} />
                            ))}

                            {/* The seal button */}
                            <motion.button
                                onClick={handleSealClick}
                                animate={sealControls}
                                whileHover={{ scale: 1.08, filter: 'drop-shadow(0 0 16px rgba(212,175,55,0.7))' }}
                                className="relative rounded-full hoverable z-20 cursor-none"
                            >
                                <svg
                                    ref={sealRef}
                                    width="140" height="140" viewBox="0 0 100 100"
                                >
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#D4AF37" strokeWidth="2" />
                                    <circle cx="50" cy="50" r="38" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4" />
                                    <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="#D4AF37" fontSize="12" fontFamily="Cormorant Garamond" fontWeight="bold" letterSpacing="2">
                                        AWARD
                                    </text>
                                    <path d="M 50 15 A 35 35 0 0 1 85 50" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
                                    <path d="M 50 85 A 35 35 0 0 1 15 50" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
                                </svg>
                            </motion.button>
                        </div>

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
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center p-4 lg:p-12 cursor-none"
                        onClick={closeModal}
                    >
                        {/* Animated radial backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-black"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.96 }}
                            exit={{ opacity: 0 }}
                        />
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            initial={{ opacity: 0, scale: 0.3 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)',
                            }}
                        />

                        {/* Certificate card */}
                        <motion.div
                            key={activeCert.id}
                            initial={{ opacity: 0, y: 80, rotateX: 25, scale: 0.85 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -60, rotateX: -20, scale: 0.9 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
                            className="relative flex flex-col items-center hoverable w-full max-w-4xl z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Gold shimmer border around image */}
                            <motion.div
                                className="absolute -inset-3 rounded-lg pointer-events-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                style={{
                                    background: 'linear-gradient(135deg, #D4AF37, transparent, #D4AF37, transparent)',
                                    backgroundSize: '400% 400%',
                                    animation: 'shimmerBorder 3s linear infinite',
                                    borderRadius: 12,
                                    padding: 1,
                                }}
                            />

                            {/* Certificate image with scanline reveal */}
                            <motion.div className="relative overflow-hidden">
                                <motion.img
                                    src={activeCert.image}
                                    alt={activeCert.title}
                                    className="max-w-full lg:max-w-3xl max-h-[65vh] object-contain border-2 border-[#D4AF37]/60 shadow-[0_0_100px_rgba(212,175,55,0.35)] user-select-none block"
                                    initial={{ clipPath: 'inset(100% 0% 0% 0%)', filter: 'brightness(0.3) sepia(1)' }}
                                    animate={{ clipPath: 'inset(0% 0% 0% 0%)', filter: 'brightness(1) sepia(0)' }}
                                    transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                                />
                                {/* Scan line sweep */}
                                <motion.div
                                    className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent pointer-events-none"
                                    initial={{ top: '0%', opacity: 1 }}
                                    animate={{ top: '100%', opacity: 0 }}
                                    transition={{ duration: 0.9, delay: 0.15, ease: 'linear' }}
                                />
                            </motion.div>

                            <motion.div
                                className="text-center w-full max-w-2xl px-4 flex flex-col items-center relative z-10 mt-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <h3 className="text-[#D4AF37] font-heading text-xl md:text-3xl mb-1">{activeCert.title}</h3>
                                <p className="text-white/80 font-sans text-xs tracking-widest uppercase mb-1">{activeCert.issuer}</p>
                                <p className="text-white/40 font-sans text-[0.65rem] uppercase">{activeCert.event} &bull; {activeCert.year}</p>
                            </motion.div>
                        </motion.div>

                        {/* X Button */}
                        <motion.button
                            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-red transition-colors hoverable z-[10001] p-4 cursor-none"
                            onClick={closeModal}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </motion.button>

                        {certificates.length > 1 && (
                            <>
                                <button className="absolute left-1 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#D4AF37] transition-colors hoverable p-4 z-[10001] cursor-none" onClick={handlePrev}>
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 18 9 12 15 6" />
                                    </svg>
                                </button>
                                <button className="absolute right-1 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#D4AF37] transition-colors hoverable p-4 z-[10001] cursor-none" onClick={handleNext}>
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6" />
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
