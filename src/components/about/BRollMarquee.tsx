import { useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  wrap,
} from 'framer-motion';

export type BRollItem = {
  id: string;
  title: string;
  category: string;
  type: 'video' | 'image';
  src: string;
  poster?: string;
};

// Curated lifestyle & personality B-roll collection
export const defaultBRollItems: BRollItem[] = [
  {
    id: '1',
    title: 'Daily Protocol & Systems',
    category: 'ROUTINE',
    type: 'video',
    src: '/videos/founder.mp4',
    poster: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'Physical Standard & Mindset',
    category: 'DISCIPLINE',
    type: 'video',
    src: '/videos/Physical%20standard%20and%20mindset.mov',
  },
  {
    id: '3',
    title: 'Late Night Architecture',
    category: 'ENGINEERING',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    title: 'Morning Research Ritual',
    category: 'MINDSET',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    title: 'Global Focus & Travel',
    category: 'EXPLORATION',
    type: 'image',
    src: '/images/global-focus-travel.jpg',
  },
  {
    id: '6',
    title: 'Operator Keynotes & Community',
    category: 'SPEAKING',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '7',
    title: 'Studio Ready Set',
    category: 'PRODUCTION',
    type: 'image',
    src: '/images/studio-ready-set.jpg',
  },
  {
    id: '8',
    title: 'Behind The Scenes',
    category: 'CASUAL',
    type: 'image',
    src: '/images/behind-the-scenes.jpg',
  },
];

export function BRollMarquee({ items = defaultBRollItems }: { items?: BRollItem[] }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useMotionValue(0);

  // Smooth, high-damped spring physics for Apple-like subtle scroll response
  const smoothVelocity = useSpring(scrollVelocity, { damping: 90, stiffness: 180, mass: 0.6 });
  const velocityFactor = useTransform(smoothVelocity, [0, 800], [0, 1.2], { clamp: true });

  const lastScrollY = useRef(0);
  useEffect(() => {
    return scrollY.on('change', (current) => {
      const delta = current - lastScrollY.current;
      scrollVelocity.set(Math.abs(delta));
      lastScrollY.current = current;
    });
  }, [scrollY, scrollVelocity]);

  // Wrap calculation for seamless left-to-right infinite loop
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    // Ultra-slow gallery base speed (0.0025% per ms = ~0.04% per frame) moving Left -> Right (+ direction)
    const extraSpeed = velocityFactor.get();
    const currentMove = (0.0028 + extraSpeed * 0.0035) * delta;
    baseX.set(baseX.get() + currentMove);
  });

  // Duplicate items for seamless continuous loop
  const displayItems = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Soft edge gradient masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-background to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-background to-transparent md:w-32" />

      <motion.div className="flex w-max gap-4 md:gap-6" style={{ x }}>
        {displayItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="group relative h-[340px] w-[250px] shrink-0 overflow-hidden rounded-2xl border border-border bg-card/40 shadow-elevated backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:scale-[1.015] md:h-[430px] md:w-[310px]"
          >
            {item.type === 'video' ? (
              <video
                src={item.src}
                poster={item.poster}
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                preload="metadata"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
              />
            ) : (
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
              />
            )}

            {/* Minimal overlay: category badge & short title */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5 flex flex-col justify-end">
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-primary/90">
                {item.category}
              </span>
              <h4 className="mt-1 font-display text-sm font-semibold tracking-tight text-white md:text-base">
                {item.title}
              </h4>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
