import { useMemo, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { motion, AnimatePresence } from 'framer-motion';
import { formatClients, getCountryStat } from '@/data/algoTradersByCountry';
import { getAllFlagGradients, getFlagStyle } from '@/data/flagColors';
import { useTheme } from '@/components/theme/ThemeProvider';

const GEO_URL = '/maps/countries-110m.json';

type Popup = {
  name: string;
  clients: number;
  x: number;
  y: number;
};

const DEFAULT_FILL_DARK = '#2a3038';
const DEFAULT_STROKE_DARK = '#0a0a0a';
const DEFAULT_FILL_LIGHT = '#d8dce3';
const DEFAULT_STROKE_LIGHT = '#ffffff';

/**
 * Straight, wide equirectangular world map.
 * Default: muted gunmetal. Hover: national flag colors + client popup.
 */
export function InteractiveWorldMap() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [popup, setPopup] = useState<Popup | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const defaultFill = isLight ? DEFAULT_FILL_LIGHT : DEFAULT_FILL_DARK;
  const defaultStroke = isLight ? DEFAULT_STROKE_LIGHT : DEFAULT_STROKE_DARK;

  const gradients = useMemo(() => getAllFlagGradients(), []);

  const placePopup = (name: string, clientX: number, clientY: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const pad = 20;
    const popupW = 200;
    let x = clientX - rect.left;
    let y = clientY - rect.top;
    x = Math.min(Math.max(x, pad + popupW / 2), rect.width - pad - popupW / 2);
    y = Math.min(Math.max(y, 100), rect.height - pad);
    const stat = getCountryStat(name);
    setHovered(name);
    setPopup({ name, clients: stat.clients, x, y });
  };

  return (
    <div
      ref={frameRef}
      className="interactive-world-map relative w-full cursor-crosshair overflow-visible bg-background"
      style={{ aspectRatio: '2.3 / 1', minHeight: 340 }}
      onMouseLeave={() => {
        setPopup(null);
        setHovered(null);
      }}
    >
      <div className="absolute inset-0 z-[1] overflow-hidden">
      <ComposableMap
        projection="geoEquirectangular"
        projectionConfig={{
          // ~2π·scale ≈ map width; π·scale ≈ map height — tuned to fill without clipping poles
          scale: 168,
          center: [0, 0],
        }}
        width={1200}
        height={520}
        className="h-full w-full"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          {gradients.map((g) => (
            <linearGradient
              key={g.id}
              id={g.id}
              x1="0%"
              y1="0%"
              x2={g.vertical ? '0%' : '100%'}
              y2={g.vertical ? '100%' : '0%'}
            >
              {g.stops.map((stop, i) => (
                <stop key={`${g.id}-${i}`} offset={stop.offset} stopColor={stop.color} />
              ))}
            </linearGradient>
          ))}
        </defs>

        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name = (geo.properties?.name as string) || 'Unknown';
              const flag = getFlagStyle(name);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  className="outline-none transition-[fill,stroke-width] duration-200 ease-out"
                  style={{
                    default: {
                      fill: defaultFill,
                      stroke: defaultStroke,
                      strokeWidth: 0.4,
                      outline: 'none',
                    },
                    hover: {
                      fill: flag.fill,
                      stroke: flag.stroke,
                      strokeWidth: 0.75,
                      outline: 'none',
                      cursor: 'pointer',
                    },
                    pressed: {
                      fill: flag.fill,
                      stroke: flag.stroke,
                      strokeWidth: 0.75,
                      outline: 'none',
                    },
                  }}
                  onMouseEnter={(e) => placePopup(name, e.clientX, e.clientY)}
                  onMouseMove={(e) => {
                    if (hovered !== name) return;
                    placePopup(name, e.clientX, e.clientY);
                  }}
                  onMouseLeave={() => {
                    setHovered(null);
                    setPopup(null);
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      </div>

      <AnimatePresence>
        {popup && (
          <motion.div
            key={popup.name}
            initial={{ opacity: 0, scale: 0.94, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.14 }}
            className="pointer-events-none absolute z-20 w-[200px] -translate-x-1/2 -translate-y-[120%] rounded-xl border border-border bg-popover px-4 py-3 shadow-elevated backdrop-blur-md"
            style={{ left: popup.x, top: popup.y }}
          >
            <div className="font-display text-base font-semibold leading-snug tracking-tight text-foreground">
              {popup.name}
            </div>
            {popup.clients > 0 ? (
              <>
                <div className="mt-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Active Clients
                </div>
                <div className="mt-0.5 font-mono text-sm text-primary">
                  {formatClients(popup.clients)}
                </div>
              </>
            ) : (
              <div className="mt-2 text-sm text-muted-foreground">No Active Users</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
