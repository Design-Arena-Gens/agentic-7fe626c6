import { type AtlasResource, categories } from "@/data/resources";
import cn from "classnames";

function getCategoryStyles(categoryId: string) {
  const category = categories.find((item) => item.id === categoryId);
  return category?.color ?? "bg-atlas-blue/10 text-atlas-blue";
}

export function ResourceCard({ resource }: { resource: AtlasResource }) {
  const category = categories.find((item) => item.id === resource.categoryId);

  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-white/60 bg-gradient-to-br from-white via-white to-atlas-sand/40 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <a
            href={resource.url}
            target="_blank"
            rel="noreferrer"
            className="text-lg font-semibold text-atlas-blue hover:text-atlas-coral"
          >
            {resource.name}
          </a>
          <div className="flex flex-wrap items-center gap-2 text-xs text-atlas-blue/60">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold uppercase tracking-[0.2em]",
                getCategoryStyles(resource.categoryId),
                "bg-opacity-60"
              )}
            >
              {category?.name ?? "Unmapped"}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-atlas-blue/5 px-3 py-1 font-medium text-atlas-blue/70">
              {resource.region}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-atlas-coral/10 px-3 py-1 font-medium text-atlas-coral">
              {resource.stage}
            </span>
          </div>
        </div>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-8 w-8 text-atlas-teal/30"
        >
          <path
            d="M12 3l1.77 5.45h5.73l-4.64 3.37 1.77 5.46L12 13.91l-4.63 3.37 1.77-5.46-4.64-3.37h5.73L12 3z"
            fill="currentColor"
          />
        </svg>
      </div>

      <p className="text-sm leading-relaxed text-atlas-blue/80">{resource.summary}</p>

      <div className="rounded-2xl bg-atlas-blue/5 p-4 text-sm text-atlas-blue/80">
        <p className="font-semibold text-atlas-blue">Signal</p>
        <p className="mt-1 text-atlas-blue/70">{resource.highlight}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {resource.tags.map((tag) => (
          <span
            key={`${resource.id}-${tag}`}
            className="rounded-full bg-atlas-dusk/10 px-3 py-1 text-xs font-medium text-atlas-dusk"
          >
            #{tag}
          </span>
        ))}
      </div>

      {resource.metrics && (
        <dl className="grid grid-cols-2 gap-3 text-xs text-atlas-blue/70">
          {resource.metrics.users && (
            <div className="rounded-2xl border border-atlas-blue/10 bg-white/70 px-3 py-2">
              <dt className="font-semibold uppercase tracking-[0.25em] text-[10px]">
                Teams
              </dt>
              <dd className="text-sm font-semibold text-atlas-blue">
                {resource.metrics.users.toLocaleString()}
              </dd>
            </div>
          )}
          {resource.metrics.rating && (
            <div className="rounded-2xl border border-atlas-blue/10 bg-white/70 px-3 py-2">
              <dt className="font-semibold uppercase tracking-[0.25em] text-[10px]">
                Rating
              </dt>
              <dd className="text-sm font-semibold text-atlas-blue">
                {resource.metrics.rating.toFixed(1)}
              </dd>
            </div>
          )}
          {resource.metrics.launches && (
            <div className="rounded-2xl border border-atlas-blue/10 bg-white/70 px-3 py-2">
              <dt className="font-semibold uppercase tracking-[0.25em] text-[10px]">
                Launches
              </dt>
              <dd className="text-sm font-semibold text-atlas-blue">
                {resource.metrics.launches}
              </dd>
            </div>
          )}
        </dl>
      )}
    </article>
  );
}
