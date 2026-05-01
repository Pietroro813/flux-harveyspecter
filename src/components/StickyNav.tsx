'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavLink, LetsTalkButton } from './NavUI';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#contact' },
];

function HamburgerIcon({ white }: { white?: boolean }) {
  const fill = white ? 'white' : 'black';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect y="4" width="24" height="2" rx="1" fill={fill} />
      <rect y="11" width="24" height="2" rx="1" fill={fill} />
      <rect y="18" width="24" height="2" rx="1" fill={fill} />
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

export default function StickyNav() {
  const navRef      = useRef<HTMLElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const linksRef    = useRef<HTMLDivElement>(null);
  const [dark, setDark]       = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Start hidden above viewport
    gsap.set(nav, { yPercent: -100 });
    gsap.set(overlayRef.current, { yPercent: -100 });

    // Slide in after scrolling past 80px
    ScrollTrigger.create({
      start: '80px top',
      onEnter:     () => gsap.to(nav, { yPercent: 0,    duration: 0.45, ease: 'power3.out' }),
      onLeaveBack: () => gsap.to(nav, { yPercent: -100, duration: 0.35, ease: 'power3.in' }),
    });

    // Dark sections: services + footer
    const darkSections = ['#fullwidthphoto', '#services', '#footer'];
    darkSections.forEach(id => {
      const el = document.querySelector(id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        onEnter:     () => setDark(true),
        onLeave:     () => setDark(false),
        onEnterBack: () => setDark(true),
        onLeaveBack: () => setDark(false),
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const openMenu = () => {
    setMenuOpen(true);
    gsap.to(overlayRef.current, { yPercent: 0, duration: 0.55, ease: 'power4.out' });
    if (linksRef.current) {
      gsap.fromTo(Array.from(linksRef.current.children),
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out', delay: 0.2 },
      );
    }
  };

  const closeMenu = () => {
    if (linksRef.current)
      gsap.to(Array.from(linksRef.current.children).reverse(), { y: -20, opacity: 0, duration: 0.2, stagger: 0.04 });
    gsap.to(overlayRef.current, { yPercent: -100, duration: 0.45, delay: 0.15, ease: 'power4.in', onComplete: () => setMenuOpen(false) });
  };

  const textColor = dark ? 'text-white' : 'text-black';

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300`}
      >
        {/* Desktop */}
        <div className={`hidden md:flex items-center justify-between px-8 py-5 ${textColor}`}>
          <span className="font-semibold text-[16px] tracking-[-0.64px] capitalize">H.Studio</span>
          <div className="flex gap-14 items-center font-semibold text-[16px] tracking-[-0.64px] capitalize">
            {navLinks.map(({ label, href }) => (
              <NavLink key={label} label={label} href={href} />
            ))}
          </div>
          <LetsTalkButton />
        </div>

        {/* Mobile */}
        <div className={`flex md:hidden items-center justify-between px-4 py-5 ${textColor}`}>
          <span className="font-semibold text-[16px] tracking-[-0.64px] capitalize">H.Studio</span>
          <button onClick={openMenu} aria-label="Open menu" aria-expanded={menuOpen}>
            <HamburgerIcon white={dark} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-[#fafafa] flex flex-col px-4 pt-6 pb-8 md:hidden"
        style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between shrink-0 w-full">
          <span className="font-semibold text-[16px] tracking-[-0.64px] capitalize text-black">H.Studio</span>
          <button onClick={closeMenu} aria-label="Close menu"><CloseIcon /></button>
        </div>
        <div ref={linksRef} className="flex flex-col gap-8 mt-12 font-semibold text-[32px] tracking-[-1.28px] capitalize text-black">
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} onClick={closeMenu} className="hover:opacity-60 transition-opacity">{label}</a>
          ))}
        </div>
        <div className="mt-auto">
          <LetsTalkButton className="w-full justify-center" />
        </div>
      </div>
    </>
  );
}
