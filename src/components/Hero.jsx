import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './Hero.css';

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section id="hero" className="hero-section" ref={ref}>
            <motion.div style={{ y: yBackground }} className="hero-bg"></motion.div>
            <motion.div style={{ y: yText, opacity: opacityText }} className="container hero-content">
                <motion.div
                    className="hero-logo-container"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <img src="/logo.jpg" alt="NFS Photography" className="hero-logo" />
                </motion.div>

                <motion.div
                    className="viewfinder-wrapper"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                >
                    <div className="viewfinder-corners">
                        <span className="corner top-left"></span>
                        <span className="corner top-right"></span>
                        <span className="corner bottom-left"></span>
                        <span className="corner bottom-right"></span>
                    </div>
                    <motion.h1
                        className="brand-name"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        NFS <span className="text-accent">Photography</span>
                    </motion.h1>
                </motion.div>

                <motion.p
                    className="brand-tagline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    by Nifras Photographer
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="scroll-indicator"
                >
                    <span>Explore</span>
                    <div className="line"></div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
