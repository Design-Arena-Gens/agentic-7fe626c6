import { categories } from "@/data/resources";

export function AtlasHero() {
  return (
    <header className="mb-10">
      <div className="flex flex-col gap-6 rounded-3xl bg-white/80 p-8 shadow-atlas backdrop-blur-md md:p-10">
        <div className="flex flex-col gap-3">
          <span className="inline-flex items-center gap-2 self-start rounded-full border border-atlas-teal/20 bg-atlas-teal/5 px-4 py-1 text-xs uppercase tracking-[0.35em] text-atlas-teal/70">
            ChatPT Atlas
          </span>
          <h1 className="text-3xl font-semibold text-atlas-blue sm:text-4xl md:text-5xl">
            The living index of conversational AI builders
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-atlas-blue/80 sm:text-lg">
            Scan emergent platforms, promptcraft studios, infrastructure stacks,
            and vertical copilots. Each profile includes regional insight,
            maturity signals, and the differentiator that keeps teams coming
            back.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl border border-white/60 bg-gradient-to-br from-white to-atlas-sand/60 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-sm font-medium text-atlas-blue/90">
                {category.name}
              </p>
              <p className="mt-2 text-xs text-atlas-blue/70">
                {category.tagline}
              </p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
