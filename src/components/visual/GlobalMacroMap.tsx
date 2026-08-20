import { SectionReveal, SectionLabel } from '@/components/lab/SectionReveal';
import { InteractiveWorldMap } from '@/components/visual/InteractiveWorldMap';

/**
 * Full-width geographical map section — pitch black, no frame.
 */
export function GlobalMacroMap() {
  return (
    <section className="relative border-t border-border/40 bg-background py-20 md:py-24">
      <div className="relative mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
        <SectionReveal>
          <div className="mb-8 text-center md:mb-10">
            <SectionLabel className="justify-center">WORLD VIEW</SectionLabel>
            <h2 className="mt-4 font-display text-3xl font-semibold uppercase tracking-tight md:text-4xl lg:text-5xl">
              ACTIVE CLIENTS.{' '}
              <span className="gradient-text-signal">WORLDWIDE.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Hover a country to see flag colors and active-client counts.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.06}>
          <InteractiveWorldMap />
        </SectionReveal>
      </div>
    </section>
  );
}
