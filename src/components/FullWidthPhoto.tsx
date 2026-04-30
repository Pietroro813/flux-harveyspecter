const photoSrc =
  'https://www.figma.com/api/mcp/asset/b101d453-ca7e-445d-8537-525edda3689a';

export default function FullWidthPhoto() {
  return (
    /*
     * Height steps match the design:
     *   mobile  → 480 px  (portrait-ish crop)
     *   md      → 600 px
     *   lg      → 900 px  (1440 px design height)
     *
     * object-cover + object-center keeps the subject visible at every width.
     */
    <div className="w-full h-[480px] md:h-[600px] lg:h-[900px] overflow-hidden">
      <img
        src={photoSrc}
        alt="Photographer at work"
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
}
