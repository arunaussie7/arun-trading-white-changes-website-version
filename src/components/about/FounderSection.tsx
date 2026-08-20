import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { photographerInfo } from '@/data/photographer';
import { SectionReveal } from '@/components/lab/SectionReveal';

/**
 * Join banner — light pink field with black type, inspired by Hitcaliber testimonials.
 */
export function FounderSection() {
  return (
    <section className="relative px-5 py-16 md:px-8 md:py-20 lg:px-10">
      <div className="relative mx-auto max-w-7xl">
        <SectionReveal>
          <div
            className="relative overflow-hidden rounded-lg"
            style={{ background: '#F6C8DA' }}
          >
            <div className="relative flex min-h-[360px] flex-col lg:min-h-[400px] lg:flex-row lg:items-stretch">
              {/* Left: badge → headline → copy → CTA */}
              <div className="relative z-10 flex flex-1 flex-col justify-center px-8 py-12 md:px-14 md:py-14 lg:max-w-[58%] lg:px-16 lg:py-16">
                <div className="mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-black/15 bg-white/40 px-3 py-1.5">
                  <div className="flex -space-x-2">
                    <span className="size-[22px] rounded-full border-2 border-white bg-[#444]" />
                    <span className="size-[22px] rounded-full border-2 border-white bg-[#666]" />
                    <span className="size-[22px] rounded-full border-2 border-white bg-[#333]" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black">
                    Join 5K+ Operators
                  </span>
                </div>

                <h2 className="font-display text-[2.5rem] font-bold uppercase leading-[1.02] tracking-tight text-black md:text-[3.5rem] lg:text-[3.75rem]">
                  Join the network
                </h2>

                <p className="mt-5 max-w-[360px] text-[15px] font-medium leading-[1.55] text-black/75">
                  Premium indicators, custom EA builds, and a circle of traders who build systems — not
                  chase noise.
                </p>

                <div className="mt-8">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-md bg-black px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.06em] text-white transition hover:bg-black/85"
                  >
                    Become a member
                    <ArrowRight className="size-4" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>

              {/* Right: cutout over soft pink side — isolated so pink never blends into the subject */}
              <div className="relative isolate h-[300px] shrink-0 lg:h-auto lg:w-[42%]">
                <img
                  src={photographerInfo.portraitImage}
                  alt={photographerInfo.name}
                  className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[110%] w-auto max-w-[none] -translate-x-1/2 object-contain object-bottom mix-blend-normal lg:left-auto lg:right-0 lg:translate-x-0 lg:h-[108%]"
                />
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
