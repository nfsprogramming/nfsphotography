import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './Gallery.css';

const Gallery = () => {
    const images = [
        { id: 1, src: "/work1.jpg", title: "Divine Light", category: "Minimalist" },
        { id: 2, src: "/work2.jpg", title: "Joy Ride", category: "Lifestyle" },
        { id: 3, src: "/work3.jpg", title: "Sunset Siesta", category: "Street" },
        { id: 4, src: "/work4.jpg", title: "Connected", category: "Urban" },
        { id: 5, src: "/work5.jpg", title: "Vibrant Blooms", category: "Nature" }
    ];

    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section id="gallery" className="section gallery-section">
            <div className="container">
                <h2 className="section-title text-center">Selected <span className="text-accent">Works</span></h2>

                <div className="gallery-grid">
                    {images.map((img, index) => (
                        <motion.div
                            key={img.id}
                            className="gallery-item"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedImage(img)}
                        >
                            <img src={img.src} alt={img.title} loading="lazy" />
                            <div className="gallery-overlay">
                                <h3>{img.title}</h3>
                                <p>{img.category}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.img
                            src={selectedImage.src}
                            alt={selectedImage.title}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button className="close-lightbox" onClick={() => setSelectedImage(null)}>
                            <X size={32} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
