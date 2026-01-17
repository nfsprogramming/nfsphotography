import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import './Achievements.css';

const Achievements = () => {
    return (
        <section id="achievements" className="section achievements-section">
            <div className="container">
                <motion.div
                    className="achievements-header text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <Award size={40} className="text-accent mb-4" />
                    <h2 className="section-title">Global <span className="text-accent">Recognition</span></h2>
                </motion.div>

                <div className="certificate-container">
                    <motion.div
                        className="certificate-card"
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, type: "spring" }}
                    >
                        <div className="certificate-frame">
                            <img src="/certificate.jpg" alt="Global Photography Contest Certificate" className="certificate-img" />
                        </div>
                        <div className="certificate-info">
                            <h3>Certificate of Recognition</h3>
                            <p className="contest-name">Global Photography Contest &mdash; Season 10</p>
                            <p className="organizer">Awarded by iNNOVIZE Arts & Culture | 2025</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Achievements;
