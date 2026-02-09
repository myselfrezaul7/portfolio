'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const updateCursorPosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const updateCursorType = () => {
            const hoveredElement = document.elementFromPoint(position.x, position.y);
            if (hoveredElement) {
                const computedStyle = window.getComputedStyle(hoveredElement);
                setIsPointer(
                    computedStyle.cursor === 'pointer' ||
                    hoveredElement.tagName === 'A' ||
                    hoveredElement.tagName === 'BUTTON' ||
                    hoveredElement.closest('a') !== null ||
                    hoveredElement.closest('button') !== null
                );
            }
        };

        const handleMouseLeave = () => setIsHidden(true);
        const handleMouseEnter = () => setIsHidden(false);

        window.addEventListener('mousemove', updateCursorPosition);
        window.addEventListener('mousemove', updateCursorType);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', updateCursorPosition);
            window.removeEventListener('mousemove', updateCursorType);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [position.x, position.y]);

    // Don't render on mobile or SSR
    if (!isMounted) return null;
    if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className={`${styles.cursor} ${isHidden ? styles.hidden : ''}`}
                animate={{
                    x: position.x - 4,
                    y: position.y - 4,
                    scale: isPointer ? 0.5 : 1,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
                }}
            />

            {/* Cursor circle */}
            <motion.div
                className={`${styles.cursorCircle} ${isHidden ? styles.hidden : ''}`}
                animate={{
                    x: position.x - 20,
                    y: position.y - 20,
                    scale: isPointer ? 1.5 : 1,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 250,
                    damping: 20,
                    mass: 0.8,
                }}
            />
        </>
    );
}
