// Indent percentages are fractions of the 1376px content width at the 1440px design width.
// They scale naturally with viewport via % padding since the container is always w-full.
const INDENT_PHOTOGRAPHER = '15.55%'; // 214 / 1376
const INDENT_BORN         = '44.33%'; // 610 / 1376
const INDENT_CHICAGO      = '44.04%'; // 606 / 1376

const textClasses =
  'font-light not-italic text-black leading-[0.84] tracking-[-0.08em] uppercase whitespace-nowrap ' +
  'text-[32px] md:text-[42px] lg:text-[72px] xl:text-[96px]';

export default function IntroSection() {
  return (
    <section className="px-4 py-12 lg:px-8 lg:py-[120px]">

      {/* ─── Header: badge + rule ──────────────────────────────── */}
      <div className="flex flex-col gap-3 mb-6">
        <p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] uppercase text-right">
          [ 8+ years in industry ]
        </p>
        <div className="w-full h-px bg-[#1f1f1f]" />
      </div>

      {/* ─── Staggered text block ──────────────────────────────── */}
      <div className="flex flex-col gap-2">

        {/*
          Line 1: "A creative director   /"
          Mobile  → centered column, "001" above the text
          Desktop → row, text left + "001" right
        */}
        <div className="flex flex-col items-center lg:flex-row lg:items-start gap-3 w-full">
          <span className="order-first lg:order-last font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">
            001
          </span>
          {/* whitespace-pre preserves the triple-space before "/" */}
          <p className={`order-last lg:order-first ${textClasses} whitespace-pre`}>
            {`A creative director   /`}
          </p>
        </div>

        {/*
          Line 2: "Photographer"
          Mobile  → centered
          Desktop → indented ~15.5% from left
        */}
        <div className="flex justify-center lg:justify-start lg:pl-[15.55%]">
          <p className={textClasses}>Photographer</p>
        </div>

        {/*
          Line 3: "Born & raised"  (& is Playfair Display Italic)
          Mobile  → centered
          Desktop → indented ~44.3% from left
        */}
        <div className="flex justify-center lg:justify-start lg:pl-[44.33%]">
          <p className={textClasses}>
            Born{' '}
            <span className="font-[family-name:var(--font-playfair)] italic">&</span>
            {' '}raised
          </p>
        </div>

        {/*
          Line 4: "on the south side"
          Mobile  → centered
          Desktop → no indent (starts at content left)
        */}
        <div className="flex justify-center lg:justify-start">
          <p className={textClasses}>on the south side</p>
        </div>

        {/*
          Line 5: "of chicago." + "[ creative freelancer ]"
          Mobile  → centered column, label below text
          Desktop → indented ~44% from left, label sits to the right of text
                    with a top offset matching the Figma (mt-[26px])
        */}
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:pl-[44.04%] gap-3 lg:gap-4">
          <p className={textClasses}>of chicago.</p>
          <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] uppercase whitespace-nowrap lg:mt-[26px]">
            [ creative freelancer ]
          </span>
        </div>

      </div>
    </section>
  );
}
