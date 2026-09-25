'use client';

import { usePlan } from '@/context/PlanContext';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Workouts' },
  { href: '/my-plan', label: 'My Plan' },
];

const NAV_LINK_ACTIVE = 'rounded-full bg-accent/15 px-3 py-1 text-accent';
const NAV_LINK_INACTIVE = 'px-3 py-1 text-muted hover:text-text';

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved, hydrated } = usePlan();

  const planCount = hydrated ? plan.length : 0;
  const savedCount = hydrated ? saved.length : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="FitLog" width={26} height={26} />
          <span className="font-display text-lg font-bold uppercase tracking-wide">FitLog</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-1 text-sm font-semibold uppercase tracking-wide">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? NAV_LINK_ACTIVE : NAV_LINK_INACTIVE}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted hover:text-text"
          >
            Plan
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-black">
              {planCount}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted hover:text-text"
          >
            Saved
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-border text-[11px] font-bold text-text">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>

      <nav className="flex sm:hidden items-center gap-2 px-4 pb-3 text-sm font-semibold uppercase tracking-wide">
        {NAV_LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={active ? NAV_LINK_ACTIVE : NAV_LINK_INACTIVE}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
