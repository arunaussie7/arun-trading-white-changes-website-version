import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BarChart3,
  Clock,
  Layers,
  LineChart,
  Monitor,
  Target,
  Workflow,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { CATEGORY_LABELS, getProjectBySlug } from '@/data/projects';
import { SectionLabel } from '@/components/lab/SectionReveal';
import { MagneticButton } from '@/components/lab/MagneticButton';
import { PurchaseDialog } from '@/components/portfolio/PurchaseDialog';

function MetaCard({
  icon: Icon,
  label,
  values,
}: {
  icon: typeof Monitor;
  label: string;
  values: string[];
}) {
  if (!values.length) return null;
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-5">
      <div className="flex items-center gap-2 text-primary">
        <Icon className="size-4" />
        <span className="lab-label !text-primary">{label}</span>
      </div>
      <div className="mt-2 font-display text-sm font-semibold leading-relaxed md:text-base">
        {values.join(' · ')}
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const categoryLabels = project.categories.map((c) => CATEGORY_LABELS[c]);

  return (
    <>
      <SEOHead
        title={project.title}
        description={project.description}
        image={project.coverImage}
        type="article"
      />

      <div className="min-h-screen">
        <motion.div
          className="relative h-[55vh] w-full overflow-hidden bg-muted md:h-[70vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={project.coverImage}
            alt={project.title}
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </motion.div>

        <section className="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-16">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="size-4" /> All indicators
            </Link>

            <div className="space-y-4">
              {project.badge && <SectionLabel>{project.badge}</SectionLabel>}
              <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              {project.tagline && (
                <p className="text-lg text-muted-foreground">{project.tagline}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {categoryLabels.map((label) => (
                  <span
                    key={label}
                    className="rounded-lg border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <Separator className="bg-border" />

            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {project.description}
            </p>

            <div className="rounded-2xl border border-border bg-card/50 p-6 md:p-7">
              <div className="lab-label">Price</div>
              <div className="mt-2 flex flex-wrap items-baseline gap-3">
                <div className="font-display text-4xl font-semibold tracking-tight text-[#D4AF37] md:text-5xl">
                  ${project.priceUsd ?? 99}
                </div>
                {typeof project.compareAtUsd === 'number' && (
                  <div className="font-display text-xl text-muted-foreground line-through md:text-2xl">
                    ${project.compareAtUsd}
                  </div>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span>{project.accessLabel || 'Lifetime Access'}</span>
                <span className="text-border">·</span>
                <span>One-time Payment</span>
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2 text-primary">
                <Layers className="size-4" />
                <span className="lab-label !text-primary">Key Features</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.keyFeatures.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-lg border border-border bg-card/50 px-3 py-1.5 text-xs text-foreground/85"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <MetaCard icon={Target} label="Best Markets" values={project.bestMarkets} />
              <MetaCard
                icon={Clock}
                label="Recommended Timeframe"
                values={project.timeframes}
              />
              {project.chartType && (
                <MetaCard icon={BarChart3} label="Chart Type" values={[project.chartType]} />
              )}
              <MetaCard icon={Monitor} label="Platform" values={[project.platform]} />
              <MetaCard icon={Workflow} label="Trading Style" values={project.tradingStyles} />
              {project.segment && (
                <MetaCard icon={LineChart} label="Segment" values={[project.segment]} />
              )}
            </div>

            <div className="pt-2">
              <MagneticButton onClick={() => setPurchaseOpen(true)}>Purchase Now</MagneticButton>
            </div>
          </motion.div>
        </section>
      </div>

      <PurchaseDialog open={purchaseOpen} onOpenChange={setPurchaseOpen} project={project} />
    </>
  );
}
