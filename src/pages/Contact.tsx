import { Mail, MapPin, ExternalLink, Instagram, Linkedin, Youtube } from 'lucide-react';
import { DiscordIcon } from '@/components/icons/DiscordIcon';
import { photographerInfo } from '@/data/photographer';
import { ContactForm } from '@/components/forms/ContactForm';
import { LabBackground } from '@/components/lab/LabBackground';
import { GlowCard } from '@/components/lab/GlowCard';
import { SectionReveal, SectionLabel } from '@/components/lab/SectionReveal';
import { SEOHead } from '@/components/seo/SEOHead';

const items = [
  {
    icon: DiscordIcon,
    label: 'Discord',
    value: 'Join the community',
    href: photographerInfo.socialLinks.discord,
  },
  {
    icon: Mail,
    label: 'Email',
    value: photographerInfo.email,
    href: `mailto:${photographerInfo.email}`,
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@the.arunchitragar',
    href: photographerInfo.socialLinks.instagram,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'in/arun-chitragar',
    href: photographerInfo.socialLinks.linkedin,
  },
  {
    icon: Youtube,
    label: 'YouTube',
    value: '@Arun.chitragar',
    href: photographerInfo.socialLinks.youtube,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: photographerInfo.location,
  },
];

export default function Contact() {
  return (
    <>
      <SEOHead
        title="Contact & Scope"
        description="Inquire for indicator purchases, custom MT4/MT5 Expert Advisor builds, and algorithmic trading projects with Arun Chitragar."
      />

      <section className="relative overflow-hidden gradient-lab">
        <LabBackground variant="dense" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-14 pt-10 text-center md:px-8 lg:px-10">
          <SectionReveal>
            <SectionLabel className="justify-center">SERIOUS INQUIRIES</SectionLabel>
            <h1 className="mx-auto mt-5 max-w-4xl font-display text-5xl font-semibold uppercase tracking-tight md:text-6xl lg:text-7xl">
              COMMUNICATE WITH <span className="gradient-text-signal">PRECISION.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              Indicator purchases, custom EA builds, and automation projects — reply within 24–48 hours.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-5 lg:items-start">
          <SectionReveal className="lg:col-span-3">
            <GlowCard className="p-6 md:p-8" hover={false}>
              <SectionLabel>PROJECT BRIEF</SectionLabel>
              <h2 className="mt-3 font-display text-2xl font-semibold uppercase tracking-tight">
                TELL ME WHAT YOU NEED
              </h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </GlowCard>
          </SectionReveal>

          <div className="space-y-4 lg:col-span-2">
            <SectionReveal>
              <SectionLabel>DIRECT CHANNELS</SectionLabel>
            </SectionReveal>
            {items.map((item, i) => {
              const Icon = item.icon;
              const inner = (
                <GlowCard className="flex items-center gap-4 p-4">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="lab-label">{item.label}</div>
                    <div className="truncate text-sm text-foreground">{item.value}</div>
                  </div>
                  {item.href && <ExternalLink className="size-3.5 text-muted-foreground" />}
                </GlowCard>
              );
              return (
                <SectionReveal key={item.label} delay={i * 0.04}>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </SectionReveal>
              );
            })}

            <SectionReveal delay={0.2}>
              <GlowCard className="p-5" hover={false}>
                <div className="lab-label">OPEN TO</div>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>· Indicator Purchase</li>
                  <li>· Custom Indicator Builds</li>
                  <li>· Custom MT4 Expert Advisor Builds</li>
                  <li>· Custom MT5 Expert Advisor Builds</li>
                  <li>· TradingView & MetaTrader Tool Development</li>
                </ul>
                <p className="mt-4 text-xs font-mono text-primary">{photographerInfo.availability}</p>
              </GlowCard>
            </SectionReveal>
          </div>
        </div>
      </section>
    </>
  );
}
