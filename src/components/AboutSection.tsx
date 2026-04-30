const portraitImage =
  'https://www.figma.com/api/mcp/asset/c9d6283b-1c56-438b-853f-ebf3f887cb64';

const aboutText =
  'Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.';

// ── Corner bracket glyphs ────────────────────────────────────────────────────
// Each variant is an explicit path so no CSS transform-origin ambiguity.

type CornerVariant = 'tl' | 'tr' | 'br' | 'bl';

const cornerPaths: Record<CornerVariant, string> = {
  tl: 'M1 15 L1 1 L15 1',   // ┌
  tr: 'M1 1 L15 1 L15 15',  // ┐
  br: 'M15 1 L15 15 L1 15', // ┘
  bl: 'M15 15 L1 15 L1 1',  // └
};

function CornerBracket({ variant }: { variant: CornerVariant }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d={cornerPaths[variant]}
        stroke="#1f1f1f"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

// ── Text block framed with corner brackets ───────────────────────────────────
// Default flex-stretch means the side columns grow to match the text height,
// letting justify-between push brackets to top/bottom corners.

function BracketedText() {
  return (
    <div className="flex gap-3 w-full">
      {/* Left column */}
      <div className="flex flex-col justify-between shrink-0 w-6">
        <CornerBracket variant="tl" />
        <CornerBracket variant="bl" />
      </div>

      {/* Body text */}
      <p className="flex-1 min-w-0 font-normal not-italic leading-[1.3] text-[#1f1f1f] text-[14px] tracking-[-0.56px] py-3">
        {aboutText}
      </p>

      {/* Right column */}
      <div className="flex flex-col justify-between shrink-0 w-6">
        <CornerBracket variant="tr" />
        <CornerBracket variant="br" />
      </div>
    </div>
  );
}

// ── Portrait photo ───────────────────────────────────────────────────────────

function Portrait({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Slight overscan (matches Figma: ~1% on each edge) to avoid white borders */}
      <img
        alt="Portrait"
        src={portraitImage}
        className="absolute max-w-none"
        style={{
          width: '101.42%',
          height: '101.39%',
          top: '-0.69%',
          left: '-0.71%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

export default function AboutSection() {
  return (
    <section className="px-4 py-12 lg:px-8 lg:py-[80px]">

      {/* ── Mobile (< lg) ─────────────────────────────────────── */}
      <div className="flex flex-col gap-5 lg:hidden">
        <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] uppercase">
          002
        </span>
        <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] uppercase">
          [ About ]
        </span>
        <BracketedText />
        <Portrait className="w-full aspect-[422/594]" />
      </div>

      {/* ── Desktop (lg+) ─────────────────────────────────────── */}
      {/*
        justify-between puts [ About ] far-left and the right block at the end.
        The right block uses items-end so the text panel's bottom aligns with
        the bottom of the portrait (the portrait is the tallest element).
      */}
      <div className="hidden lg:flex items-start justify-between gap-8">

        {/* Far-left label */}
        <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] uppercase whitespace-nowrap shrink-0">
          [ About ]
        </span>

        {/* Right block ≈ 71.45 % of content width (983 / 1376) */}
        <div
          className="flex gap-8 items-end min-w-0"
          style={{ width: '71.45%' }}
        >
          {/* Bracketed text — grows to fill space left of the photo */}
          <div className="flex-1 min-w-0">
            <BracketedText />
          </div>

          {/* 002 label + portrait */}
          <div className="flex gap-6 items-start shrink-0">
            <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] uppercase">
              002
            </span>
            {/*
              Fixed 436 × 614 px matches the Figma 1:1.
              At lg (1024 px) this is ~45 % of content width — still comfortable.
            */}
            <Portrait className="w-[436px] h-[614px]" />
          </div>
        </div>
      </div>

    </section>
  );
}
