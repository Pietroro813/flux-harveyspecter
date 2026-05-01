'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavLink, LetsTalkButton } from './NavUI';

gsap.registerPlugin(ScrollTrigger);

const heroImage = 'https://www.figma.com/api/mcp/asset/262c6eb9-14a1-412c-aa7c-bb4d5514d247';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#contact' },
];

function ProgressiveBlur({ className = '' }: { className?: string }) {
  const N = 8; const maxBlur = 20;
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {Array.from({ length: N }, (_, i) => {
        const blur = (maxBlur * (i + 1)) / N;
        const from = (100 * i) / N;
        const mask = `linear-gradient(to bottom, transparent ${from}%, black 100%)`;
        return <div key={i} className="absolute inset-0" style={{ backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)`, maskImage: mask, WebkitMaskImage: mask }} />;
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

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Parallax refs
  const sectionRef    = useRef<HTMLElement>(null);
  const dHarveyRef    = useRef<HTMLSpanElement>(null);
  const dSpecterRef   = useRef<HTMLSpanElement>(null);
  const dHelloRef     = useRef<HTMLDivElement>(null);
  const dBgRef        = useRef<HTMLImageElement>(null);
  const mHarveyRef    = useRef<HTMLSpanElement>(null);
  const mSpecterRef   = useRef<HTMLSpanElement>(null);
  const mHelloRef     = useRef<HTMLDivElement>(null);
  const mBgRef        = useRef<HTMLImageElement>(null);

  // Mobile menu refs
  const overlayRef      = useRef<HTMLDivElement>(null);
  const linksRef        = useRef<HTMLDivElement>(null);
  const overlayHeaderRef = useRef<HTMLDivElement>(null);
  const overlayFooterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(overlayRef.current, { yPercent: -100 });

    const scrub = 1.5;
    const trigger = { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub };

    // Desktop
    gsap.to(dHarveyRef.current, { x: '-30vw', ...trigger });
    gsap.to(dSpecterRef.current, { x: '30vw', ...trigger });
    gsap.to(dHelloRef.current, { x: '-30vw', ...trigger });
    gsap.to(dBgRef.current, { scale: 1.18, transformOrigin: 'center center', ...trigger });

    // Mobile
    gsap.to(mHarveyRef.current, { x: '-18vw', ...trigger });
    gsap.to(mSpecterRef.current, { x: '18vw', ...trigger });
    gsap.to(mHelloRef.current, { x: '-18vw', ...trigger });
    gsap.to(mBgRef.current, { scale: 1.12, transformOrigin: 'center center', ...trigger });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const openMenu = () => {
    setMenuOpen(true);
    gsap.to(overlayRef.current, { yPercent: 0, duration: 0.55, ease: 'power4.out' });
    const items = [overlayHeaderRef.current, ...(linksRef.current ? Array.from(linksRef.current.children) : []), overlayFooterRef.current].filter(Boolean);
    gsap.fromTo(items, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out', delay: 0.2 });
  };

  const closeMenu = () => {
    const items = [overlayFooterRef.current, ...(linksRef.current ? Array.from(linksRef.current.children).reverse() : []), overlayHeaderRef.current].filter(Boolean);
    gsap.to(items, { y: -20, opacity: 0, duration: 0.25, stagger: 0.05, ease: 'power2.in' });
    gsap.to(overlayRef.current, { yPercent: -100, duration: 0.5, delay: 0.2, ease: 'power4.in', onComplete: () => setMenuOpen(false) });
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden">

      {/* ── Desktop ───────────────────────────────────────────────────────── */}
      <div className="hidden md:flex flex-col gap-[240px] items-center px-8 h-[847px] relative">

        <div className="absolute -translate-y-1/2 pointer-events-none" style={{ aspectRatio: '2291/1346', left: '-34.79%', right: '-34.79%', top: 'calc(50% + 88.84px)' }}>
          <img ref={dBgRef} alt="" className="absolute inset-0 max-w-none object-bottom size-full" src={heroImage} />
        </div>

        <div className="absolute h-[349px] left-0 bottom-0 right-0"><ProgressiveBlur /></div>

        <nav className="flex items-center justify-between py-6 relative shrink-0 w-full">
          <span className="font-semibold text-[16px] tracking-[-0.64px] capitalize text-black">H.Studio</span>
          <div className="flex gap-14 items-center font-semibold text-[16px] tracking-[-0.64px] capitalize text-black">
            {navLinks.map(({ label, href }) => <NavLink key={label} label={label} href={href} />)}
          </div>
          <LetsTalkButton />
        </nav>

        <div className="flex flex-col items-center justify-center relative shrink-0 w-full">
          <div className="flex flex-col items-start pb-[15px] w-full">
            <div ref={dHelloRef} className="flex items-center mb-[-15px] px-[18px] w-full">
              <p className="font-mono font-normal leading-[1.1] text-[14px] text-white uppercase whitespace-nowrap">[ Hello i&apos;m ]</p>
            </div>
            <div className="capitalize font-medium leading-none mb-[-15px] mix-blend-overlay text-[198px] text-center text-white tracking-[-13.86px] w-full">
              <div className="flex items-center justify-center leading-[1.1]">
                <span ref={dHarveyRef} className="inline-block">Harvey</span>
                <span className="inline-block" style={{ whiteSpace: 'pre' }}>{'   '}</span>
                <span ref={dSpecterRef} className="inline-block">Specter</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end justify-center w-full">
            <div className="flex flex-col gap-[17px] items-start">
              <p className="font-bold italic leading-none text-[#1f1f1f] text-[14px] tracking-[-0.56px] uppercase w-[294px]">
                <span className="leading-[1.1]">H.Studio is a </span><span className="font-normal leading-[1.1]">full-service</span>
                <span className="leading-[1.1]"> creative studio creating beautiful digital experiences and products. We are an </span>
                <span className="font-normal leading-[1.1]">award winning</span>
                <span className="leading-[1.1]"> design and art group specializing in branding, web design and engineering.</span>
              </p>
              <LetsTalkButton />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile ────────────────────────────────────────────────────────── */}
      <div className="flex md:hidden flex-col items-center justify-between pb-6 px-4 min-h-svh relative">

        <div className="absolute inset-0 pointer-events-none" style={{ right: '-39.47%' }}>
          <img ref={mBgRef} alt="" className="absolute inset-0 max-w-none object-cover size-full" src={heroImage} />
        </div>
        <div className="absolute h-[349px] left-0 bottom-0 right-0"><ProgressiveBlur /></div>

        <nav className="flex items-center justify-between py-6 relative shrink-0 w-full z-10">
          <span className="font-semibold text-[16px] tracking-[-0.64px] capitalize text-black">H.Studio</span>
          <button onClick={openMenu} aria-label="Open navigation menu" aria-expanded={menuOpen}><HamburgerIcon /></button>
        </nav>

        {/* Mobile overlay — always mounted */}
        <div ref={overlayRef} className="fixed inset-0 z-50 bg-[#fafafa] flex flex-col px-4 pt-6 pb-8" style={{ pointerEvents: menuOpen ? 'auto' : 'none' }} aria-hidden={!menuOpen}>
          <div ref={overlayHeaderRef} className="flex items-center justify-between shrink-0 w-full">
            <span className="font-semibold text-[16px] tracking-[-0.64px] capitalize text-black">H.Studio</span>
            <button onClick={closeMenu} aria-label="Close navigation menu"><CloseIcon /></button>
          </div>
          <div ref={linksRef} className="flex flex-col gap-8 mt-12 font-semibold text-[32px] tracking-[-1.28px] capitalize text-black">
            {navLinks.map(({ label, href }) => (
              <a key={label} href={href} onClick={closeMenu} className="hover:opacity-60 transition-opacity">{label}</a>
            ))}
          </div>
          <div ref={overlayFooterRef} className="mt-auto">
            <LetsTalkButton className="w-full justify-center" />
          </div>
        </div>

        {/* Hero text */}
        <div className="flex flex-col items-center justify-between h-[341px] relative shrink-0 w-full">
          <div className="flex flex-col items-center w-full">
            <div ref={mHelloRef} className="flex items-center justify-center px-[18px] w-full">
              <p className="font-mono font-normal leading-[1.1] text-[14px] text-white uppercase whitespace-nowrap">[ Hello i&apos;m ]</p>
            </div>
            <div className="capitalize font-medium mix-blend-overlay text-[96px] text-center text-white tracking-[-6.72px] w-full">
              <div className="flex items-center justify-center leading-[0.8]">
                <span ref={mHarveyRef} className="inline-block">Harvey</span>
                <span className="inline-block" style={{ whiteSpace: 'pre' }}>{'   '}</span>
                <span ref={mSpecterRef} className="inline-block">Specter</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[17px] items-start w-[293px]">
            <p className="font-bold italic leading-none text-[#1f1f1f] text-[14px] tracking-[-0.56px] uppercase w-[294px]">
              <span className="leading-[1.1]">H.Studio is a </span><span className="font-normal leading-[1.1]">full-service</span>
              <span className="leading-[1.1]"> creative studio creating beautiful digital experiences and products. We are an </span>
              <span className="font-normal leading-[1.1]">award winning</span>
              <span className="leading-[1.1]"> design and art group specializing in branding, web design and engineering.</span>
            </p>
            <LetsTalkButton />
          </div>
        </div>
      </div>

    </section>
  );
}
