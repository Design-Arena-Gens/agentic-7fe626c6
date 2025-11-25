import { useMemo } from "react";
import cn from "classnames";
import { categories, type AtlasResource } from "@/data/resources";

type StageFilter = "all" | AtlasResource["stage"];

type FiltersPanelProps = {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  stage: StageFilter;
  onStageChange: (value: StageFilter) => void;
  tags: string[];
  onTagToggle: (value: string) => void;
  availableResources: AtlasResource[];
};

const stageOptions: StageFilter[] = ["all", "Research", "Early", "Growth", "Enterprise"];

export function FiltersPanel({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  stage,
  onStageChange,
  tags,
  onTagToggle,
  availableResources
}: FiltersPanelProps) {
  const tagFrequency = useMemo(() => {
    const counts = new Map<string, number>();
    availableResources.forEach((resource) => {
      resource.tags.forEach((tag) => {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12);
  }, [availableResources]);

  return (
    <aside className="flex flex-col gap-6 rounded-3xl bg-white/75 p-6 shadow-atlas backdrop-blur-md lg:w-80">
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-atlas-blue/40">
          Discover
        </label>
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by product, region, or keywords"
          className="mt-3 w-full rounded-2xl border border-atlas-blue/15 bg-atlas-sand/60 px-4 py-3 text-sm text-atlas-blue placeholder:text-atlas-blue/40 focus:border-atlas-teal/40 focus:outline-none focus:ring-2 focus:ring-atlas-teal/20"
        />
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-atlas-blue/40">
          Category
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onCategoryChange("all")}
            className={cn(
              "rounded-full border border-atlas-blue/10 px-4 py-2 text-xs font-medium transition",
              category === "all"
                ? "bg-atlas-teal/90 text-white shadow-md"
                : "bg-white hover:border-atlas-teal/40 hover:text-atlas-teal"
            )}
          >
            All categories
          </button>
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onCategoryChange(item.id)}
              className={cn(
                "rounded-full border border-atlas-blue/10 px-4 py-2 text-xs font-medium transition",
                category === item.id
                  ? "bg-atlas-blue text-white shadow-md"
                  : "bg-white hover:border-atlas-blue/40 hover:text-atlas-blue"
              )}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-atlas-blue/40">
          Stage
        </p>
        <div className="grid grid-cols-2 gap-2">
          {stageOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onStageChange(option)}
              className={cn(
                "rounded-2xl border border-atlas-blue/10 px-4 py-2 text-xs font-semibold transition",
                stage === option
                  ? "bg-atlas-coral text-white shadow"
                  : "bg-white hover:border-atlas-coral/50 hover:text-atlas-coral"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-atlas-blue/40">
          Themes
        </p>
        <div className="flex flex-wrap gap-2">
          {tagFrequency.map(([tag, count]) => {
            const isActive = tags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onTagToggle(tag)}
                className={cn(
                  "rounded-full border border-atlas-blue/10 px-3 py-1.5 text-xs transition",
                  isActive
                    ? "bg-atlas-blue text-white shadow"
                    : "bg-white text-atlas-blue/70 hover:border-atlas-blue/40 hover:text-atlas-blue"
                )}
              >
                #{tag}{" "}
                <span className="ml-1 rounded-full bg-atlas-blue/10 px-2 py-0.5 text-[10px] font-semibold text-atlas-blue/70">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
