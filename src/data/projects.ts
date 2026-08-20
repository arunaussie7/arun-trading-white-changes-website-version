import type { Project, ProjectCategory } from '@/types';

const chartImg = (seed: string) =>
  `https://images.unsplash.com/${seed}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600`;

const COVERS = {
  confluence: chartImg('photo-1642543492481-44e81e3914a7'),
  volume: chartImg('photo-1559526324-4b87bed59979'),
  nwa: chartImg('photo-1611974765270-ca1258634369'),
  orb: chartImg('photo-1590283603385-17ffb3a7f29f'),
};

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  'smart-money': 'Smart Money',
  scalping: 'Scalping',
  breakout: 'Breakout',
  'order-flow': 'Order Flow',
  'trend-following': 'Trend Following',
};

export const INDICATOR_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'smart-money', label: 'Smart Money' },
  { id: 'scalping', label: 'Scalping' },
  { id: 'breakout', label: 'Breakout' },
  { id: 'order-flow', label: 'Order Flow' },
  { id: 'trend-following', label: 'Trend Following' },
] as const;

function project(
  data: Omit<Project, 'category' | 'client' | 'location' | 'tags' | 'images'> & {
    categories: ProjectCategory[];
  }
): Project {
  return {
    ...data,
    category: data.categories[0],
    client: data.platform,
    location: data.timeframes.join(' · '),
    tags: data.categories.map((c) => CATEGORY_LABELS[c]),
    images: [],
  };
}

export const projects: Project[] = [
  project({
    id: '1',
    title: 'Confluence Strategy',
    categories: ['smart-money', 'trend-following', 'order-flow'],
    year: '2025',
    slug: 'confluence-strategy',
    coverImage: COVERS.confluence,
    badge: 'Dual Confirm',
    tagline: 'Trendline breaks + volumetric BOS/CHoCH — both must fire on the same bar.',
    description:
      'Entries fire only when a trendline break and a volumetric BOS/CHoCH confirm on the same bar. Stops are structural, with configurable R:R (default 2.0) and automatic strategy exits.',
    keyFeatures: [
      'Dual confirmation: trendline + volumetric break',
      'BOS & CHoCH structure labels',
      'Volumetric order blocks with volume profile',
      'POC (point of control) highlighting',
      'ATR / Stdev / Linreg trendline slope',
      'Configurable R:R (default 2.0)',
      'Structural SL + min SL padding',
      'Auto strategy entry & exit',
    ],
    bestMarkets: ['XAUUSD', 'Indices', 'FX'],
    chartType: 'Overlay',
    timeframes: ['Intraday', 'Swing'],
    platform: 'TradingView',
    tradingStyles: ['Smart Money', 'Trend Following', 'Confluence'],
    priceUsd: 104,
    compareAtUsd: 299,
    accessLabel: 'Lifetime Access',
  }),
  project({
    id: '2',
    title: 'Volume Orderflow Strategy',
    categories: ['smart-money', 'order-flow'],
    year: '2025',
    slug: 'volume-orderflow-strategy',
    coverImage: COVERS.volume,
    badge: 'LIVE',
    tagline: 'Manipulation raid + structure break — trap logic with volumetric order blocks.',
    description:
      'Maps order blocks, volume profiles, and liquidity raids. Trades only when a manipulation is followed by a confirming BOS or CHoCH, with swing-anchored stops and configurable R:R.',
    keyFeatures: [
      'Volumetric order blocks & profiles',
      'BOS & CHoCH structure breaks',
      'Liquidity manipulation bubbles',
      'Trap entry: manip + break confirmation',
      'Swing-anchored stop loss',
      'Configurable R:R',
      'TP/SL projection lines',
      'Overlap filtering for cleaner blocks',
    ],
    bestMarkets: ['XAUUSD', 'Indices', 'FX'],
    chartType: 'Overlay',
    timeframes: ['Intraday', 'Swing'],
    platform: 'TradingView',
    tradingStyles: ['Order Flow', 'Smart Money', 'Liquidity'],
    priceUsd: 100,
    compareAtUsd: 259,
    accessLabel: 'Lifetime Access',
  }),
  project({
    id: '3',
    title: 'NWA Scalping Strategy',
    categories: ['scalping'],
    year: '2025',
    slug: 'nwa-scalping-strategy',
    coverImage: COVERS.nwa,
    badge: 'Scalping',
    tagline: 'Nadaraya-Watson envelope scalping with ATR-based risk control.',
    description:
      'Intraday scalping with the Nadaraya-Watson Envelope and ATR-based risk. Built for fast reversals with disciplined entries and exits.',
    keyFeatures: [
      'Nadaraya-Watson Envelope',
      'ATR Stop Loss',
      'Dynamic Risk Management',
      'Scalping Entries',
      'Buy & Sell Signals',
      'Non-Repainting Mode',
    ],
    bestMarkets: ['Major Forex Pairs', 'Minor Forex Pairs'],
    chartType: 'Candlestick',
    timeframes: ['1 Minute'],
    platform: 'TradingView',
    tradingStyles: ['Scalping', 'Intraday'],
    price: 4999,
    accessLabel: 'Lifetime Access',
  }),
  project({
    id: '4',
    title: 'ORB Strategy',
    categories: ['breakout'],
    year: '2025',
    slug: 'orb-strategy',
    coverImage: COVERS.orb,
    badge: 'India Indices',
    tagline: 'Opening Range Breakout Pro — built for Nifty & BankNifty session logic.',
    description:
      'Captures the opening high/low for Nifty and BankNifty, then trades the breakout. One long and one short per day, with the stop on the opposite side of the range.',
    keyFeatures: [
      'Opening range high/low capture',
      'Asia/Kolkata session timing',
      'Built for Nifty & BankNifty',
      'Entry on bar close option',
      'One long + one short per day',
      'Opposite-range stop loss',
      'Multi-level TP (default R:R 3.0)',
      'Live TP/SL lines & labels',
    ],
    bestMarkets: ['Nifty', 'BankNifty'],
    chartType: 'Candlestick',
    timeframes: ['Opening session', 'Intraday'],
    platform: 'TradingView',
    tradingStyles: ['Breakout', 'Intraday', 'F&O'],
    segment: 'Futures & Options',
    priceUsd: 99,
    compareAtUsd: 199,
    accessLabel: 'Lifetime Access',
  }),
];

/** USD → INR rate ($100 = ₹9,544.55) */
export const USD_TO_INR = 95.4455;

export function usdToInr(usd: number) {
  return Math.round(usd * USD_TO_INR * 100) / 100;
}

export function formatInr(amount: number) {
  return amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Pricing-page tiers (Confluence, Volume Orderflow, ORB) */
export const pricingStrategies = [
  projects.find((p) => p.slug === 'confluence-strategy')!,
  projects.find((p) => p.slug === 'volume-orderflow-strategy')!,
  projects.find((p) => p.slug === 'orb-strategy')!,
];

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

export const getProjectsByCategory = (category: string) =>
  category === 'all'
    ? projects
    : projects.filter((p) => p.categories.includes(category as ProjectCategory));

export const getFeaturedProjects = () => pricingStrategies;

export const getAdjacentProjects = (currentSlug: string) => {
  const i = projects.findIndex((p) => p.slug === currentSlug);
  return {
    prev: i > 0 ? projects[i - 1] : null,
    next: i >= 0 && i < projects.length - 1 ? projects[i + 1] : null,
  };
};
