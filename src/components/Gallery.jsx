import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './Gallery.css';

const Gallery = () => {
    const images = [
        {
            id: 1,
            src: "/work1.jpg",
            title: "Divine Light",
            category: "Minimalist",
            camera: "realme 12 Pro+ 5G",
            lens: "5.59mm",
            iso: "100",
            aperture: "f/1.8",
            shutter: "1/100s"
        },
        {
            id: 2,
            src: "/work2.jpg",
            title: "Joy Ride",
            category: "Lifestyle",
            camera: "realme 12 Pro+ 5G",
            lens: "13.3mm",
            iso: "50",
            aperture: "f/1.4",
            shutter: "1/100s"
        },
        {
            id: 3,
            src: "/work3.jpg",
            title: "Sunset Siesta",
            category: "Street",
            camera: "Vivo S1 Pro",
            lens: "2.4mm",
            iso: "50",
            aperture: "f/1.8",
            shutter: "1/139s"
        },
        {
            id: 4,
            src: "/work4.jpg",
            title: "Connected",
            category: "Urban",
            camera: "realme 12 Pro+ 5G",
            lens: "13.3mm",
            iso: "50",
            aperture: "f/2.2",
            shutter: "1/250s"
        },
        {
            id: 5,
            src: "/work5.jpg",
            title: "Vibrant Blooms",
            category: "Nature",
            camera: "realme 12 Pro+ 5G",
            lens: "13.3mm",
            iso: "64",
            aperture: "f/2.6",
            shutter: "1/40s"
        },
        {
            id: 6,
            src: "/work6.jpg",
            title: "Red Petals",
            category: "Macro",
            camera: "realme 12 Pro+ 5G",
            lens: "5.59mm",
            iso: "1000",
            aperture: "f/1.8",
            shutter: "1/30s"
        }
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
                            <img
                                src={img.src}
                                alt={img.title}
                                loading="lazy"
                                srcSet={`${img.src}?w=400 400w, ${img.src}?w=800 800w, ${img.src}?w=1200 1200w`}
                                sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                            />
                            <div className="gallery-overlay">
                                <h3>{img.title}</h3>
                                <p>{img.category}</p>
                            </div>
                            <div className="photo-metadata">
                                <small className="camera-model">{img.camera}</small>
                                <small className="camera-settings">
                                    ISO {img.iso} | {img.lens} | {img.aperture} | {img.shutter}
                                </small>
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
                        <div className="lightbox-metadata">
                            <h3>{selectedImage.title}</h3>
                            <p className="lightbox-category">{selectedImage.category}</p>
                            <div className="lightbox-specs">
                                <span>{selectedImage.camera}</span>
                                <span className="separator">|</span>
                                <span>{selectedImage.lens}</span>
                                <span className="separator">|</span>
                                <span>ISO {selectedImage.iso}</span>
                                <span className="separator">|</span>
                                <span>{selectedImage.aperture}</span>
                                <span className="separator">|</span>
                                <span>{selectedImage.shutter}</span>
                            </div>
                        </div>
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
