import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateCursorPosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (
                e.target.tagName.toLowerCase() === 'a' ||
                e.target.tagName.toLowerCase() === 'button' ||
                e.target.closest('a') ||
                e.target.closest('button') ||
                e.target.classList.contains('hoverable')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateCursorPosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateCursorPosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full mix-blend-difference"
                animate={{
                    x: position.x - (isHovering ? 20 : 6),
                    y: position.y - (isHovering ? 20 : 6),
                    width: isHovering ? 40 : 12,
                    height: isHovering ? 40 : 12,
                    backgroundColor: isHovering ? '#F1FAEE' : '#E63946',
                }}
                transition={{
                    type: 'spring',
                    stiffness: 700,
                    damping: 28,
                    mass: 0.5
                }}
            />
        </>
    );
}
