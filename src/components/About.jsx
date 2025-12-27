import { motion } from 'framer-motion';
import { Camera, Eye, Aperture } from 'lucide-react';
import './About.css';

const About = () => {
    const features = [
        { icon: <Camera size={32} />, title: "Vision", desc: "Seeing the world differently." },
        { icon: <Eye size={32} />, title: "Focus", desc: "Attention to every detail." },
        { icon: <Aperture size={32} />, title: "Light", desc: "Painting with illumination." }
    ];

    return (
        <section id="about" className="section about-section">
            <div className="container">
                <div className="about-grid">
                    <motion.div
                        className="about-text"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="section-title">Meet the <span className="text-accent">Photographer</span></h2>
                        <h3 className="artist-name">NIFRAS</h3>
                        <p className="lead">
                            <strong>NFS</strong> is the creative vision of <strong>Nifras</strong>. What began as a simple pastime evolved into a passion when I discovered my natural skill in this field.
                        </p>
                        <p>
                            For me, photography isn't just about taking pictures. It's about freezing time, capturing emotion, and telling a story that words cannot express.
                        </p>
                        <p>
                            I represent the new era of <strong>Mobile Photography</strong>. I prove that the artist's eye matters more than the gear, specializing in portrait, landscape, and creative shots that push the boundaries of what a phone can do.
                        </p>
                        <a href="#contact" className="btn">Get in Touch</a>
                    </motion.div>

                    <motion.div
                        className="about-image"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img src="/nifras-portrait.jpg" alt="Nifras - Photographer" />
                    </motion.div>
                </div>

                <div className="features-section">
                    <div className="features-grid">
                        {features.map((item, index) => (
                            <motion.div
                                key={index}
                                className="feature-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                            >
                                <div className="feature-icon">{item.icon}</div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
