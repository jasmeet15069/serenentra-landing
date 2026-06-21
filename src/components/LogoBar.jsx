import { logoBar } from '../content'

/**
 * Grayscale placeholder logo bar (PRD 5.3). A scrolling marquee of placeholder
 * wordmarks. Replace `logoBar.logos` with real customer logos; hide via
 * config.showLogoBar until real logos exist.
 */
export default function LogoBar() {
  const items = [...logoBar.logos, ...logoBar.logos] // duplicate for seamless marquee
  return (
    <section className="border-y border-espresso/[0.06] bg-sand/40 py-10" aria-label="Trusted by">
      <div className="container-mhms">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.18em] text-espresso/45">
          {logoBar.label} <span className="normal-case text-espresso/30">(placeholder logos)</span>
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <ul className="flex w-max items-center gap-12 animate-marquee motion-reduce:animate-none">
            {items.map((name, i) => (
              <li
                key={i}
                className="font-display text-xl font-semibold text-espresso/35 grayscale"
                aria-hidden={i >= logoBar.logos.length}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
