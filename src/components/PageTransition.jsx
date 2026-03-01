import { motion } from 'framer-motion';

export default function PageTransition({ children }) {
    return (
        <>
            <motion.div
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 bg-red origin-top z-[99999]"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            >
                {children}
            </motion.div>
        </>
    );
}
