const serviceDescription =
  'Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.';

const services = [
  {
    index: 1,
    name: 'Brand Discovery',
    description: serviceDescription,
    image: 'https://www.figma.com/api/mcp/asset/83dd79f4-35e5-467e-a70c-78a5612e209d',
  },
  {
    index: 2,
    name: 'Web design & Dev',
    description: serviceDescription,
    image: 'https://www.figma.com/api/mcp/asset/fa0a8d28-d778-4be4-8848-c7d80645c8f8',
  },
  {
    index: 3,
    name: 'Marketing',
    description: serviceDescription,
    image: 'https://www.figma.com/api/mcp/asset/e322a188-64f1-4273-9848-337f182304bb',
  },
  {
    index: 4,
    name: 'Photography',
    description: serviceDescription,
    image: 'https://www.figma.com/api/mcp/asset/aa1ecadd-8b4b-489c-ba01-aa63e415aa4f',
    /*
     * Figma uses an overscaled absolute crop: the image is rendered at 149.93 %
     * of the container height and offset upward by 42.25 % of the container,
     * which frames the product in the lower-centre of the photo.
     * Simple object-cover + object-position can't replicate this precisely,
     * so we use the same absolute technique instead.
     */
    imgStyle: { width: '100%', height: '149.93%', top: '-42.25%', left: 0 } as React.CSSProperties,
  },
] as const;

// ── Single service row ───────────────────────────────────────────────────────

type Service = (typeof services)[number];

function ServiceItem({ service }: { service: Service }) {
  const hasCrop = 'imgStyle' in service;

  return (
    <div className="flex flex-col gap-[9px] w-full">

      {/* Number + rule */}
      <div className="flex flex-col gap-[9px] w-full">
        <p className="font-mono text-[14px] text-white leading-[1.1] uppercase">
          [ {service.index} ]
        </p>
        <div className="w-full border-t border-white" />
      </div>

      {/*
        Body row
        ─ Mobile  : flex-col  → name / description / image stacked
        ─ Desktop : flex-row justify-between → name left | description+image right
      */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

        {/* Service name */}
        <p className="font-bold italic text-[36px] text-white tracking-[-1.44px] leading-[1.1] uppercase whitespace-nowrap shrink-0">
          {service.name}
        </p>

        {/*
          Right group: description + thumbnail
          ─ Mobile  : flex-col, gap-4, full-width text
          ─ Desktop : flex-row, gap-6, text capped at 393 px
        */}
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-6 lg:items-start shrink-0">
          <p className="font-normal not-italic text-[14px] text-white leading-[1.3] tracking-[-0.56px] lg:w-[393px]">
            {service.description}
          </p>

          {/* 151 × 151 thumbnail */}
          <div className="relative size-[151px] shrink-0 overflow-hidden">
            {hasCrop ? (
              /* Photography: absolute crop matching Figma exactly */
              <img
                alt={service.name}
                src={service.image}
                className="absolute max-w-none"
                style={(service as typeof services[3]).imgStyle}
              />
            ) : (
              /* All other services: standard object-cover */
              <img
                alt={service.name}
                src={service.image}
                className="absolute inset-0 size-full object-cover object-center"
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

export default function ServicesSection() {
  return (
    <section className="bg-black px-4 py-12 lg:px-8 lg:py-[80px] flex flex-col gap-8 lg:gap-12">

      {/* [ services ] label */}
      <p className="font-mono text-[14px] text-white leading-[1.1] uppercase">
        [ services ]
      </p>

      {/*
        Headline: "[4]" far-left, "Deliverables" far-right
        Font scales: 32 px mobile → 96 px desktop
        Tracking scales proportionally (-0.08 em)
      */}
      <div className="flex items-center justify-between font-light not-italic text-white uppercase tracking-[-0.08em]
        text-[32px] lg:text-[96px]">
        <span>[4]</span>
        <span>Deliverables</span>
      </div>

      {/* Service list — 48 px gap between items at all breakpoints */}
      <div className="flex flex-col gap-12">
        {services.map((service) => (
          <ServiceItem key={service.index} service={service} />
        ))}
      </div>

    </section>
  );
}
