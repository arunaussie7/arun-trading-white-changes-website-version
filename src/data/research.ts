export type ResearchItem = {
  id: string;
  title: string;
  type: 'Framework' | 'Playbook' | 'Filter' | 'Process' | 'Principle';
  summary: string;
  meta: string;
  markets: string[];
  tags: string[];
  highlights: string[];
  featured?: boolean;
};

/** Evergreen research — principles & frameworks, not dated market calls. */
export const researchItems: ResearchItem[] = [
  {
    id: 'why-news-matters',
    title: 'Why News & Data Matter',
    type: 'Principle',
    meta: 'Core',
    featured: true,
    markets: ['XAUUSD', 'FX', 'Indices'],
    tags: ['News', 'Volatility', 'Risk'],
    summary:
      'High-impact data reprices rates, risk, and liquidity faster than any indicator. Research starts by knowing when the tape is driven by data, not structure.',
    highlights: [
      'CPI, NFP, and central-bank decisions can invalidate a setup in seconds',
      'Spreads widen around red-folder prints — size and timing matter',
      'Sitting out is valid when the calendar owns the session',
    ],
  },
  {
    id: 'event-hierarchy',
    title: 'Impact Hierarchy of Market Events',
    type: 'Filter',
    meta: 'Calendar',
    markets: ['All desks'],
    tags: ['FOMC', 'CPI', 'NFP', 'RBI'],
    summary:
      'Rank events by how they move your markets, then set a standing response — cut size, pause, or stay flat.',
    highlights: [
      'Tier 1: FOMC, US CPI, NFP — session-defining for gold & FX',
      'Tier 1 (India): RBI policy and gap days for Nifty & BankNifty',
      'Tier 2–3: tighten risk on speakers; trade normally on low-impact data',
    ],
  },
  {
    id: 'liquidity-facts',
    title: 'Liquidity & Session Facts',
    type: 'Framework',
    meta: 'Structure',
    markets: ['XAUUSD', 'Major FX'],
    tags: ['Sessions', 'Liquidity', 'Spread'],
    summary:
      'Asian range, London open, NY overlap — knowing where liquidity sits lasts longer than any weekly bias.',
    highlights: [
      'London open and London–NY overlap carry most FX & gold volume',
      'Thin sessions produce more false breaks and wider spreads',
      'Best setups usually appear when session flow and structure align',
    ],
  },
  {
    id: 'structure-before-signal',
    title: 'Structure Before Signal',
    type: 'Framework',
    meta: 'Method',
    markets: ['XAUUSD', 'FX', 'Nifty', 'BankNifty'],
    tags: ['BOS', 'CHoCH', 'Order Flow'],
    summary:
      'Indicators confirm. Structure decides. BOS, CHoCH, order blocks, and volume tell you if a signal is tradable.',
    highlights: [
      'Set bias from higher-timeframe structure first',
      'Require volumetric or order-block agreement before entry',
      'If structure breaks, the thesis is invalid — exit the idea',
    ],
  },
  {
    id: 'orb-principles',
    title: 'Opening Range Principles',
    type: 'Playbook',
    meta: 'Intraday',
    markets: ['Nifty', 'BankNifty'],
    tags: ['ORB', 'Breakout', 'F&O'],
    summary:
      'Define the opening range, wait for acceptance beyond it, manage risk mechanically, and skip revenge re-entries.',
    highlights: [
      'One high-quality breakout beats multiple forced trades',
      'Gap and policy mornings change ORB reliability — respect the exception',
      'Break-even and square-off rules protect against afternoon mean-reversion',
    ],
  },
  {
    id: 'volatility-sizing',
    title: 'Volatility Is the Position Size',
    type: 'Principle',
    meta: 'Risk',
    markets: ['FX', 'XAUUSD'],
    tags: ['ATR', 'Sizing', 'Scalping'],
    summary:
      'When ATR doubles, the same stop is not the same risk. Let volatility set stop width and position size.',
    highlights: [
      'Widen stops with ATR; cut size so dollar risk stays constant',
      'Compressed ATR often means chop — fewer trades, not tighter hope-stops',
      'News spikes inflate ATR — don’t treat them as a new baseline',
    ],
  },
  {
    id: 'journal-protocol',
    title: 'Execution & Journal Protocol',
    type: 'Process',
    meta: 'Discipline',
    markets: ['All desks'],
    tags: ['Journal', 'Prop', 'Rules'],
    summary:
      'A standing journal — setup, rules, risk, grade — keeps systems honest without needing forecasts.',
    highlights: [
      'Log setup tag, rule followed, risk, and grade — not just PnL',
      'Weekly adherence matters more than any single winning day',
      'Two consecutive rule breaks → stop trading that session',
    ],
  },
];

export const researchMarkets = [
  { symbol: 'XAUUSD', focus: 'Structure · Order flow · Session liquidity' },
  { symbol: 'Major FX', focus: 'Volatility windows · Event filters' },
  { symbol: 'Nifty', focus: 'Opening range · Intraday momentum' },
  { symbol: 'BankNifty', focus: 'ORB principles · F&O discipline' },
];

export const researchCalendar = [
  {
    event: 'US CPI',
    impact: 'High',
    instruments: 'XAUUSD · Major FX',
    action: 'Stand down or cut size',
  },
  {
    event: 'FOMC / Rate Decision',
    impact: 'High',
    instruments: 'XAUUSD · FX',
    action: 'No new risk into print',
  },
  {
    event: 'Non-Farm Payrolls',
    impact: 'High',
    instruments: 'XAUUSD · FX',
    action: 'Flat around release',
  },
  {
    event: 'RBI Policy',
    impact: 'High',
    instruments: 'Nifty · BankNifty',
    action: 'Skip or reduce ORB',
  },
  {
    event: 'Central Bank Speakers',
    impact: 'Medium',
    instruments: 'FX · Gold',
    action: 'Tighten risk',
  },
  {
    event: 'Session Opens (London / NY / NSE)',
    impact: 'Medium',
    instruments: 'All desks',
    action: 'Primary liquidity windows',
  },
];

export const researchPillars = [
  {
    title: 'News sets the regime',
    body: 'Data and policy shift expectations. Know the calendar before you trust the chart.',
  },
  {
    title: 'Structure filters noise',
    body: 'BOS, CHoCH, and liquidity context decide if a signal deserves capital.',
  },
  {
    title: 'Volatility prices risk',
    body: 'ATR and session conditions determine size — not conviction or FOMO.',
  },
  {
    title: 'Process outlasts prediction',
    body: 'Journals, event gates, and mechanical exits work in every market year.',
  },
];

export const newsFacts = [
  {
    title: 'Rates drive gold & FX',
    body: 'Unexpected rate shifts remain among the strongest drivers of gold and dollar pairs.',
  },
  {
    title: 'Liquidity vanishes into prints',
    body: 'Around major releases, depth thins — the same stop can slip more than in a quiet hour.',
  },
  {
    title: 'Indices price policy too',
    body: 'RBI and domestic shocks often matter more for Nifty/BankNifty than a textbook pattern.',
  },
  {
    title: 'Automation needs the calendar',
    body: 'An EA without an event filter will trade the moments discretion usually avoids.',
  },
];
