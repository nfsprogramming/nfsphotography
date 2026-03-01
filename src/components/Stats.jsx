import { useRef, useEffect } from 'react';
import { useMotionValue, useTransform, animate, useInView, motion } from 'framer-motion';

const stats = [
    { number: 6, suffix: "+", label: "Photos Showcased" },
    { number: 1, suffix: "", label: "Global Award Won" },
    { number: 2, suffix: "+", label: "Years of Shooting" },
    { number: 3, suffix: "", label: "Camera Platforms" },
];

const Counter = ({ target }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, v => Math.round(v));
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView) {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) {
                count.set(target);
            } else {
                animate(count, target, { duration: 2, ease: "easeOut" });
            }
        }
    }, [inView, count, target]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
};

export default function Stats() {
    return (
        <section className="relative py-20 bg-black border-t border-b border-white/5 overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className={`flex flex-col items-center justify-center text-center ${idx < stats.length - 1 ? 'md:border-r border-white/10' : ''}`}
                        >
                            <div className="text-5xl md:text-7xl font-heading font-bold text-red mb-2 flex items-center">
                                <Counter target={stat.number} />
                                <span>{stat.suffix}</span>
                            </div>
                            <span className="text-xs tracking-widest uppercase font-sans text-white/50">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
