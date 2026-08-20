import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { photographerInfo } from '@/data/photographer';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Lab', path: '/', n: '01' },
  { name: 'Indicators', path: '/portfolio', n: '02' },
  { name: 'Automation', path: '/automation', n: '03' },
  { name: 'Research', path: '/research', n: '04' },
  { name: 'About', path: '/about', n: '05' },
  { name: 'Contact', path: '/contact', n: '06' },
];

export function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 bg-transparent"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[4.5rem] md:px-8 lg:px-10">
        <Link to="/" className="group flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt={`${photographerInfo.name} logo`}
            className="size-10 rounded-lg object-cover transition duration-300 group-hover:opacity-90 md:size-11"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[15px] font-semibold tracking-tight">
              {photographerInfo.name}
            </span>
            <span className="mt-1 max-w-[220px] truncate font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
              Indicators · EAs · Automation
            </span>
          </span>
        </Link>

        <nav className="hidden items-center rounded-full border border-border/60 bg-muted/70 p-1 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'relative flex min-w-[4.6rem] flex-col items-center rounded-full px-3.5 py-1.5 transition-colors',
                  active
                    ? 'bg-background text-[#6D28D9] shadow-sm'
                    : 'text-foreground/80 hover:text-foreground'
                )}
              >
                <span
                  className={cn(
                    'font-mono text-[8px] leading-none tracking-wide',
                    active ? 'text-[#6D28D9]' : 'text-muted-foreground'
                  )}
                >
                  {link.n}
                </span>
                <span className="mt-0.5 text-[13px] font-semibold leading-none">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={photographerInfo.socialLinks.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2.5 text-xs font-semibold text-background transition hover:opacity-90"
          >
            Discord
            <ArrowUpRight className="size-3.5" />
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-border bg-background/95 backdrop-blur-xl">
              <div className="mt-10 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-baseline gap-3 rounded-xl px-3 py-3 font-display text-lg hover:bg-muted',
                      location.pathname === link.path ||
                        (link.path !== '/' && location.pathname.startsWith(link.path))
                        ? 'text-[#6D28D9]'
                        : 'text-foreground'
                    )}
                  >
                    <span className="font-mono text-[11px] text-muted-foreground">{link.n}</span>
                    {link.name}
                  </Link>
                ))}
                <a
                  href={photographerInfo.socialLinks.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-glow"
                >
                  Join Discord <ArrowUpRight className="size-4" />
                </a>
                <ThemeToggle className="mt-3" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
