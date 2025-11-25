'use client';

import { useMemo, useState } from "react";
import { AtlasHero } from "@/components/AtlasHero";
import { FiltersPanel } from "@/components/FiltersPanel";
import { ResourceCard } from "@/components/ResourceCard";
import { categories, resources } from "@/data/resources";

type StageFilter = "all" | typeof resources[number]["stage"];

export default function Page() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [stage, setStage] = useState<StageFilter>("all");
  const [tags, setTags] = useState<string[]>([]);
  const [sorting, setSorting] = useState<"signal" | "maturity">("signal");

  const filtered = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return resources
      .filter((resource) => {
        if (category !== "all" && resource.categoryId !== category) {
          return false;
        }
        if (stage !== "all" && resource.stage !== stage) {
          return false;
        }
        if (tags.length > 0 && !tags.every((tag) => resource.tags.includes(tag))) {
          return false;
        }
        if (!normalized) {
          return true;
        }
        const haystack = [
          resource.name,
          resource.summary,
          resource.region,
          resource.tags.join(" ")
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(normalized);
      })
      .slice()
      .sort((a, b) => {
        if (sorting === "maturity") {
          const order = ["Research", "Early", "Growth", "Enterprise"] as const;
          return order.indexOf(a.stage) - order.indexOf(b.stage);
        }
        return a.name.localeCompare(b.name);
      });
  }, [category, stage, search, tags, sorting]);

  const signals = useMemo(() => {
    const total = resources.length;
    const regionCount = new Set(resources.map((item) => item.region)).size;
    const categorySpread = categories.map((item) => ({
      id: item.id,
      name: item.name,
      share:
        Math.round(
          (resources.filter((resource) => resource.categoryId === item.id).length /
            total) *
            100
        ) || 0
    }));
    return { total, regionCount, categorySpread };
  }, []);

  const handleTagToggle = (tag: string) => {
    setTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag]
    );
  };

  const activeCategory = categories.find((item) => item.id === category);

  return (
    <main className="flex flex-col gap-8 pb-12">
      <AtlasHero />

      <section className="grid gap-6 rounded-3xl bg-white/60 p-6 shadow-atlas backdrop-blur-md sm:grid-cols-3 md:p-8">
        <div className="rounded-2xl border border-atlas-blue/10 bg-atlas-blue/10 p-4 text-atlas-blue">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-atlas-blue/60">
            Indexed Builders
          </p>
          <p className="mt-2 text-3xl font-semibold">{signals.total}</p>
          <p className="mt-2 text-sm text-atlas-blue/70">
            Curated snapshot of the most interesting ChatPT-aligned teams right now.
          </p>
        </div>
        <div className="rounded-2xl border border-atlas-blue/10 bg-atlas-teal/10 p-4 text-atlas-blue">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-atlas-teal/80">
            Regions
          </p>
          <p className="mt-2 text-3xl font-semibold">{signals.regionCount}</p>
          <p className="mt-2 text-sm text-atlas-blue/70">
            Cross-continental coverage with an emphasis on emerging ecosystems.
          </p>
        </div>
        <div className="rounded-2xl border border-atlas-blue/10 bg-atlas-coral/10 p-4 text-atlas-blue">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-atlas-coral/80">
            Category Mix
          </p>
          <ul className="mt-2 space-y-1 text-sm text-atlas-blue/80">
            {signals.categorySpread.map((entry) => (
              <li key={entry.id} className="flex items-center justify-between">
                <span>{entry.name}</span>
                <span className="font-semibold">{entry.share}%</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-6 rounded-3xl bg-white/50 p-6 shadow-atlas backdrop-blur-md lg:flex-row">
        <FiltersPanel
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          stage={stage}
          onStageChange={setStage}
          tags={tags}
          onTagToggle={handleTagToggle}
          availableResources={resources}
        />

        <div className="flex-1 space-y-6">
          <div className="flex flex-col gap-4 rounded-3xl border border-white/60 bg-atlas-sand/60 p-6 text-sm text-atlas-blue/70">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-atlas-blue/40">
                  Signal Focus
                </p>
                <h2 className="text-lg font-semibold text-atlas-blue">
                  {activeCategory ? activeCategory.name : "All categories"}
                </h2>
                <p className="max-w-xl text-xs text-atlas-blue/60">
                  {activeCategory
                    ? activeCategory.tagline
                    : "Use filters to pivot across the ChatPT Atlas and surface your next integration partner."}
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/70 p-1">
                <button
                  type="button"
                  onClick={() => setSorting("signal")}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    sorting === "signal"
                      ? "bg-atlas-blue text-white"
                      : "text-atlas-blue/60 hover:text-atlas-blue"
                  }`}
                >
                  Alphabetical
                </button>
                <button
                  type="button"
                  onClick={() => setSorting("maturity")}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    sorting === "maturity"
                      ? "bg-atlas-blue text-white"
                      : "text-atlas-blue/60 hover:text-atlas-blue"
                  }`}
                >
                  Maturity
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-atlas-blue/60">
              {search && (
                <span className="rounded-full bg-atlas-teal/10 px-3 py-1">
                  Search: &ldquo;{search}&rdquo;
                </span>
              )}
              {stage !== "all" && (
                <span className="rounded-full bg-atlas-coral/10 px-3 py-1">
                  Stage: {stage}
                </span>
              )}
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-atlas-blue/10 px-3 py-1">
                  #{tag}
                </span>
              ))}
              {!search && stage === "all" && tags.length === 0 && (
                <span className="rounded-full bg-white px-3 py-1">
                  Viewing {filtered.length} of {resources.length} builders
                </span>
              )}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-atlas-blue/30 bg-white/70 p-10 text-center text-atlas-blue/60">
              <p className="text-lg font-semibold text-atlas-blue">
                No matches on the atlas yet
              </p>
              <p className="max-w-md text-sm">
                Loosen your filters or ping{" "}
                <a href="mailto:hello@chatptatlas.ai" className="underline">
                  hello@chatptatlas.ai
                </a>{" "}
                with a lead we should index.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {filtered.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
