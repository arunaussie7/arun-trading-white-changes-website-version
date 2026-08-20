import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * Precision cursor: a small signal core with a trailing ring.
 * Green + violet matches the site palette — not a copied purple-dot.
 */
export function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const coreX = useSpring(mouseX, { damping: 32, stiffness: 520, mass: 0.16 });
  const coreY = useSpring(mouseY, { damping: 32, stiffness: 520, mass: 0.16 });
  const ringX = useSpring(mouseX, { damping: 20, stiffness: 160, mass: 0.4 });
  const ringY = useSpring(mouseY, { damping: 20, stiffness: 160, mass: 0.4 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.documentElement.classList.add('has-custom-cursor');

    const isInteractive = (target: HTMLElement | null) => {
      if (!target) return false;
      return Boolean(
        target.closest('a, button, [role="button"], input, textarea, select, .interactive, label')
      );
    };

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest('.interactive-world-map, input, textarea, select, [contenteditable="true"]')) {
        setVisible(false);
        setHovered(false);
        return;
      }
      if (!visible) setVisible(true);
      setHovered(isInteractive(target));
    };

    const handleLeave = () => {
      setVisible(false);
      setHovered(false);
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [mouseX, mouseY, visible]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            width: hovered ? 42 : 28,
            height: hovered ? 42 : 28,
            borderColor: hovered ? 'hsl(148 68% 32% / 0.85)' : 'hsl(277 80% 52% / 0.55)',
          }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-full border-[1.5px] bg-transparent"
        />
      </motion.div>

      <motion.div
        style={{ x: coreX, y: coreY }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            scale: hovered ? 0.55 : 1,
            backgroundColor: hovered ? 'hsl(148 68% 32%)' : 'hsl(277 82% 48%)',
          }}
          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="size-2 rounded-full"
        />
      </motion.div>
    </div>
  );
}
