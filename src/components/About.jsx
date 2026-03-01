import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';

const features = [
    { title: "Vision", desc: "Seeing what others overlook, capturing emotion." },
    { title: "Focus", desc: "Precision in every shot, mastering the light." },
    { title: "Light", desc: "Painting with shadows, finding the perfect contrast." }
];

export default function About() {
    const textRef = useRef(null);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end end"] });
    const yBg = useTransform(scrollYProgress, [0, 1], [-100, 100]);

    const bio = "I am a mobile photographer passionate about portraying the unseen beauty in everyday moments. Through my lens, I craft visual narratives that speak volumes without uttering an essential word. Master of lighting, framing, and capturing the rawest emotions in high-definition.";

    useEffect(() => {
        if (!window.ScrollTrigger) return;

        // Split text by word for GSAP reveal
        const words = bio.split(' ');
        if (textRef.current) {
            textRef.current.innerHTML = words.map(w => `<span class="inline-block hover:text-red transition-colors opacity-20">${w}</span>`).join(' ');

            const spans = textRef.current.querySelectorAll('span');

            gsap.to(spans, {
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 80%",
                    end: "bottom 50%",
                    scrub: 1,
                },
                opacity: 1,
                stagger: 0.1,
                ease: "none"
            });
        }
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen py-32 px-6 md:px-20 lg:px-32 overflow-hidden flex items-center" style={{ backgroundColor: '#0A0A0A' }}>
            {/* Giant Watermark */}
            <motion.div
                style={{ y: yBg }}
                className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-white/[0.04] font-heading select-none pointer-events-none z-0"
            >
                NIFRAS
            </motion.div>

            <div className="container mx-auto max-w-7xl z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left: Image Container */}
                    <div className="relative">
                        {/* Red Radial Glow Behind Image */}
                        <div
                            className="absolute inset-0 z-0 pointer-events-none transform scale-150"
                            style={{ background: 'radial-gradient(circle at center, rgba(230,57,70,0.15) 0%, transparent 70%)' }}
                        />
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="relative z-10 group aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-md cursor-none"
                        >
                            {/* Pseudo Scanline / Glitch Effect via CSS */}
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDINTUsMjU1LDAuMDUpIi8+PC9zdmc+')] mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-red/50 shadow-[0_0_0_rgba(230,57,70,0)] group-hover:shadow-[0_0_30px_rgba(230,57,70,0.5)] transition-all duration-500 z-20 pointer-events-none" />

                            <img
                                src="/nifras-portrait.jpg"
                                alt="Nifras Photography"
                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1554046920-90dcac824fb8?q=80&w=1000' }}
                                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
                            />
                        </motion.div>
                    </div>

                    {/* Right: Text Container */}
                    <div className="flex flex-col justify-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-heading mb-8 uppercase"
                        >
                            Meet The <span className="text-red">Photographer</span>
                        </motion.h2>

                        <div
                            ref={textRef}
                            className="text-xl md:text-2xl leading-relaxed font-sans text-offwhite/80 mb-12 max-w-2xl"
                        />

                        {/* 3D Flip Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: idx * 0.2 }}
                                    viewport={{ once: true }}
                                    className="h-32 [perspective:1000px] group cursor-none hoverable"
                                >
                                    <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                        {/* Front */}
                                        <div className="absolute inset-0 bg-black border border-white/10 [backface-visibility:hidden] flex items-center justify-center p-4 rounded-sm">
                                            <h3 className="text-2xl font-heading text-red uppercase tracking-widest">{feature.title}</h3>
                                        </div>
                                        {/* Back */}
                                        <div className="absolute inset-0 bg-red border border-red [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center p-4 rounded-sm text-center">
                                            <p className="text-sm text-white font-sans">{feature.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
