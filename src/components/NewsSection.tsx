const articles = [
  {
    id: 1,
    image: 'https://www.figma.com/api/mcp/asset/e22b80b6-8bf7-4bdf-8c98-8edf6faa9592',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    image: 'https://www.figma.com/api/mcp/asset/b4c89f18-8832-4e14-b1cf-4c017a1528bd',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    stagger: true, // desktop: pt-[120px] to create the vertical offset
  },
  {
    id: 3,
    image: 'https://www.figma.com/api/mcp/asset/8c404aa5-9108-4238-b1bc-002ccb45e7c8',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
] as const;

// ── Arrow icon (same as Portfolio section) ───────────────────────────────────

function ArrowUpRight({ size = 18 }: { size?: number }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M4.5 13.5L13.5 4.5M13.5 4.5H7.5M13.5 4.5V10.5"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Single article card ───────────────────────────────────────────────────────

function ArticleCard({
  image,
  text,
  imgHeight,
  className = '',
}: {
  image: string;
  text: string;
  imgHeight: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Photo */}
      <div className={`relative overflow-hidden shrink-0 w-full ${imgHeight}`}>
        <img
          alt=""
          src={image}
          className="absolute inset-0 size-full object-cover pointer-events-none"
        />
      </div>

      {/* Body text */}
      <p className="font-normal not-italic text-[#1f1f1f] text-[14px] tracking-[-0.56px] leading-[1.3] flex-1">
        {text}
      </p>

      {/* "Read more" link */}
      <a
        href="#"
        className="border-b border-black flex gap-[10px] items-center py-1 self-start shrink-0"
      >
        <span className="font-medium text-[14px] text-black tracking-[-0.56px] whitespace-nowrap">
          Read more
        </span>
        <ArrowUpRight />
      </a>
    </div>
  );
}

// ── Vertical divider ─────────────────────────────────────────────────────────
// self-stretch overrides items-start so the line spans the full column height.

function VDivider() {
  return (
    <div className="self-stretch flex justify-center shrink-0">
      <div className="w-px h-full bg-[#cccccc]" />
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

export default function NewsSection() {
  const blurb = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  return (
    <section className="bg-[#f3f3f3]">

      {/* ── Desktop (lg+) ─────────────────────────────────────────────────── */}
      {/*
        Outer row: items-end so the rotated-title column and the cards block
        bottom-align with each other.
        justify-between pushes the title hard-left and the cards hard-right.
      */}
      <div className="hidden lg:flex items-end justify-between px-8 py-[120px]">

        {/* ── Rotated title ──────────────────────────────────────────────── */}
        {/*
          110px wide × 706px tall container.
          Inside, the text is rotated –90° so it reads bottom-to-top on the
          left side. The text width at 64px Inter Light (~698px) matches the
          706px container height after rotation.
        */}
        <div className="flex h-[706px] w-[110px] shrink-0 items-center justify-center overflow-hidden">
          <div className="-rotate-90 whitespace-nowrap">
            <p className="font-light not-italic text-[64px] text-black tracking-[-5.12px] uppercase leading-[0.86]">
              Keep up with my latest
            </p>
            <p className="font-light not-italic text-[64px] text-black tracking-[-5.12px] uppercase leading-[0.86]">
              news &amp; achievements
            </p>
          </div>
        </div>

        {/* ── Three articles ─────────────────────────────────────────────── */}
        {/*
          flex items-start so Card 2's pt-[120px] creates a real downward
          stagger (cards top-align, Card 2 image starts 120px lower).
          VDividers use self-stretch to span the full height of the tallest card.
        */}
        <div className="flex flex-1 items-start gap-[31px] min-w-0 ml-[80px]">

          {/* Card 1 — no offset */}
          <ArticleCard
            image={articles[0].image}
            text={blurb}
            imgHeight="h-[469px]"
            className="flex-1 min-w-0 h-[581px]"
          />

          <VDivider />

          {/* Card 2 — staggered 120px down */}
          <ArticleCard
            image={articles[1].image}
            text={blurb}
            imgHeight="h-[469px]"
            className="flex-1 min-w-0 pt-[120px]"
          />

          <VDivider />

          {/* Card 3 — no offset */}
          <ArticleCard
            image={articles[2].image}
            text={blurb}
            imgHeight="h-[469px]"
            className="flex-1 min-w-0 h-[581px]"
          />

        </div>
      </div>

      {/* ── Mobile (below lg) ─────────────────────────────────────────────── */}
      {/*
        Title sits above. The 3-card row is wider than the viewport (300px each
        + gaps ≈ 932px in a ~343px content area) so Cards 2 and 3 bleed off
        the right edge — intentional peek effect matching the Figma.
      */}
      <div className="flex flex-col gap-8 px-4 py-16 lg:hidden">

        {/* Title — wraps naturally at 32px on mobile */}
        <p className="font-light not-italic text-[32px] text-black tracking-[-2.56px] uppercase leading-[0.86]">
          Keep up with my latest news &amp; achievements
        </p>

        {/* Cards row — overflow-hidden clips the overflow */}
        <div className="overflow-hidden">
          <div className="flex items-start gap-4">
            {articles.map((a) => (
              <ArticleCard
                key={a.id}
                image={a.image}
                text={blurb}
                imgHeight="h-[398px]"
                className="w-[300px] shrink-0"
              />
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
