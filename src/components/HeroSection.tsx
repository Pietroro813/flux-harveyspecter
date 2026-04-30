'use client';

import { useState } from 'react';

const heroImage =
  'https://www.figma.com/api/mcp/asset/262c6eb9-14a1-412c-aa7c-bb4d5514d247';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Simulates a progressive blur from 0px at the top to maxBlur at the bottom.
 * Uses N stacked backdrop-filter layers, each starting later and contributing
 * an increasing blur — the visual result is a smooth blur ramp.
 */
function ProgressiveBlur({ className = '' }: { className?: string }) {
  const N = 8;
  const maxBlur = 20;

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {Array.from({ length: N }, (_, i) => {
        const blur = (maxBlur * (i + 1)) / N;
        const from = (100 * i) / N;
        const mask = `linear-gradient(to bottom, transparent ${from}%, black 100%)`;
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
}

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect y="4" width="24" height="2" rx="1" fill="black" />
      <rect y="11" width="24" height="2" rx="1" fill="black" />
      <rect y="18" width="24" height="2" rx="1" fill="black" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line x1="4" y1="4" x2="20" y2="20" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="4" x2="4" y2="20" stroke="black" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LetsTalkButton({ className = '' }: { className?: string }) {
  return (
    <a
      href="#contact"
      className={`bg-black text-white font-medium text-[14px] tracking-[-0.56px] px-4 py-3 rounded-[24px] ${className}`}
    >
      Let&apos;s talk
    </a>
  );
}

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative overflow-hidden">
      {/* ── Desktop (md+) ──────────────────────────────────────── */}
      <div className="hidden md:flex flex-col gap-[240px] items-center px-8 h-[847px] relative">
        {/* Background image */}
        <div
          className="absolute -translate-y-1/2 pointer-events-none"
          style={{
            aspectRatio: '2291/1346',
            left: '-34.79%',
            right: '-34.79%',
            top: 'calc(50% + 88.84px)',
          }}
        >
          <img
            alt=""
            className="absolute inset-0 max-w-none object-bottom size-full"
            src={heroImage}
          />
        </div>

        {/* Progressive blur panel — bottom 349px, blur ramps 0→20px upward */}
        <div className="absolute h-[349px] left-0 bottom-0 right-0">
          <ProgressiveBlur />
        </div>

        {/* Nav */}
        <nav className="flex items-center justify-between py-6 relative shrink-0 w-full">
          <span className="font-semibold text-[16px] tracking-[-0.64px] capitalize text-black">
            H.Studio
          </span>

          <div className="flex gap-14 items-center font-semibold text-[16px] tracking-[-0.64px] capitalize text-black">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="hover:opacity-60 transition-opacity"
              >
                {label}
              </a>
            ))}
          </div>

          <LetsTalkButton />
        </nav>

        {/* Hero text */}
        <div className="flex flex-col items-center justify-center relative shrink-0 w-full">
          <div className="flex flex-col items-start pb-[15px] w-full">
            <div className="flex items-center mb-[-15px] px-[18px] w-full">
              <p className="font-mono font-normal leading-[1.1] mix-blend-overlay text-[14px] text-white uppercase whitespace-nowrap">
                [ Hello i&apos;m ]
              </p>
            </div>
            <div className="capitalize font-medium leading-none mb-[-15px] mix-blend-overlay text-[198px] text-center text-white tracking-[-13.86px] w-full">
              <p className="leading-[1.1] whitespace-pre-wrap">Harvey   Specter</p>
            </div>
          </div>

          <div className="flex flex-col items-end justify-center w-full">
            <div className="flex flex-col gap-[17px] items-start">
              <p className="font-bold italic leading-none text-[#1f1f1f] text-[14px] tracking-[-0.56px] uppercase w-[294px]">
                <span className="leading-[1.1]">H.Studio is a </span>
                <span className="font-normal leading-[1.1]">full-service</span>
                <span className="leading-[1.1]">
                  {' '}creative studio creating beautiful digital experiences and products. We are an{' '}
                </span>
                <span className="font-normal leading-[1.1]">award winning</span>
                <span className="leading-[1.1]">
                  {' '}design and art group specializing in branding, web design and engineering.
                </span>
              </p>
              <LetsTalkButton />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile (below md) ──────────────────────────────────── */}
      <div className="flex md:hidden flex-col items-center justify-between pb-6 px-4 min-h-svh relative">
        {/* Background image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ right: '-39.47%' }}
        >
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover size-full"
            src={heroImage}
          />
        </div>

        {/* Progressive blur panel — bottom 349px, blur ramps 0→20px upward */}
        <div className="absolute h-[349px] left-0 bottom-0 right-0">
          <ProgressiveBlur />
        </div>

        {/* Nav */}
        <nav className="flex items-center justify-between py-6 relative shrink-0 w-full z-10">
          <span className="font-semibold text-[16px] tracking-[-0.64px] capitalize text-black">
            H.Studio
          </span>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <HamburgerIcon />
          </button>
        </nav>

        {/* Mobile menu overlay */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-[#fafafa] flex flex-col px-4 pt-6 pb-8">
            <div className="flex items-center justify-between shrink-0 w-full py-0">
              <span className="font-semibold text-[16px] tracking-[-0.64px] capitalize text-black">
                H.Studio
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="flex flex-col gap-8 mt-12 font-semibold text-[32px] tracking-[-1.28px] capitalize text-black">
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="hover:opacity-60 transition-opacity"
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="mt-auto">
              <LetsTalkButton className="block text-center" />
            </div>
          </div>
        )}

        {/* Hero text */}
        <div className="flex flex-col items-center justify-between h-[341px] relative shrink-0 w-full">
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center justify-center px-[18px] w-full">
              <p className="font-mono font-normal leading-[1.1] mix-blend-overlay text-[14px] text-white uppercase whitespace-nowrap">
                [ Hello i&apos;m ]
              </p>
            </div>
            <div className="capitalize font-medium mix-blend-overlay text-[96px] text-center text-white tracking-[-6.72px] w-full">
              <p className="leading-[0.8] whitespace-pre-wrap">Harvey   Specter</p>
            </div>
          </div>

          <div className="flex flex-col gap-[17px] items-start w-[293px]">
            <p className="font-bold italic leading-none text-[#1f1f1f] text-[14px] tracking-[-0.56px] uppercase w-[294px]">
              <span className="leading-[1.1]">H.Studio is a </span>
              <span className="font-normal leading-[1.1]">full-service</span>
              <span className="leading-[1.1]">
                {' '}creative studio creating beautiful digital experiences and products. We are an{' '}
              </span>
              <span className="font-normal leading-[1.1]">award winning</span>
              <span className="leading-[1.1]">
                {' '}design and art group specializing in branding, web design and engineering.
              </span>
            </p>
            <LetsTalkButton />
          </div>
        </div>
      </div>
    </section>
  );
}
