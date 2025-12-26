import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
    return (
        <section id="hero" className="hero-section">
            <div className="hero-bg"></div>
            <div className="container hero-content">
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
            </div>
        </section>
    );
};

export default Hero;
