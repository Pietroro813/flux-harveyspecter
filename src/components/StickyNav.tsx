'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#contact' },
];

export default function StickyNav() {
  const navRef = useRef<HTMLElement>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { yPercent: -100 });

    const darkIds = ['#fullwidthphoto', '#services', '#footer'];

    const onScroll = () => {
      // Show/hide
      if (window.scrollY > 80) {
        gsap.to(nav, { yPercent: 0, duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
      } else {
        gsap.to(nav, { yPercent: -100, duration: 0.35, ease: 'power3.in', overwrite: 'auto' });
      }

      // Color: check if a dark section is behind the nav
      const navH = nav.offsetHeight;
      const isDark = darkIds.some(id => {
        const el = document.querySelector(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top < navH && r.bottom > 0;
      });
      setDark(isDark);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const color = dark ? 'text-white' : 'text-black';

  return (
    <header ref={navRef} className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${color}`}>
      <div className="hidden md:flex items-center justify-between px-8 py-5">
        <span className="font-semibold text-[16px] tracking-[-0.64px] capitalize">H.Studio</span>
        <div className="flex gap-14 items-center font-semibold text-[16px] tracking-[-0.64px] capitalize">
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} className="hover:opacity-60 transition-opacity">{label}</a>
          ))}
        </div>
        <a href="#contact" className="bg-black text-white font-medium text-[14px] tracking-[-0.56px] px-4 py-3 rounded-[24px]">
          Let&apos;s talk
        </a>
      </div>
      <div className="flex md:hidden items-center justify-between px-4 py-5">
        <span className="font-semibold text-[16px] tracking-[-0.64px] capitalize">H.Studio</span>
      </div>
    </header>
  );
}
