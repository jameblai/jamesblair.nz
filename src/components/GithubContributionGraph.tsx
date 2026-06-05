import { useEffect, useMemo, useRef, useState } from "react";

interface GithubContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionDot extends GithubContributionDay {
  week: number;
  day: number;
}

interface PointerPosition {
  x: number;
  y: number;
}

const GITHUB_CONTRIBUTIONS_URL =
  "https://github-contributions-api.jogruber.de/v4/jameblai?y=last";

const DOT_SIZE = 7;
const DOT_GAP = 5;
const STEP = DOT_SIZE + DOT_GAP;
const HOVER_RADIUS = 44;
const OPACITY_BY_LEVEL = [0.12, 0.32, 0.5, 0.68, 0.88];

const formatContributionCount = (count: number) =>
  new Intl.NumberFormat("en-NZ").format(count);

const getUtcDay = (date: string) =>
  new Date(`${date}T00:00:00.000Z`).getUTCDay();

const getContributionDots = (
  days: GithubContributionDay[],
): ContributionDot[] => {
  const firstDayOffset = getUtcDay(days[0]?.date ?? "");

  return days.map((day, index) => {
    const gridIndex = index + firstDayOffset;

    return {
      ...day,
      week: Math.floor(gridIndex / 7),
      day: gridIndex % 7,
    };
  });
};

interface ContributionData {
  days: GithubContributionDay[];
  total: number;
}

function isContributionDay(value: unknown): value is GithubContributionDay {
  if (!value || typeof value !== "object") return false;
  const day = value as Record<string, unknown>;
  return (
    typeof day.date === "string" &&
    typeof day.count === "number" &&
    typeof day.level === "number"
  );
}

async function fetchContributions(): Promise<ContributionData> {
  const response = await fetch(GITHUB_CONTRIBUTIONS_URL);
  if (!response.ok) {
    throw new Error(`GitHub contributions API returned ${response.status}`);
  }

  const data = (await response.json()) as {
    total?: { lastYear?: number };
    contributions?: GithubContributionDay[];
  };

  const days = data.contributions?.filter(isContributionDay) ?? [];

  return {
    total:
      typeof data.total?.lastYear === "number"
        ? data.total.lastYear
        : days.reduce((sum, day) => sum + day.count, 0),
    days,
  };
}

export const GithubContributionGraph = () => {
  const [data, setData] = useState<ContributionData | null>(null);
  const [pointer, setPointer] = useState<PointerPosition | null>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchContributions()
      .then(setData)
      .catch(() => {
        // Silently fail — graph just won't render
      });
  }, []);

  const dots = useMemo(
    () => (data ? getContributionDots(data.days) : []),
    [data],
  );
  const weekCount =
    dots.length > 0 ? Math.max(...dots.map((dot) => dot.week)) + 1 : 0;

  if (!data || dots.length === 0) {
    return (
      <section
        className="flex flex-col gap-3"
        aria-label="GitHub contributions"
      >
        <div className="bg-bg-elevated h-[52px] animate-pulse rounded" />
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-3" aria-label="GitHub contributions">
      <div
        className="[scrollbar-color:var(--color-border)_transparent] overflow-x-auto py-1"
        onMouseMove={(event) => {
          const graph = graphRef.current;

          if (!graph) {
            return;
          }
          const rect = graph.getBoundingClientRect();
          setPointer({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          });
        }}
        onMouseLeave={() => setPointer(null)}
      >
        <div
          ref={graphRef}
          className="relative grid w-max grid-rows-7 gap-[5px] py-1"
          style={{
            gridTemplateColumns: `repeat(${weekCount}, ${DOT_SIZE}px)`,
          }}
        >
          {dots.map((dot) => {
            const centerX = dot.week * STEP + DOT_SIZE / 2;
            const centerY = dot.day * STEP + DOT_SIZE / 2 + 4;
            const distance = pointer
              ? Math.hypot(pointer.x - centerX, pointer.y - centerY)
              : Number.POSITIVE_INFINITY;
            const pull = Math.max(0, 1 - distance / HOVER_RADIUS);
            const opacity = Math.min(
              1,
              (OPACITY_BY_LEVEL[dot.level] ?? OPACITY_BY_LEVEL[0]) +
                pull * 0.32,
            );

            return (
              <span
                key={dot.date}
                aria-hidden="true"
                className="bg-fg block rounded-full transition-opacity duration-300 ease-out"
                style={{
                  width: DOT_SIZE,
                  height: DOT_SIZE,
                  gridColumnStart: dot.week + 1,
                  gridRowStart: dot.day + 1,
                  opacity,
                }}
              />
            );
          })}
        </div>
      </div>

      <p className="text-fg-muted flex flex-wrap gap-x-2 gap-y-1 font-mono text-sm">
        <span>
          {formatContributionCount(data.total)} contributions in the last year
        </span>
        <span aria-hidden="true">·</span>
        <a
          className="text-accent hover:text-string transition-colors duration-200"
          href="https://github.com/jameblai"
          target="_blank"
          rel="noreferrer"
        >
          @jameblai
        </a>
      </p>
    </section>
  );
};
