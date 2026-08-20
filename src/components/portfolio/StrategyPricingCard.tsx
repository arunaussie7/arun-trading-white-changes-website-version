import { useState } from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '@/types';
import { PurchaseDialog } from '@/components/portfolio/PurchaseDialog';
import { cn } from '@/lib/utils';

type Props = {
  project: Project;
  tierLabel: string;
  featured?: boolean;
  index?: number;
};

export function StrategyPricingCard({
  project,
  tierLabel,
  featured = false,
  index = 0,
}: Props) {
  const [open, setOpen] = useState(false);
  const priceUsd = project.priceUsd ?? 99;
  const compareAtUsd = project.compareAtUsd;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08, duration: 0.5 }}
        className={cn(
          'relative flex h-full flex-col rounded-2xl border bg-card p-6 md:p-7',
          featured
            ? 'border-primary shadow-[0_0_40px_-12px_hsl(148_68%_28%/0.55)]'
            : 'border-border/70'
        )}
      >
        {featured && project.badge && (
          <span className="absolute right-4 top-4 rounded-md bg-primary px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
            {project.badge}
          </span>
        )}

        <div className="pr-16">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {tierLabel}
          </div>
          <h3 className="mt-2 font-display text-lg font-semibold uppercase tracking-tight md:text-xl">
            {project.title}
          </h3>
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap items-baseline gap-3">
            <div className="font-display text-4xl font-bold tracking-tight text-[#D4AF37] md:text-5xl">
              ${priceUsd}
            </div>
            {typeof compareAtUsd === 'number' && (
              <div className="font-display text-xl font-semibold text-muted-foreground line-through decoration-muted-foreground/80 md:text-2xl">
                ${compareAtUsd}
              </div>
            )}
          </div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {project.accessLabel ?? 'Lifetime Access'}
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          {project.tagline || project.description}
        </p>

        <div className="mt-6 flex-1">
          <div className="lab-label mb-3 !text-foreground/70">What&apos;s included</div>
          <ul className="space-y-2.5">
            {project.keyFeatures.slice(0, 6).map((f) => (
              <li key={f} className="flex gap-2.5 text-sm text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2.5} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 space-y-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-primary-foreground transition hover:brightness-110"
          >
            Get Started Now
          </button>
          <Link
            to={`/project/${project.slug}`}
            className="block text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition hover:text-primary"
          >
            View full details
          </Link>
        </div>
      </motion.div>

      <PurchaseDialog project={project} open={open} onOpenChange={setOpen} />
    </>
  );
}
