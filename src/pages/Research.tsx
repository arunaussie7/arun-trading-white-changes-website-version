import {
  BookOpen,
  CalendarDays,
  FileText,
  NotebookPen,
  Crosshair,
  ShieldAlert,
  Landmark,
} from 'lucide-react';
import {
  researchItems,
  researchMarkets,
  researchCalendar,
  researchPillars,
  newsFacts,
} from '@/data/research';
import { SectionReveal } from '@/components/lab/SectionReveal';
import { MagneticButton } from '@/components/lab/MagneticButton';
import { SEOHead } from '@/components/seo/SEOHead';
import { photographerInfo } from '@/data/photographer';
import { cn } from '@/lib/utils';

const typeIcon = {
  Framework: BookOpen,
  Playbook: Crosshair,
  Filter: ShieldAlert,
  Process: NotebookPen,
  Principle: Landmark,
} as const;

export default function Research() {
  const featured = researchItems.find((r) => r.featured) ?? researchItems[0];
  const rest = researchItems.filter((r) => r.id !== featured.id);

  return (
    <>
      <SEOHead
        title="Quantitative Research"
        description="Evergreen research on why news matters, event-risk filters, liquidity sessions, and rule-based frameworks by Arun Chitragar."
      />

      {/* Split masthead */}
      <section className="px-5 pb-10 pt-6 md:px-8 md:pb-14 md:pt-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-end gap-10 lg:grid-cols-12">
          <SectionReveal className="lg:col-span-8">
            <p className="text-sm font-semibold text-foreground/70">Systems for disciplined traders.</p>
            <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-[4.4rem] lg:leading-[1.02]">
              Insights that keep
              <br />
              <span className="gradient-text-blue">capital intact.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-foreground/75 md:text-lg">
              Evergreen frameworks on news, liquidity, structure, and risk — no dated calls.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.08} className="lg:col-span-4">
            <div className="rounded-2xl border border-border/70 bg-muted/40 p-5">
              <p className="text-sm font-bold text-foreground">Desk coverage</p>
              <p className="mt-1 text-sm font-medium text-foreground/70">
                Markets this research is built around.
              </p>
              <div className="mt-4 space-y-2.5">
                {researchMarkets.map((m) => (
                  <div key={m.symbol} className="flex items-baseline justify-between gap-3 border-b border-border/50 pb-2 last:border-0 last:pb-0">
                    <span className="font-display text-sm font-bold">{m.symbol}</span>
                    <span className="text-right text-xs font-medium text-foreground/65">{m.focus}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Featured story */}
      <section className="px-5 pb-6 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <article className="overflow-hidden rounded-3xl border border-border/70 bg-card">
              <div className="grid lg:grid-cols-2">
                <div className="research-featured-panel flex min-h-[320px] flex-col justify-end px-8 py-10 md:px-12 md:py-14">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
                    Featured · {featured.type}
                  </p>
                  <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-sm font-medium text-[#2563eb]/80">{featured.meta} note</p>
                </div>
                <div className="flex flex-col justify-center px-8 py-10 md:px-12">
                  <p className="text-base font-medium leading-relaxed text-foreground/80">
                    {featured.summary}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {featured.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm font-medium leading-relaxed text-foreground/75">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#2563eb]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {[...featured.markets, ...featured.tags].map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </SectionReveal>
        </div>
      </section>

      {/* Facts as articles */}
      <section className="px-5 py-16 md:px-8 md:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">
              Market facts
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight md:text-4xl">
              Truths that don&apos;t <span className="gradient-text-blue">expire.</span>
            </h2>
          </SectionReveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {newsFacts.map((fact, i) => (
              <SectionReveal key={fact.title} delay={i * 0.04}>
                <article
                  className={cn(
                    'flex h-full flex-col rounded-2xl border p-6 md:p-7',
                    i % 2 === 1
                      ? 'research-card-violet'
                      : 'border-border/60 bg-card'
                  )}
                >
                  <p className="text-xs font-semibold text-foreground/45">
                    {String(i + 1).padStart(2, '0')} · Evergreen
                  </p>
                  <h3
                    className={cn(
                      'mt-3 font-display text-xl font-bold tracking-tight',
                      i % 2 === 1 ? 'text-[#6D28D9]' : 'text-[#2563eb]'
                    )}
                  >
                    {fact.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-foreground/70">
                    {fact.body}
                  </p>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Library */}
      <section className="px-5 pb-16 md:px-8 md:pb-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">
              Research library
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight md:text-4xl">
              Frameworks, playbooks & <span className="text-[#6D28D9]">filters.</span>
            </h2>
          </SectionReveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((item, i) => {
              const Icon = typeIcon[item.type] ?? FileText;
              return (
                <SectionReveal key={item.id} delay={i * 0.05}>
                  <article
                    className={cn(
                      'flex h-full flex-col rounded-2xl border p-6',
                      i % 2 === 1
                        ? 'research-card-violet'
                        : 'border-border/60 bg-card'
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={cn(
                          'inline-flex items-center gap-2 text-xs font-semibold',
                          i % 2 === 1 ? 'text-[#6D28D9]' : 'text-[#2563eb]'
                        )}
                      >
                        <Icon className="size-3.5" strokeWidth={2} />
                        {item.type}
                      </span>
                      <span className="text-xs font-medium text-foreground/45">{item.meta}</span>
                    </div>
                    <h3
                      className={cn(
                        'mt-4 font-display text-2xl font-bold tracking-tight',
                        i % 2 === 1 ? 'text-[#6D28D9]' : 'text-[#2563eb]'
                      )}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-foreground/70">
                      {item.summary}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-foreground/75"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Event desk + pillars */}
      <section className="border-t border-border/40 px-5 py-16 md:px-8 md:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
          <SectionReveal className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">
              <CalendarDays className="size-3.5" />
              Event risk
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Standing response to <span className="gradient-text-blue">news.</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm font-medium leading-relaxed text-foreground/70">
              The same event gates used in discretionary trading and custom EA filters.
            </p>
            <div className="mt-7 overflow-hidden rounded-2xl border border-border/60">
              <div className="grid grid-cols-[1.2fr_0.6fr_1.2fr_0.9fr] gap-2 border-b border-border/50 bg-muted/60 px-4 py-3 text-xs font-bold uppercase tracking-wider text-foreground/55">
                <span>Event</span>
                <span>Impact</span>
                <span className="hidden sm:inline">Instruments</span>
                <span>Action</span>
              </div>
              {researchCalendar.map((row) => (
                <div
                  key={row.event}
                  className="grid grid-cols-[1.2fr_0.6fr_1.2fr_0.9fr] gap-2 border-b border-border/40 px-4 py-3.5 text-sm last:border-b-0"
                >
                  <span className="font-bold text-foreground">{row.event}</span>
                  <span
                    className={
                      row.impact === 'High'
                        ? 'font-semibold text-[#2563eb]'
                        : 'font-medium text-foreground/55'
                    }
                  >
                    {row.impact}
                  </span>
                  <span className="hidden text-xs font-medium text-foreground/60 sm:inline">
                    {row.instruments}
                  </span>
                  <span className="text-xs font-semibold text-foreground/80">{row.action}</span>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08} className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">
              Research pillars
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">
              How decisions stay <span className="text-[#6D28D9]">durable.</span>
            </h2>
            <div className="mt-7 space-y-4">
              {researchPillars.map((p, i) => (
                <article key={p.title} className="rounded-2xl border border-border/60 bg-card p-5">
                  <p className="text-xs font-semibold text-foreground/45">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-bold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-foreground/70">{p.body}</p>
                </article>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8 md:pb-24 lg:px-10">
        <SectionReveal>
          <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-6 rounded-3xl border border-border/70 bg-muted/40 px-8 py-10 md:flex-row md:items-center md:px-12">
            <div>
              <h3 className="font-display text-3xl font-bold tracking-tight">
                Build with the same rules.
              </h3>
              <p className="mt-2 max-w-md text-sm font-medium text-foreground/70">
                Want these filters inside a custom indicator or EA? Start a conversation.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <MagneticButton to="/contact">Request Access</MagneticButton>
              <MagneticButton href={photographerInfo.socialLinks.discord!} variant="ghost">
                Discord
              </MagneticButton>
            </div>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
