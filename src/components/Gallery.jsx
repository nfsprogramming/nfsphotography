import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryPhotos as photos } from '../data/gallery';

const ImageWithSkeleton = ({ src, alt, className }) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <div className="relative overflow-hidden w-full h-full min-h-[300px]">
            {!loaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#222] to-[#111] animate-shimmer bg-[length:200%_100%] z-0" />
            )}
            <img
                src={src}
                alt={alt}
                className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} relative z-10 w-full h-auto object-cover origin-center transition-transform duration-700 group-hover:scale-105`}
                loading="lazy"
                onLoad={() => setLoaded(true)}
            />
        </div>
    );
};

function MasonryCard({ photo, onClick }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            onClick={() => onClick(photo)}
            layout
            className="relative group overflow-hidden cursor-none mb-8 break-inside-avoid hoverable rounded-sm w-full"
        >
            {/* Dark Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

            {/* Image container */}
            <ImageWithSkeleton src={photo.src} alt={photo.title} />

            {/* Info Slide-up */}
            <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 text-left transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <h4 className="font-heading text-2xl mb-1 text-white">
                    {photo.title}
                </h4>
                <div className="text-red font-sans text-[0.6rem] md:text-xs tracking-[0.2em] mb-3 uppercase">
                    {photo.category}
                </div>
                <div className="flex flex-col gap-1 text-[0.60rem] font-sans text-white/80 uppercase tracking-widest bg-black/50 p-3 rounded backdrop-blur-md">
                    <span><span className="text-white/40">CAMERA:</span> {photo.camera}</span>
                    <span><span className="text-white/40">EXIF:</span> {photo.exif}</span>
                </div>
            </div>
        </motion.div>
    );
}

export default function Gallery() {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [filter, setFilter] = useState("All");
    const title = "SELECTED WORKS";
    const categories = ["All", "Minimalist", "Lifestyle", "Street", "Urban", "Nature", "Macro"];

    const handleNext = useCallback((e) => {
        if (e) e.stopPropagation();
        setSelectedIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
    }, []);

    const handlePrev = useCallback((e) => {
        if (e) e.stopPropagation();
        setSelectedIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
    }, []);

    const closeLightbox = useCallback(() => {
        setSelectedIndex(null);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedIndex === null) return;
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') closeLightbox();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, handleNext, handlePrev, closeLightbox]);

    const filteredPhotos = filter === "All" ? photos : photos.filter(p => p.category === filter);
    const selectedPhoto = selectedIndex !== null ? filteredPhotos[selectedIndex] : null;

    return (
        <section id="gallery" className="relative py-24 bg-black overflow-hidden select-none">

            {/* Title Animation */}
            <div className="container mx-auto px-6 mb-20 overflow-hidden">
                <h2 className="text-5xl md:text-7xl font-heading text-center mb-8 flex flex-wrap justify-center gap-2 uppercase tracking-widest">
                    {title.split(' ').map((word, wIdx) => (
                        <div key={wIdx} className="flex">
                            {word.split('').map((char, cIdx) => (
                                <motion.span
                                    key={cIdx}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: (wIdx * 5 + cIdx) * 0.05, type: 'spring' }}
                                    viewport={{ once: true }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>
                    ))}
                </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="container mx-auto px-6 mb-12">
                <div className="flex overflow-x-auto gap-8 pb-4 hide-scrollbar justify-start md:justify-center">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`font-sans tracking-widest uppercase text-xs hoverable cursor-none whitespace-nowrap transition-colors duration-300 relative pb-2 ${filter === cat ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                        >
                            {cat}
                            {filter === cat && (
                                <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 w-full h-[1px] bg-red" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Masonry Grid Layout (CSS Columns) */}
            <div className="container mx-auto px-6 max-w-7xl mb-32">
                <motion.div layout className="columns-1 md:columns-2 gap-8 w-full">
                    <AnimatePresence>
                        {filteredPhotos.map((p, idx) => (
                            <MasonryCard key={p.id} photo={p} onClick={() => setSelectedIndex(idx)} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Framer Motion Lightbox Modal */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                        className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 lg:p-12 cursor-none"
                    >
                        <motion.div
                            key={selectedPhoto.id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="relative w-full max-w-[95vw] h-full max-h-[85vh] hoverable flex flex-col items-center justify-center"
                            onClick={e => e.stopPropagation()}
                        >
                            <img
                                src={selectedPhoto.src}
                                alt={selectedPhoto.title}
                                className="max-w-full max-h-[75vh] object-contain shadow-2xl shadow-red/20 mb-6 border border-white/5"
                            />

                            {/* Bottom EXIF Bar */}
                            <div className="absolute -bottom-8 md:-bottom-12 left-0 w-full flex flex-col md:flex-row justify-between items-center text-white/70 font-sans tracking-widest text-[0.55rem] md:text-xs uppercase px-4 gap-2">
                                <span className="truncate max-w-full overflow-hidden whitespace-nowrap"><span className="text-white font-bold">{selectedPhoto.title}</span> | {selectedPhoto.category}</span>
                                <span className="flex gap-2 shrink-0 opacity-70">
                                    <span>{selectedPhoto.camera}</span> | <span>{selectedPhoto.exif}</span>
                                </span>
                            </div>
                        </motion.div>

                        {/* Close Button X */}
                        <button className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-red transition-colors hoverable z-[10001] p-4" onClick={closeLightbox}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        {/* Nav Arrows */}
                        <button className="absolute left-1 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors hoverable p-4 z-[10001]" onClick={handlePrev}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>

                        <button className="absolute right-1 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors hoverable p-4 z-[10001]" onClick={handleNext}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>

                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
