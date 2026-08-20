import { useState } from 'react';
import { photographerInfo } from '@/data/photographer';
import { roles } from '@/data/lab';
import { LabBackground } from '@/components/lab/LabBackground';
import { GlowCard } from '@/components/lab/GlowCard';
import { SectionReveal, SectionLabel } from '@/components/lab/SectionReveal';
import { SEOHead } from '@/components/seo/SEOHead';
import { BRollMarquee } from '@/components/about/BRollMarquee';
import { FounderSection } from '@/components/about/FounderSection';

export default function About() {
  const [videoFailed, setVideoFailed] = useState(false);
  const stats = photographerInfo.founderStats ?? [];

  return (
    <>
      <SEOHead
        title="About"
        description={`About ${photographerInfo.name} — Trade Automator, Algorithm Developer, Expert Advisor specialist, and Market Researcher.`}
      />

      {/* Hero */}
      <section className="relative overflow-hidden gradient-lab">
        <LabBackground variant="dense" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-10 text-center md:px-8 lg:px-10">
          <SectionReveal>
            <SectionLabel className="justify-center">OPERATOR PROFILE</SectionLabel>
            <h1 className="mx-auto mt-5 max-w-4xl font-display text-5xl font-semibold uppercase tracking-tight md:text-6xl lg:text-7xl">
              ENGINEER FIRST.{' '}
              <span className="gradient-text-signal">TRADER ALWAYS.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Trade automator.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Story & Mission */}
      <section className="px-5 py-20 md:px-8 md:py-28 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-start">
          <SectionReveal className="lg:col-span-5">
            <GlowCard className="overflow-hidden" hover={false}>
              <div className="relative aspect-[4/5] bg-secondary">
                {!videoFailed ? (
                  <video
                    className="h-full w-full object-cover"
                    src={photographerInfo.founderVideo}
                    poster={photographerInfo.portraitImage}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onError={() => setVideoFailed(true)}
                  />
                ) : (
                  <img
                    src={photographerInfo.portraitImage}
                    alt={photographerInfo.name}
                    className="h-full w-full object-cover"
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-6">
                  <div className="font-display text-xl font-semibold text-foreground">{photographerInfo.name}</div>
                  <div className="lab-label mt-1 !text-primary">Trade Automator · Algorithm Developer</div>
                </div>
              </div>
            </GlowCard>
          </SectionReveal>

          <div className="space-y-12 lg:col-span-7">
            <SectionReveal>
              <SectionLabel>THE MISSION</SectionLabel>
              <h2 className="mt-3 font-display text-3xl font-semibold uppercase tracking-tight md:text-4xl">
                ARCHITECTURE OVER PREDICTION.
              </h2>
              <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-muted-foreground sm:text-lg">
                {photographerInfo.biography}
              </p>
            </SectionReveal>

            <SectionReveal delay={0.08}>
              <SectionLabel>THE PHILOSOPHY</SectionLabel>
              <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">
                EVERY EDGE MUST <span className="gradient-text">BE ENGINEERED.</span>
              </h2>
              <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-muted-foreground sm:text-lg">
                {photographerInfo.approach}
              </p>
            </SectionReveal>

            <SectionReveal delay={0.12}>
              <div className="flex flex-wrap gap-2">
                {roles.map((r) => (
                  <span
                    key={r}
                    className="rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="px-5 py-12 md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <SectionReveal key={stat.label} delay={i * 0.05}>
              <GlowCard className="p-6 text-center">
                <div className="font-display text-3xl font-semibold text-primary">{stat.value}</div>
                <div className="lab-label mt-2">{stat.label}</div>
              </GlowCard>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* B-Roll Showcase — Life Beyond The Terminal */}
      <section className="relative border-t border-border/40 py-20">
        <SectionReveal>
          <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
            <SectionLabel className="justify-center">UNFILTERED PERSPECTIVE</SectionLabel>
            <h2 className="mt-3 font-display text-3xl font-semibold uppercase tracking-tight md:text-4xl">
              LIFE BEYOND THE <span className="text-primary">TERMINAL</span>
            </h2>
          </div>
        </SectionReveal>

        <BRollMarquee />
      </section>

      {/* Join CTA — Capital Club–style end banner */}
      <FounderSection />
    </>
  );
}
