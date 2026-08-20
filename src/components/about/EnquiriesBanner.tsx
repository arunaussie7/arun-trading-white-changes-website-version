import { Link } from 'react-router-dom';
import { SectionReveal } from '@/components/lab/SectionReveal';

/**
 * Hitcaliber-style enquiry strip — always dark so it pops on day mode.
 * CTA lands on the Automation consultation form.
 */
export function EnquiriesBanner() {
  return (
    <section className="relative bg-[#0c0c0e] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16 lg:px-10 lg:py-20">
        <SectionReveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/50">
                Enquiries
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
                Got a strategy?
                <br />
                Let&apos;s automate.
              </h2>
            </div>

            <Link
              to="/automation#consult"
              className="inline-flex shrink-0 items-center justify-center self-start rounded-lg bg-[#7C3AED] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#6D28D9]"
            >
              Book a Consultation
            </Link>
          </div>

          <div className="mt-10 h-px w-full bg-white/15" />

          <p className="mt-6 max-w-2xl text-[15px] font-medium leading-relaxed text-white/70">
            Need a TradingView indicator, an MT4/MT5 EA, or a strategy in code? I turn your rules into
            disciplined execution.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
