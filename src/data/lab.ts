import {
  Bot,
  LineChart,
  Microscope,
  BarChart3,
  Clapperboard,
  Code2,
  type LucideIcon,
} from 'lucide-react';

export type BuildCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

export const whatIBuild: BuildCard[] = [
  {
    title: 'Trade Automation',
    description:
      'Custom MT4/MT5 Expert Advisors that turn your rules into disciplined execution.',
    icon: Bot,
    href: '/automation',
  },
  {
    title: 'Indicators & Tools',
    description:
      'TradingView, MT4, and MT5 indicators for structure, momentum, and order flow.',
    icon: LineChart,
    href: '/portfolio',
  },
  {
    title: 'Quantitative Research',
    description:
      'Regime analysis and volatility filters that sharpen discretionary and automated decisions.',
    icon: Microscope,
    href: '/research',
  },
  {
    title: 'Market Structure',
    description:
      'Institutional-style reads across gold, crypto, indices, and FX.',
    icon: BarChart3,
    href: '/research',
  },
  {
    title: 'Process Content',
    description:
      'Notes on edge discovery, risk modeling, and algorithmic systems.',
    icon: Clapperboard,
    href: '/#content',
  },
  {
    title: 'Custom Algo Builds',
    description:
      'Bespoke algorithms and strategy conversion built around your rules.',
    icon: Code2,
    href: '/contact',
  },
];

export { researchItems, type ResearchItem } from '@/data/research';

export const contentChannels = [
  {
    name: 'YouTube',
    label: 'Systems & Research',
    hrefKey: 'youtube' as const,
    count: '8K+ Operators',
  },
  {
    name: 'Instagram',
    label: 'Execution Notes',
    hrefKey: 'instagram' as const,
    count: '12K+ Community',
  },
  {
    name: 'Discord',
    label: 'Trading Network',
    hrefKey: 'discord' as const,
    count: '5K+ Members',
  },
  {
    name: 'Articles',
    label: 'Written Research',
    hrefKey: 'twitter' as const,
    count: 'Library',
  },
];

export const heroStats = [
  { label: 'Years in Markets', value: '7+' },
  { label: 'Live Systems', value: '4+' },
  { label: 'Markets Covered', value: '10+' },
  { label: 'Mechanical Rules', value: '100%' },
];

export const roles = [
  'Trade Automator',
  'Market Researcher',
  'Algorithm Developer',
  'EA Specialist',
  'Entrepreneur',
];
