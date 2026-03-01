import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function StarField() {
    const ref = useRef();
    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });
    return <Stars ref={ref} radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />;
}

export default function Hero() {
    const containerRef = useRef(null);
    const topTextRef = useRef(null);
    const bottomTextRef = useRef(null);

    useEffect(() => {
        if (!window.ScrollTrigger) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            }
        });

        tl.to(topTextRef.current, { y: -150, opacity: 0 }, 0)
            .to(bottomTextRef.current, { y: 150, opacity: 0 }, 0);

        return () => tl.kill();
    }, []);

    const typewriterStr = "BY NIFRAS PHOTOGRAPHER";

    return (
        <section ref={containerRef} className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-offwhite">
            {/* Three.js Background */}
            <div className="absolute inset-0 z-0 opacity-40">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <StarField />
                </Canvas>
            </div>

            {/* Viewfinder Brackets */}
            <motion.div initial={{ opacity: 0, x: -20, y: -20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-white/30 z-10" />
            <motion.div initial={{ opacity: 0, x: 20, y: -20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/30 z-10" />
            <motion.div initial={{ opacity: 0, x: -20, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/30 z-10" />
            <motion.div initial={{ opacity: 0, x: 20, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-white/30 z-10" />

            <div className="z-10 flex flex-col items-center select-none" style={{ perspective: '1000px' }}>
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative mb-8"
                >
                    <div className="absolute inset-0 rounded-full bg-red opacity-50 blur-xl animate-pulse-slow" />
                    <img
                        src="/logo.jpg"
                        alt="NFS Studio Logo"
                        className="w-24 h-24 rounded-full object-cover border-2 border-red/50 relative z-10"
                    />
                </motion.div>

                {/* Text Container splits on scroll */}
                <div className="relative text-center">
                    <div ref={topTextRef}>
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-7xl md:text-9xl font-bold tracking-tighter mix-blend-difference uppercase"
                        >
                            NFS
                        </motion.h1>
                    </div>

                    <div ref={bottomTextRef} className="flex flex-col items-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="text-5xl md:text-8xl font-bold tracking-tighter text-gradient animate-shimmer uppercase leading-tight"
                            style={{ backgroundSize: '200% auto' }}
                        >
                            Photography
                        </motion.h1>

                        {/* Typewriter Subtitle */}
                        <h2 className="mt-4 md:mt-8 text-sm md:text-lg tracking-[0.3em] font-sans text-white/70 h-8 uppercase mb-4">
                            {typewriterStr.split('').map((char, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.05, delay: 1 + index * 0.05 }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </h2>

                        {/* CTA Button */}
                        <motion.a
                            href="#gallery"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                            className="mt-6 px-8 py-3 bg-red text-white font-sans text-[0.8rem] tracking-widest uppercase border border-red hover:bg-white hover:text-red transition-all duration-300 hoverable z-20 cursor-none inline-block relative"
                        >
                            View My Work
                        </motion.a>
                    </div>
                </div>
            </div>

            {/* Explore indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-8 flex flex-col items-center gap-[24px] z-10 pointer-events-none"
            >
                <div className="w-[1px] h-[40px] bg-white/20 relative overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 w-full h-[50%] bg-red"
                        animate={{ y: ['-100%', '200%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    />
                </div>
                <span className="text-[10px] tracking-[0.2em] font-sans text-white/50 uppercase">Explore</span>
            </motion.div>
        </section>
    );
}
