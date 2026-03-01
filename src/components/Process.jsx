import { motion } from 'framer-motion';

const steps = [
    {
        number: "01",
        title: "Scout the Scene",
        desc: "Finding the perfect location, light, and moment before the shot."
    },
    {
        number: "02",
        title: "Frame & Compose",
        desc: "Rule of thirds, leading lines, and emotional framing."
    },
    {
        number: "03",
        title: "Capture & Refine",
        desc: "Mobile photography mastery — minimal editing, maximum impact."
    }
];

export default function Process() {
    return (
        <section className="relative py-32 bg-[#0A0A0A] overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">

                <h2 className="text-4xl md:text-5xl font-heading mb-16 text-center uppercase tracking-widest text-white">
                    How I <span className="text-red">Shoot</span>
                </h2>

                <div className="relative flex flex-col md:flex-row justify-between items-start gap-12">

                    {/* Animated connecting line on desktop */}
                    <div className="hidden md:block absolute top-[24%] left-0 w-full h-[1px] bg-white/10" />
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="hidden md:block absolute top-[24%] left-0 w-full h-[1px] bg-red origin-left z-0"
                    />

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: idx * 0.2 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="relative flex flex-col items-center md:items-start text-center md:text-left z-10 w-full md:w-1/3"
                        >
                            {/* Giant Opacity Number */}
                            <div className="absolute -top-10 -left-4 text-9xl font-heading font-bold text-white/[0.04] pointer-events-none select-none z-0">
                                {step.number}
                            </div>

                            <div className="w-12 h-12 rounded-full bg-red text-white flex items-center justify-center font-bold font-sans z-10 mb-6 drop-shadow-[0_0_15px_rgba(230,57,70,0.5)]">
                                {step.number}
                            </div>

                            <h3 className="text-xl md:text-2xl font-heading font-semibold text-white mb-4 uppercase tracking-wider relative z-10">
                                {step.title}
                            </h3>
                            <p className="text-sm font-sans text-white/50 leading-relaxed max-w-xs relative z-10">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
