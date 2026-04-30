export default function FooterSection() {
  return (
    <footer className="bg-black">

      {/* ── Mobile (below lg) ────────────────────────────────────── */}
      <div className="flex flex-col gap-12 px-4 pt-12 lg:hidden">

        {/* Top group: CTA + social links + divider */}
        <div className="flex flex-col gap-6">

          <div className="flex flex-col gap-4">
            {/* CTA headline + button */}
            <div className="flex flex-col gap-3">
              <p className="font-light italic text-[24px] text-white tracking-[-0.96px] uppercase leading-[1.1]">
                Have a <span className="font-black not-italic">project</span> in mind?
              </p>
              <a
                href="#contact"
                className="border border-white text-white font-medium text-[14px] tracking-[-0.56px] px-4 py-3 rounded-[24px] self-start"
              >
                Let&apos;s talk
              </a>
            </div>

            {/* Social links — stacked */}
            {['Facebook', 'Instagram', 'X.com', 'Linkedin'].map((label) => (
              <a
                key={label}
                href="#"
                className="font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1]"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white" />
        </div>

        {/* Bottom: legal links + wordmark */}
        <div className="flex flex-col gap-4 items-center">

          {/* Legal links */}
          <div className="flex gap-[34px] items-center font-normal text-[12px] text-white tracking-[-0.48px] uppercase whitespace-nowrap pb-8">
            <a href="#" className="underline decoration-solid">Licences</a>
            <a href="#" className="underline decoration-solid">Privacy policy</a>
          </div>

          {/* Wordmark block — overflow-hidden clips H.Studio to the right */}
          <div className="flex flex-col gap-3 items-start overflow-hidden w-full">
            <p className="font-mono text-[10px] text-white leading-[1.1] uppercase">
              [ Coded By Claude ]
            </p>
            <p className="capitalize font-semibold leading-[0.8] text-[91.425px] text-white tracking-[-5.4855px] whitespace-nowrap">
              H.Studio
            </p>
          </div>
        </div>
      </div>

      {/* ── Desktop (lg+) ─────────────────────────────────────────── */}
      <div className="hidden lg:flex flex-col gap-[120px] px-8 pt-12">

        {/* Top group: 3-col row + divider */}
        <div className="flex flex-col gap-12">

          {/* 3-column row */}
          <div className="flex items-start justify-between">

            {/* Left: CTA */}
            <div className="flex flex-col gap-3 w-[298px]">
              <p className="font-light italic text-[24px] text-white tracking-[-0.96px] uppercase leading-[1.1]">
                Have a <span className="font-black not-italic">project</span> in mind?
              </p>
              <a
                href="#contact"
                className="border border-white text-white font-medium text-[14px] tracking-[-0.56px] px-4 py-3 rounded-[24px] self-start"
              >
                Let&apos;s talk
              </a>
            </div>

            {/* Center: social 1 */}
            <div className="text-center font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1] w-[298px]">
              <a href="#" className="block">Facebook</a>
              <a href="#" className="block">Instagram</a>
            </div>

            {/* Right: social 2 */}
            <div className="text-right font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1] w-[298px]">
              <a href="#" className="block">X.com</a>
              <a href="#" className="block">Linkedin</a>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white" />
        </div>

        {/* Bottom: wordmark + legal links */}
        <div className="flex items-end justify-between">

          {/*
            H.Studio wordmark block.
            1093 × 219 px matches Figma exactly (≈ 79.4% of 1376 px content width).
            overflow-hidden clips the wordmark text on the right.
          */}
          <div className="relative overflow-hidden w-[1093px] h-[219px] shrink-0">

            {/* "[ Coded By Claude ]" — rotated –90° on the far left */}
            <div className="absolute flex h-[160px] w-[15px] items-center justify-center left-0 top-[34px]">
              <p className="-rotate-90 font-mono text-[14px] text-white leading-[1.1] uppercase whitespace-nowrap">
                [ Coded By Claude ]
              </p>
            </div>

            {/* H.Studio wordmark — vertically centred with a 6.5 px downward nudge */}
            <p
              className="-translate-y-1/2 absolute capitalize font-semibold leading-[0.8] text-[290px] text-white tracking-[-17.4px] whitespace-nowrap"
              style={{ left: '5px', top: 'calc(50% + 6.5px)' }}
            >
              H.Studio
            </p>
          </div>

          {/* Legal links — bottom-aligned via items-end on parent */}
          <div className="flex gap-[34px] items-center font-normal text-[12px] text-white text-center tracking-[-0.48px] uppercase whitespace-nowrap pb-8">
            <a href="#" className="underline decoration-solid">Licences</a>
            <a href="#" className="underline decoration-solid">Privacy policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
