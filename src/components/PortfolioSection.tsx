import { client } from '@/sanity/lib/client'

// ── Types ─────────────────────────────────────────────────────────────────────

type PortfolioItem = {
  _id: string
  title: string
  imageUrl: string | null
  tags: string[]
  projectUrl: string | null
}

// ── Query ─────────────────────────────────────────────────────────────────────

const PORTFOLIO_QUERY = `*[_type == "portfolioItem"] | order(order asc) {
  _id,
  title,
  "imageUrl": coverImage.asset->url,
  tags,
  projectUrl
}`

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

function Card({
  title,
  imageUrl,
  tags,
  imgClass,
  titleClass = 'text-[36px] tracking-[-1.44px]',
}: {
  title: string;
  imageUrl: string | null;
  tags: string[];
  imgClass: string;
  titleClass?: string;
}) {
  return (
    <div className="flex flex-col gap-[10px] w-full shrink-0">
      <div className={`relative w-full overflow-hidden bg-[#f1f1f1] ${imgClass}`}>
        {imageUrl && (
          <img
            alt={title}
            src={imageUrl}
            className="absolute inset-0 size-full object-cover"
          />
        )}
        {tags.length > 0 && (
          <div className="absolute bottom-4 left-4 flex gap-3">
            {tags.map((t) => <Tag key={t} label={t} />)}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <p className={`font-black not-italic leading-[1.1] uppercase whitespace-nowrap text-black ${titleClass}`}>
          {title}
        </p>
        <ArrowUpRight />
      </div>
    </div>
  );
}

function CtaBlock({ className = '' }: { className?: string }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      <div className="flex flex-col justify-between shrink-0 w-6">
        <CB v="tl" />
        <CB v="bl" />
      </div>
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
      <div className="flex flex-col justify-between shrink-0 w-6">
        <CB v="tr" />
        <CB v="br" />
      </div>
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

export default async function PortfolioSection() {
  const items = await client.fetch<PortfolioItem[]>(
    PORTFOLIO_QUERY,
    {},
    { cache: 'no-store', useCdn: false },
  )

  const [item0, item1, item2, item3] = items

  return (
    <section className="px-4 py-12 lg:px-8 lg:py-[80px]">

      {/* ── Mobile (< lg) ─────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-8 lg:hidden">

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

        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <Card
              key={item._id}
              title={item.title}
              imageUrl={item.imageUrl}
              tags={item.tags ?? []}
              imgClass="h-[390px]"
              titleClass="text-[24px] tracking-[-0.96px]"
            />
          ))}
        </div>

        <CtaBlock />
      </div>

      {/* ── Desktop (lg+) ─────────────────────────────────────────────────── */}
      <div className="hidden lg:flex flex-col gap-[61px]">

        <div className="flex items-center justify-between">
          <div className="flex gap-[10px] items-start uppercase whitespace-nowrap">
            <div className="font-light not-italic text-[96px] text-black tracking-[-7.68px]">
              <p className="leading-[0.86]">Selected</p>
              <p className="leading-[0.86]">Work</p>
            </div>
            <p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] mt-2">
              004
            </p>
          </div>
          <div className="flex h-[110px] w-[15px] items-center justify-center">
            <p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] uppercase whitespace-nowrap -rotate-90">
              [ portfolio ]
            </p>
          </div>
        </div>

        <div className="flex gap-6 items-end">

          {/* Left column */}
          <div className="flex-1 self-stretch flex min-w-0">
            <div className="flex-1 flex flex-col justify-between h-full min-w-0">
              {item0 && <Card title={item0.title} imageUrl={item0.imageUrl} tags={item0.tags ?? []} imgClass="h-[744px]" />}
              {item1 && <Card title={item1.title} imageUrl={item1.imageUrl} tags={item1.tags ?? []} imgClass="h-[699px]" />}
              <CtaBlock className="w-[465px]" />
            </div>
          </div>

          {/* Right column */}
          <div className="flex-1 flex flex-col gap-[117px] pt-[240px] min-w-0">
            {item2 && <Card title={item2.title} imageUrl={item2.imageUrl} tags={item2.tags ?? []} imgClass="h-[699px]" />}
            {item3 && <Card title={item3.title} imageUrl={item3.imageUrl} tags={item3.tags ?? []} imgClass="h-[744px]" />}
          </div>

        </div>
      </div>

    </section>
  );
}
