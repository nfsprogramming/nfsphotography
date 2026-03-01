import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        // Update GSAP ScrollTrigger if it exists
        lenis.on('scroll', (e) => {
            if (window.ScrollTrigger) {
                window.ScrollTrigger.update();
            }
        });

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        const animFrame = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(animFrame);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
