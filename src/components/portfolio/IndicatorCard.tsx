import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '@/types';
import { CATEGORY_LABELS } from '@/data/projects';
import { GlowCard } from '@/components/lab/GlowCard';

export function IndicatorCard({ project, index = 0 }: { project: Project; index?: number }) {
  const categoryLabels = project.categories.map((c) => CATEGORY_LABELS[c]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
    >
      <Link to={`/project/${project.slug}`} className="block h-full">
        <GlowCard className="h-full">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={project.coverImage}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            {project.badge && (
              <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-primary/30 bg-black/50 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-primary backdrop-blur">
                <Sparkles className="size-3" />
                {project.badge}
              </span>
            )}
          </div>
          <div className="space-y-3 p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-semibold tracking-tight">{project.title}</h3>
              <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition group-hover:text-primary" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {project.tagline || project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {categoryLabels.map((label) => (
                <span
                  key={label}
                  className="rounded-md border border-border bg-card px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </GlowCard>
      </Link>
    </motion.div>
  );
}
