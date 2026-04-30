// ── Assets ──────────────────────────────────────────────────────────────────

const img = {
  surfers:  'https://www.figma.com/api/mcp/asset/e5410a3f-65e7-4474-881b-5f3de13d375e',
  cyberpunk:'https://www.figma.com/api/mcp/asset/6f2b323d-a8bb-4102-bb89-8de1e8c7b6cb',
  agency:   'https://www.figma.com/api/mcp/asset/654d3178-5452-4213-b513-8c800077cf25',
  minimal:  'https://www.figma.com/api/mcp/asset/0fb0c8a5-b65f-44f3-9974-32eefa902596',
};

const tags = ['Social Media', 'Photography'];

// ── Sub-components ───────────────────────────────────────────────────────────

function Tag({ label }: { label: string }) {
  return (
    <div className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.3)] px-2 py-1 rounded-full shrink-0">
      <span className="font-medium text-[14px] text-[#111] tracking-[-0.56px] whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

function ArrowUpRight() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M9 23L23 9M23 9H13M23 9V19"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Corner bracket glyphs (same technique as AboutSection)
type CornerV = 'tl' | 'tr' | 'br' | 'bl';
const cPaths: Record<CornerV, string> = {
  tl: 'M1 15 L1 1 L15 1',
  tr: 'M1 1 L15 1 L15 15',
  br: 'M15 1 L15 15 L1 15',
  bl: 'M15 15 L1 15 L1 1',
};
function CB({ v }: { v: CornerV }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <path d={cPaths[v]} stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

// Project card — image container height is passed as a Tailwind class
function Card({
  title,
  image,
  imgClass,
  titleClass = 'text-[36px] tracking-[-1.44px]',
}: {
  title: string;
  image: string;
  imgClass: string;
  titleClass?: string;
}) {
  return (
    <div className="flex flex-col gap-[10px] w-full shrink-0">
      {/* Image */}
      <div className={`relative w-full overflow-hidden ${imgClass}`}>
        <img
          alt={title}
          src={image}
          className="absolute inset-0 size-full object-cover"
        />
        {/* Frosted glass tags, anchored bottom-left */}
        <div className="absolute bottom-4 left-4 flex gap-3">
          {tags.map((t) => <Tag key={t} label={t} />)}
        </div>
      </div>
      {/* Title row */}
      <div className="flex items-center justify-between">
        <p className={`font-black not-italic leading-[1.1] uppercase whitespace-nowrap text-black ${titleClass}`}>
          {title}
        </p>
        <ArrowUpRight />
      </div>
    </div>
  );
}

// CTA bracketed block — used in both layouts
function CtaBlock({ className = '' }: { className?: string }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      {/* Left bracket column */}
      <div className="flex flex-col justify-between shrink-0 w-6">
        <CB v="tl" />
        <CB v="bl" />
      </div>
      {/* Content */}
      <div className="flex flex-1 flex-col gap-[10px] items-start justify-center py-3 min-w-0">
        <p className="italic font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.56px]">
          Discover how my creativity transforms ideas into impactful digital
          experiences — schedule a call with me to get started.
        </p>
        <a
          href="#contact"
          className="bg-black text-white font-medium text-[14px] tracking-[-0.56px] px-4 py-3 rounded-[24px]"
        >
          Let&apos;s talk
        </a>
      </div>
      {/* Right bracket column */}
      <div className="flex flex-col justify-between shrink-0 w-6">
        <CB v="tr" />
        <CB v="br" />
      </div>
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

export default function PortfolioSection() {
  return (
    <section className="px-4 py-12 lg:px-8 lg:py-[80px]">

      {/* ── Mobile (< lg) ─────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-8 lg:hidden">

        {/* Header */}
        <div className="flex flex-col gap-4 uppercase">
          <p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">
            [ portfolio ]
          </p>
          <div className="flex items-start justify-between">
            <div className="font-light not-italic text-[32px] text-black tracking-[-2.56px]">
              <p className="leading-[0.86]">Selected</p>
              <p className="leading-[0.86]">Work</p>
            </div>
            <p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">004</p>
          </div>
        </div>

        {/* 4 stacked cards */}
        <div className="flex flex-col gap-6">
          <Card title="Surfers Paradise"   image={img.surfers}   imgClass="h-[390px]" titleClass="text-[24px] tracking-[-0.96px]" />
          <Card title="Cyberpunk Caffe"    image={img.cyberpunk} imgClass="h-[390px]" titleClass="text-[24px] tracking-[-0.96px]" />
          <Card title="Agency 976"         image={img.agency}    imgClass="h-[390px]" titleClass="text-[24px] tracking-[-0.96px]" />
          <Card title="Minimal Playground" image={img.minimal}   imgClass="h-[390px]" titleClass="text-[24px] tracking-[-0.96px]" />
        </div>

        {/* CTA */}
        <CtaBlock />
      </div>

      {/* ── Desktop (lg+) ─────────────────────────────────────────────────── */}
      <div className="hidden lg:flex flex-col gap-[61px]">

        {/* Header */}
        <div className="flex items-center justify-between">
          {/* "Selected Work" + 004 */}
          <div className="flex gap-[10px] items-start uppercase whitespace-nowrap">
            <div className="font-light not-italic text-[96px] text-black tracking-[-7.68px]">
              <p className="leading-[0.86]">Selected</p>
              <p className="leading-[0.86]">Work</p>
            </div>
            <p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] mt-2">
              004
            </p>
          </div>
          {/* [ portfolio ] rotated –90° on far right */}
          <div className="flex h-[110px] w-[15px] items-center justify-center">
            <p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] uppercase whitespace-nowrap -rotate-90">
              [ portfolio ]
            </p>
          </div>
        </div>

        {/*
          Two-column staggered grid.
          ─ Outer: flex row, items-end (both columns bottom-align).
          ─ Left wrapper: self-stretch → its height = outer container height
            (which is set by the right column's taller content).
          ─ Left inner: h-full + justify-between distributes the 3 items
            (Card1, Card2, CTA) across the full height automatically.
          ─ Right: pt-[240px] starts lower; gap-[117px] between its two cards.
        */}
        <div className="flex gap-6 items-end">

          {/* Left column */}
          <div className="flex-1 self-stretch flex min-w-0">
            <div className="flex-1 flex flex-col justify-between h-full min-w-0">
              <Card title="Surfers Paradise" image={img.surfers}   imgClass="h-[744px]" />
              <Card title="Cyberpunk Caffe"  image={img.cyberpunk} imgClass="h-[699px]" />
              {/*
                CTA box: 465 px wide matches the Figma exactly
                (≈ 33.8 % of the 1376 px content width).
              */}
              <CtaBlock className="w-[465px]" />
            </div>
          </div>

          {/* Right column: offset 240 px from top */}
          <div className="flex-1 flex flex-col gap-[117px] pt-[240px] min-w-0">
            <Card title="Agency 976"         image={img.agency}   imgClass="h-[699px]" />
            <Card title="Minimal Playground" image={img.minimal}  imgClass="h-[744px]" />
          </div>

        </div>
      </div>

    </section>
  );
}
