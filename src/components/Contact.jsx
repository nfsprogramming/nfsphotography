import { useState, useRef, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import emailjs from '@emailjs/browser';

function MagneticButton({ children, onClick, disabled }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const ref = useRef(null);

    const handleMouseMove = (e) => {
        if (disabled) return;
        const { clientX, clientY } = e;
        const { width, height, left, top } = ref.current.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * 0.3;
        const y = (clientY - (top + height / 2)) * 0.3;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={ref}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            disabled={disabled}
            className={`relative w-full md:w-auto px-12 py-5 font-heading tracking-widest uppercase rounded-sm overflow-hidden group hoverable ${disabled ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-red text-white cursor-none'}`}
        >
            {/* Background slide effect */}
            {!disabled && <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />}

            <div className={`relative z-10 transition-colors duration-500 flex items-center justify-center font-bold font-sans text-xs ${disabled ? '' : 'group-hover:text-red'}`}>
                {children}
            </div>
        </motion.button>
    );
}

export default function Contact() {
    const ctaText = "LET'S CREATE";
    const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (status === 'success') {
            const t = setTimeout(() => setStatus('idle'), 4000);
            return () => clearTimeout(t);
        }
    }, [status]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        const errors = {};
        if (!name) errors.name = "Name is required";
        if (!email) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = "Invalid email format";
        }
        if (!subject) errors.subject = "Subject is required";
        if (!message || message.length < 10) errors.message = "Message must be at least 10 characters";

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormErrors({});
        setStatus('sending');

        try {
            await emailjs.sendForm(
                'service_gvcc30c',
                'template_qt44l3y',
                form,
                'MMvbBVoBxkE98blQA'
            );
            setStatus('success');
            form.reset();
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="bg-black py-32 px-6 md:px-20 lg:px-32 border-t border-white/5 relative overflow-hidden">
            <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">

                {/* Left: Text CTA */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold mb-12 uppercase flex flex-wrap gap-2 leading-none text-white">
                        {ctaText.split(' ').map((word, i) => (
                            <div key={i} className="overflow-hidden flex">
                                {word.split('').map((char, j) => (
                                    <motion.span
                                        key={j}
                                        initial={{ y: "100%" }}
                                        whileInView={{ y: 0 }}
                                        transition={{ duration: 0.7, delay: (i * 5 + j) * 0.05, ease: [0.33, 1, 0.68, 1] }}
                                        viewport={{ once: true }}
                                        className="inline-block hover:text-red transition-colors duration-300"
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </div>
                        ))}
                    </h2>

                    <div className="flex gap-8 mt-4">
                        {[
                            { name: 'Instagram', url: 'https://www.instagram.com/_.nfsphotography._/' },
                            { name: 'WhatsApp', url: 'https://api.whatsapp.com/send?phone=918925147213' },
                            { name: 'Email', url: 'mailto:nfsphotography25@gmail.com' }
                        ].map((social, idx) => (
                            <motion.a
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={social.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 + (idx * 0.1) }}
                                viewport={{ once: true }}
                                className="font-sans text-sm tracking-widest text-white/50 uppercase hover:text-white hover:drop-shadow-[0_0_8px_#E63946] transition-all duration-200 transform hover:scale-110 hoverable"
                            >
                                {social.name}
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Right: Form */}
                <form className="flex flex-col justify-center gap-8" onSubmit={handleSubmit}>
                    {[
                        { id: 'name', name: 'name', label: '01 / Name', type: 'text', error: formErrors.name },
                        { id: 'email', name: 'email', label: '02 / Email', type: 'email', error: formErrors.email },
                        { id: 'subject', name: 'subject', label: '03 / Subject', type: 'text', error: formErrors.subject },
                        { id: 'message', name: 'message', label: '04 / Message', type: 'textarea', error: formErrors.message }
                    ].map((field, i) => (
                        <motion.div
                            key={field.id}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="relative group cursor-none pb-2"
                        >
                            <div className="flex flex-col relative">
                                {field.type === 'textarea' ? (
                                    <textarea
                                        name={field.name}
                                        id={field.id}
                                        placeholder=" "
                                        className="w-full bg-transparent border-0 border-b border-white/20 py-4 font-sans text-white focus:outline-none focus:ring-0 peer resize-none cursor-none hoverable px-0 placeholder-transparent"
                                        rows="4"
                                    />
                                ) : (
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        id={field.id}
                                        placeholder=" "
                                        className="w-full bg-transparent border-0 border-b border-white/20 py-4 font-sans text-white focus:outline-none focus:ring-0 peer cursor-none hoverable px-0 placeholder-transparent"
                                    />
                                )}

                                <label
                                    htmlFor={field.id}
                                    className="absolute left-0 top-4 font-sans text-white/50 transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-xs peer-focus:text-red peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white/80 uppercase tracking-widest text-sm"
                                >
                                    {field.label}
                                </label>

                                {/* Animated Underline on Focus/Hover */}
                                <div className="absolute bottom-0 left-0 w-full h-[1px] object-cover origin-left scale-x-0 bg-red transition-transform duration-500 peer-focus:scale-x-100 group-hover:scale-x-100" />
                            </div>
                            {field.error && <p className="text-red text-xs mt-2 font-sans absolute bottom-[-16px]">{field.error}</p>}
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="pt-8"
                    >
                        <MagneticButton
                            disabled={status === 'sending'}
                        >
                            {status === 'idle' && 'Send Message'}
                            {status === 'sending' && (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Sending...
                                </span>
                            )}
                            {status === 'success' && '✓ Message Sent!'}
                            {status === 'error' && 'Failed — Try Again'}
                        </MagneticButton>
                    </motion.div>
                </form>

            </div>
        </section>
    );
}
