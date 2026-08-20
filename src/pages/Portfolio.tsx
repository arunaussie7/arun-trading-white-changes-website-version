import { pricingStrategies } from '@/data/projects';
import { StrategyPricingCard } from '@/components/portfolio/StrategyPricingCard';
import { CustomIndicatorForm } from '@/components/portfolio/CustomIndicatorForm';
import { LabBackground } from '@/components/lab/LabBackground';
import { SectionReveal, SectionLabel } from '@/components/lab/SectionReveal';
import { SEOHead } from '@/components/seo/SEOHead';

const TIER_LABELS = ['Tier 1', 'Tier 2', 'Tier 3'] as const;

export default function Portfolio() {
  return (
    <>
      <SEOHead
        title="Indicators & Strategies"
        description="Confluence Strategy, Volume Orderflow Strategy, and ORB Strategy for Nifty & BankNifty — plus custom TradingView indicator builds by Arun Chitragar."
      />

      <section className="relative overflow-hidden gradient-lab">
        <LabBackground variant="dense" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-14 pt-10 text-center md:px-8 lg:px-10">
          <SectionReveal>
            <div className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                Pricing
              </span>
            </div>
            <h1 className="mx-auto mt-5 max-w-4xl font-display text-4xl font-semibold uppercase tracking-tight md:text-5xl lg:text-6xl">
              Choose Your <span className="text-primary">Trading Journey</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Pick the strategy that fits your markets — or request a custom indicator around your rules.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Strategy pricing tiers */}
      <section className="px-5 pb-16 md:px-8 md:pb-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3 lg:items-stretch">
          {pricingStrategies.map((project, i) => (
            <StrategyPricingCard
              key={project.id}
              project={project}
              tierLabel={TIER_LABELS[i]}
              featured={i === 1}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* Custom indicator form */}
      <section
        id="custom-indicator"
        className="border-t border-border/40 px-5 py-16 md:px-8 md:py-24 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:gap-14">
          <SectionReveal className="lg:col-span-5">
            <SectionLabel>Custom Build</SectionLabel>
            <h2 className="mt-3 font-display text-3xl font-semibold uppercase tracking-tight md:text-4xl">
              Need a <span className="gradient-text-signal">custom indicator?</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Already trade a manual system and want it on TradingView, MT4, or MT5? Send the rules and
              I’ll scope a build.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">▸</span> TradingView Pine strategies & indicators
              </li>
              <li className="flex gap-2">
                <span className="text-primary">▸</span> MT4 / MT5 tools & Expert Advisors
              </li>
              <li className="flex gap-2">
                <span className="text-primary">▸</span> Risk rules, alerts, and session filters
              </li>
            </ul>
          </SectionReveal>

          <SectionReveal delay={0.08} className="lg:col-span-7">
            <div className="rounded-2xl border border-border/70 bg-card/40 p-6 shadow-elevated md:p-8">
              <CustomIndicatorForm />
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
