'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function NavLink({ label, href, onClick }: { label: string; href: string; onClick?: () => void }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.set(ref.current.querySelectorAll('.char-bot'), { y: '100%' });
  }, []);

  const onEnter = () => {
    if (!ref.current) return;
    gsap.to(ref.current.querySelectorAll('.char-top'), { y: '-100%', duration: 0.4, stagger: 0.025, ease: 'power3.inOut' });
    gsap.to(ref.current.querySelectorAll('.char-bot'), { y: '0%',    duration: 0.4, stagger: 0.025, ease: 'power3.out' });
  };

  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current.querySelectorAll('.char-top'), { y: '0%',    duration: 0.4, stagger: 0.025, ease: 'power3.out' });
    gsap.to(ref.current.querySelectorAll('.char-bot'), { y: '100%',  duration: 0.4, stagger: 0.025, ease: 'power3.inOut' });
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      aria-label={label}
      style={{ display: 'inline-flex', flexDirection: 'column', height: '1em', overflow: 'hidden', lineHeight: 1 }}
    >
      <span className="flex shrink-0" aria-hidden="true">
        {[...label].map((c, i) => <span key={i} className="char-top inline-block" style={{ whiteSpace: 'pre' }}>{c}</span>)}
      </span>
      <span className="flex shrink-0" aria-hidden="true">
        {[...label].map((c, i) => <span key={i} className="char-bot inline-block" style={{ whiteSpace: 'pre' }}>{c}</span>)}
      </span>
    </a>
  );
}

export function LetsTalkButton({ className = '' }: { className?: string }) {
  const btnRef  = useRef<HTMLAnchorElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const onEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!btnRef.current || !fillRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const d = Math.max(r.width, r.height) * 2.5;
    gsap.set(fillRef.current, { left: x, top: y, width: d, height: d, scale: 0, opacity: 1 });
    gsap.to(fillRef.current, { scale: 1, duration: 0.5, ease: 'power2.out' });
    gsap.to(btnRef.current, { x: (x - r.width / 2) * 0.25, y: (y - r.height / 2) * 0.25, duration: 0.3, ease: 'power2.out' });
    gsap.to(textRef.current, { color: '#000', duration: 0.25 });
  };

  const onLeave = () => {
    if (!btnRef.current || !fillRef.current) return;
    gsap.to(fillRef.current, { scale: 0, duration: 0.4, ease: 'power2.in' });
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' });
    gsap.to(textRef.current, { color: '#fff', duration: 0.3, delay: 0.1 });
  };

  return (
    <a
      ref={btnRef}
      href="#contact"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`relative overflow-hidden bg-black border border-black font-medium text-[14px] tracking-[-0.56px] px-4 py-3 rounded-[24px] inline-flex items-center ${className}`}
    >
      <span ref={fillRef} className="absolute rounded-full bg-white pointer-events-none opacity-0" style={{ transform: 'translate(-50%,-50%)' }} />
      <span ref={textRef} className="relative z-10 text-white whitespace-nowrap">Let&apos;s talk</span>
    </a>
  );
}
