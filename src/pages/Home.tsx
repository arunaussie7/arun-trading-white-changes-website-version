import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from 'framer-motion';
import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  Bot,
  ShieldCheck,
  Activity,
  Code2,
  LineChart,
  CandlestickChart,
} from 'lucide-react';
import { photographerInfo } from '@/data/photographer';
import { whatIBuild, heroStats } from '@/data/lab';
import { LabBackground } from '@/components/lab/LabBackground';
import { MagneticButton } from '@/components/lab/MagneticButton';
import { GlowCard } from '@/components/lab/GlowCard';
import { SectionReveal, SectionLabel } from '@/components/lab/SectionReveal';
import { AnimatedChart } from '@/components/visual/AnimatedChart';
import { SEOHead } from '@/components/seo/SEOHead';
import { DiscordIcon } from '@/components/icons/DiscordIcon';
import { BRollMarquee } from '@/components/about/BRollMarquee';
import { FounderSection } from '@/components/about/FounderSection';
import { GlobalMacroMap } from '@/components/visual/GlobalMacroMap';
import { EnquiriesBanner } from '@/components/about/EnquiriesBanner';

const identityLine = 'Trade automator.';

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const panelX = useTransform(sx, (v) => v * 10);
  const panelY = useTransform(sy, (v) => v * 6);

  const { scrollYProgress } = useScroll();
  const heroFade = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  const onMove = (e: React.MouseEvent) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <>
      <SEOHead />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        onMouseMove={onMove}
        className="relative min-h-[100svh] overflow-hidden gradient-lab"
      >
        <LabBackground variant="hero" />

        <motion.div
          style={{ opacity: heroFade }}
          className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl items-stretch gap-8 px-5 pt-28 md:px-8 md:pt-36 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pt-32"
        >
          <div className="order-2 flex flex-col justify-center space-y-8 pb-20 lg:order-1 lg:col-span-6 lg:pb-16">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground sm:text-xs"
            >
              {identityLine}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
              className="font-display text-[2.6rem] font-bold uppercase leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.25rem]"
            >
              <span className="block text-foreground">PRECISION OVER</span>
              <span className="mt-2 block gradient-text">PREDICTION.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="max-w-xl text-base font-medium leading-relaxed text-foreground sm:text-lg"
            >
              {photographerInfo.heroIntroduction}
            </motion.p>

            {/* Exactly 2 Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <MagneticButton to="/portfolio">
                Explore <ArrowRight className="size-4" />
              </MagneticButton>
              <MagneticButton href={photographerInfo.socialLinks.discord!} variant="outline">
                <DiscordIcon className="size-4" /> Discord
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="grid max-w-lg grid-cols-2 gap-3 pt-2 sm:grid-cols-4"
            >
              {heroStats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border/70 bg-card/70 px-3 py-3"
                >
                  <div className="font-display text-xl font-semibold text-primary">{s.value}</div>
                  <div className="lab-label mt-1 !normal-case !tracking-normal text-[10px]">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Cut-out portrait — drop a transparent PNG at /public/images/hero-portrait.png */}
          <motion.div
            style={{ x: panelX, y: panelY }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative order-1 flex min-h-[420px] w-full items-end justify-center self-stretch lg:order-2 lg:col-span-6 lg:min-h-0"
          >
            <img
              src={photographerInfo.heroPortraitImage ?? photographerInfo.portraitImage}
              alt={photographerInfo.name}
              className="pointer-events-none absolute inset-0 z-[1] h-full w-full select-none object-contain object-bottom drop-shadow-[0_18px_40px_rgba(80,40,120,0.18)]"
            />
          </motion.div>
        </motion.div>

        <a
          href="#build"
          className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 text-xs text-muted-foreground md:flex"
        >
          Scroll <ArrowDown className="size-3.5 animate-bounce" />
        </a>
      </section>

      {/* ── WHAT I BUILD — Capital Club–inspired split ── */}
      <section id="build" className="relative border-t border-border/40 bg-background px-5 py-24 md:px-8 md:py-32 lg:px-10">
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16 lg:items-center">
            <SectionReveal className="lg:col-span-5">
              <div className="inline-block border border-border/80 px-3 py-1.5">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground">
                  Capabilities
                </span>
              </div>
              <h2 className="mt-6 font-display text-3xl font-bold uppercase leading-[1.08] tracking-tight text-foreground md:text-4xl lg:text-[2.75rem]">
                EVERY EDGE MUST
                <br />
                <span className="gradient-text">BE ENGINEERED.</span>
              </h2>
              <p className="mt-5 max-w-md text-sm font-medium leading-relaxed text-foreground">
                Research becomes indicators. Indicators become EAs. Automation executes without emotion.
              </p>
              <div className="mt-8">
                <MagneticButton to="/portfolio">
                  Explore <ArrowRight className="size-4" />
                </MagneticButton>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1} className="lg:col-span-7">
              <div className="grid grid-cols-1 border-t border-border/50 sm:grid-cols-2">
                {whatIBuild.map((item, i) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className={`group border-b border-border/50 px-0 py-8 transition hover:bg-muted/60 sm:px-6 ${
                      i % 2 === 0 ? 'sm:border-r sm:border-border/50' : ''
                    }`}
                  >
                    <item.icon
                      className="size-5 text-primary transition group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                    <h3 className="mt-4 font-display text-sm font-bold uppercase tracking-[0.12em] text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-foreground/80">
                      {item.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] text-primary opacity-0 transition group-hover:opacity-100">
                      Open <ArrowUpRight className="size-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── AUTOMATION — Interactive Pipeline ── */}
      <section className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32 lg:px-10">
        <div className="section-ambient absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <SectionReveal>
            <SectionLabel>MECHANICAL PROTOCOL</SectionLabel>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl uppercase">
              AUTOMATION OVER <span className="gradient-text-blue">EMOTION.</span>
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
              TradingView indicators, MT4/MT5 tools, and Expert Advisors built around your rules and risk.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                { icon: CandlestickChart, label: 'TradingView indicators' },
                { icon: LineChart, label: 'TradingView strategies' },
                { icon: Activity, label: 'MT4 / MT5 indicators' },
                { icon: Bot, label: 'MT4 / MT5 Expert Advisors' },
                { icon: Code2, label: 'Custom algo development' },
                { icon: ShieldCheck, label: 'Built-in risk management' },
              ].map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-border/70 bg-card/70 px-3 py-2.5 text-sm"
                >
                  <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <MagneticButton to="/automation">
                Explore Automation <ArrowRight className="size-4" />
              </MagneticButton>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.12}>
            <GlowCard className="p-6" hover={false}>
              <div className="mb-5 flex items-center justify-between">
                <div className="lab-label">Build Status</div>
                <span className="font-mono text-[10px] text-primary">IN DEVELOPMENT</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['Rules', 'Code', 'Risk', 'Deploy'].map((s, i) => (
                  <div key={s} className="text-center">
                    <div className="rounded-xl border border-border bg-secondary/50 px-2 py-4 font-mono text-[11px]">
                      {s}
                    </div>
                    <div className="lab-label mt-1.5">0{i + 1}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 h-1 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full gradient-signal"
                  animate={{ width: ['10%', '100%', '10%'] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <AnimatedChart className="mt-6 h-28 w-full text-foreground" />
            </GlowCard>
          </SectionReveal>
        </div>
      </section>

      {/* ── B-ROLL SHOWCASE — The Person Behind The Systems ── */}
      <section className="relative border-t border-border/40 py-20">
        <SectionReveal>
          <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
            <SectionLabel className="justify-center">THE HUMAN ARCHITECTURE</SectionLabel>
            <h2 className="mt-3 font-display text-3xl font-semibold uppercase tracking-tight md:text-4xl">
              THE PERSON BEHIND THE <span className="text-primary">SYSTEMS</span>
            </h2>
          </div>
        </SectionReveal>

        <BRollMarquee />
      </section>

      {/* ── JOIN CTA (Capital Club–style end banner) ── */}
      <FounderSection />

      {/* ── GLOBAL MACRO MAP (TradingView economic map) ── */}
      <GlobalMacroMap />

      <EnquiriesBanner />

      {/* ── LUXURY FINAL STATEMENT ── */}
      <section className="relative border-t border-border/50 bg-background py-16 text-center">
        <SectionReveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            SYSTEMS BEAT EMOTION. DISCIPLINE IS FOREVER.
          </p>
        </SectionReveal>
      </section>
    </>
  );
}
