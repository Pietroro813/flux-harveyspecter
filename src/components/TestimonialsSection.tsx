// ── Logo assets per testimonial ─────────────────────────────────────────────
// Each logo has its exact rendered dimensions from Figma so the img container
// matches precisely without any layout shift.

const logos = {
  marko: {
    src: 'https://www.figma.com/api/mcp/asset/20a734e3-16bb-4e87-ad93-f56a66e1f716',
    w: 142.75, h: 18.97,
  },
  lukas: {
    src: 'https://www.figma.com/api/mcp/asset/8097d46e-bb97-4741-92eb-6e1c725c0527',
    w: 137.73, h: 19.26,
  },
  sarah: {
    src: 'https://www.figma.com/api/mcp/asset/12ff0a51-0ef2-4b0d-bb1f-7cc13ad1b55d',
    w: 108.54, h: 30.75,
  },
  sofia: {
    src: 'https://www.figma.com/api/mcp/asset/f9a16041-f8cf-48d8-94c5-ec2b0e829eb9',
    w: 81.1,   h: 36.17,
  },
} as const;

type LogoKey = keyof typeof logos;

// ── Testimonial card ─────────────────────────────────────────────────────────

function Card({
  name,
  text,
  logoKey,
  width = 353,
}: {
  name: string;
  text: string;
  logoKey: LogoKey;
  width?: number;
}) {
  const logo = logos[logoKey];
  return (
    <div
      className="bg-[#f1f1f1] border border-[#ddd] flex flex-col gap-4 p-6 rounded-[4px]"
      style={{ width: `${width}px` }}
    >
      {/* Brand logo */}
      <div className="relative shrink-0" style={{ width: `${logo.w}px`, height: `${logo.h}px` }}>
        <img
          src={logo.src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-contain object-left"
        />
      </div>

      {/* Quote */}
      <p className="font-normal not-italic text-[#1f1f1f] text-[18px] tracking-[-0.72px] leading-[1.3]">
        {text}
      </p>

      {/* Reviewer */}
      <p className="font-black not-italic text-[16px] text-black tracking-[-0.64px] leading-[1.1] uppercase whitespace-nowrap">
        {name}
      </p>
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-[#fafafa]">

      {/*
        ── Desktop (xl = 1280px+) ─────────────────────────────────────────
        Fixed 987px height matches the Figma frame exactly.

        Z-index layering (all children share the same stacking context):
          z-[1]  → Marko + Lukas  (top cards, behind heading)
          z-[2]  → "Testimonials" heading (middle layer)
          z-[3]  → Sarah + Sofia  (bottom cards, in front of heading)

        Card positions use % of the 1440px design width so they scale
        gracefully between 1280px and wider viewports.
        Top positions are % of the 987px section height.
      */}
      <div className="hidden xl:flex flex-col items-center justify-center h-[987px] relative">

        {/* ─ Marko Stojković · top-left · behind heading ─ */}
        <div
          className="absolute z-[1] flex items-center justify-center"
          style={{ left: '7.08%', top: '14.39%', width: '381px', height: '295px' }}
        >
          <div style={{ transform: 'rotate(-6.85deg)' }}>
            <Card
              name="Marko Stojković"
              logoKey="marko"
              text="A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive."
            />
          </div>
        </div>

        {/* ─ Lukas Weber · top-right · behind heading ─ */}
        <div
          className="absolute z-[1] flex items-center justify-center"
          style={{ left: '46.94%', top: '27.56%', width: '362px', height: '204px' }}
        >
          <div style={{ transform: 'rotate(2.9deg)' }}>
            <Card
              name="Lukas Weber"
              logoKey="lukas"
              text="Professional, precise, and incredibly fast at handling complex product visualizations and templates."
            />
          </div>
        </div>

        {/* ─ "Testimonials" heading · middle z-layer ─ */}
        <h2
          className="relative z-[2] font-medium not-italic text-[198px] text-black text-center tracking-[-13.86px] leading-[1.1] capitalize select-none"
        >
          Testimonials
        </h2>

        {/* ─ Sarah Jenkins · bottom-left · in front of heading ─ */}
        <div
          className="absolute z-[3] flex items-center justify-center"
          style={{ left: '21.18%', top: '56.03%', width: '363px', height: '280px' }}
        >
          <div style={{ transform: 'rotate(2.23deg)' }}>
            <Card
              name="Sarah Jenkins"
              logoKey="sarah"
              text="A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity."
            />
          </div>
        </div>

        {/* ─ Sofia Martínez · bottom-right · in front of heading ─ */}
        <div
          className="absolute z-[3] flex items-center justify-center"
          style={{ left: '68.54%', top: '55.32%', width: '367px', height: '228px' }}
        >
          <div style={{ transform: 'rotate(-4.15deg)' }}>
            <Card
              name="Sofia Martínez"
              logoKey="sofia"
              text="An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats."
            />
          </div>
        </div>

      </div>

      {/*
        ── Mobile (below xl) ──────────────────────────────────────────────
        Heading sits above the cards.
        Two cards in a horizontal row — the second card bleeds off-screen
        on purpose (overflow-hidden clips it), creating the "peek" effect.
        A -10px right margin on the first card creates the slight overlap.
      */}
      <div className="flex flex-col gap-8 px-4 py-16 xl:hidden">

        {/* Heading */}
        <h2 className="font-medium not-italic text-[64px] text-black text-center tracking-[-4.48px] leading-[0.8] capitalize w-full">
          Testimonials
        </h2>

        {/* Cards row — overflow-hidden clips the second card at the right edge */}
        <div className="overflow-hidden">
          <div className="flex items-center" style={{ paddingRight: '10px' }}>

            {/* Card 1 · Marko · rotated left · overlaps card 2 by 10px */}
            <div
              className="relative z-[2] shrink-0 flex items-center justify-center"
              style={{ width: '277px', height: '316px', marginRight: '-10px' }}
            >
              <div style={{ transform: 'rotate(-3.5deg)' }}>
                <Card
                  name="Marko Stojković"
                  logoKey="marko"
                  width={260}
                  text="A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive."
                />
              </div>
            </div>

            {/* Card 2 · Sofia · rotated right · partially off-screen */}
            <div
              className="relative z-[1] shrink-0 flex items-center justify-center"
              style={{ width: '268px', height: '264px' }}
            >
              <div style={{ transform: 'rotate(2deg)' }}>
                <Card
                  name="Sofia Martínez"
                  logoKey="sofia"
                  width={260}
                  text="An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats."
                />
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
