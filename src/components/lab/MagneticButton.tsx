import { useRef, type ReactNode, type MouseEvent, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'ghost' | 'outline';
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

/**
 * Premium CTA with magnetic pull + solid Doom green fill.
 */
export function MagneticButton({
  children,
  className,
  variant = 'primary',
  to,
  href,
  onClick,
  type = 'button',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.3 });

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.22);
  };

  const styles = cn(
    'relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium tracking-tight transition-colors will-change-transform',
    variant === 'primary' &&
      'bg-primary text-primary-foreground shadow-glow hover:bg-primary-glow',
    variant === 'ghost' && 'glass text-foreground hover:bg-muted',
    variant === 'outline' &&
      'border border-border bg-transparent text-foreground hover:border-primary/50 hover:text-primary',
    className
  );

  const motionStyle = { x: sx, y: sy } as CSSProperties & { x: typeof sx; y: typeof sy };

  const content = (
    <motion.span style={motionStyle} className={styles}>
      {children}
    </motion.span>
  );

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }} className="inline-block">
      {to ? (
        <Link to={to} className="inline-block">
          {content}
        </Link>
      ) : href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
          {content}
        </a>
      ) : (
        <button type={type} onClick={onClick} className="inline-block">
          {content}
        </button>
      )}
    </div>
  );
}
