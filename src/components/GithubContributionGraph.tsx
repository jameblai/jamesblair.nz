import { useMemo, useState } from "react";

import type { GithubContributionDay } from "@/lib/github-contributions";

interface ContributionDot extends GithubContributionDay {
  key: string;
  week: number;
  day: number;
  visible: boolean;
}

interface PointerPosition {
  x: number;
  y: number;
}

interface GithubContributionGraphProps {
  days: GithubContributionDay[];
  total: number;
}

const DOT_SIZE = 7;
const DOT_GAP = 5;
const STEP = DOT_SIZE + DOT_GAP;
const HOVER_RADIUS = 44;
const OPACITY_BY_LEVEL = [0.12, 0.32, 0.5, 0.68, 0.88];

const formatContributionCount = (count: number) =>
  new Intl.NumberFormat("en-NZ").format(count);

const getUtcDay = (date: string) =>
  new Date(`${date}T00:00:00.000Z`).getUTCDay();

const chunkContributionDays = (
  days: GithubContributionDay[],
): ContributionDot[] => {
  if (days.length === 0) {
    return [];
  }

  const firstDayOffset = getUtcDay(days[0]?.date ?? "");
  const paddedDays: ContributionDot[] = [];

  for (let index = 0; index < firstDayOffset; index += 1) {
    paddedDays.push({
      key: `empty-start-${index}`,
      date: "",
      count: 0,
      level: 0,
      week: 0,
      day: index,
      visible: false,
    });
  }

  days.forEach((day, index) => {
    const paddedIndex = index + firstDayOffset;

    paddedDays.push({
      ...day,
      key: day.date,
      week: Math.floor(paddedIndex / 7),
      day: paddedIndex % 7,
      visible: true,
    });
  });

  const trailingDays = (7 - (paddedDays.length % 7)) % 7;

  for (let index = 0; index < trailingDays; index += 1) {
    const paddedIndex = paddedDays.length;

    paddedDays.push({
      key: `empty-end-${index}`,
      date: "",
      count: 0,
      level: 0,
      week: Math.floor(paddedIndex / 7),
      day: paddedIndex % 7,
      visible: false,
    });
  }

  return paddedDays;
};

export const GithubContributionGraph = ({
  days,
  total,
}: GithubContributionGraphProps) => {
  const [pointer, setPointer] = useState<PointerPosition | null>(null);
  const dots = useMemo(() => chunkContributionDays(days), [days]);
  const weekCount =
    dots.length > 0 ? Math.max(...dots.map((dot) => dot.week)) + 1 : 0;

  return (
    <section className="flex flex-col gap-3" aria-label="GitHub contributions">
      <div
        className="border-border bg-bg-elevated/40 [scrollbar-color:var(--color-border)_transparent] overflow-x-auto border p-4"
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          setPointer({
            x: event.clientX - rect.left + event.currentTarget.scrollLeft,
            y: event.clientY - rect.top,
          });
        }}
        onMouseLeave={() => setPointer(null)}
      >
        <div
          className="relative grid w-max grid-flow-col grid-rows-7 gap-[5px] py-1"
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
            const scale = 1 + pull * 1.65;
            const yOffset = -pull * 5;

            return (
              <span
                key={dot.key}
                aria-hidden="true"
                className="bg-fg block rounded-full transition-[opacity,transform,box-shadow] duration-300 ease-out"
                style={{
                  width: DOT_SIZE,
                  height: DOT_SIZE,
                  opacity: dot.visible ? opacity : 0,
                  transform: `translateY(${yOffset}px) scale(${scale})`,
                  boxShadow:
                    dot.visible && pull > 0
                      ? `0 0 ${Math.round(18 * pull)}px rgba(255, 255, 255, ${0.2 * pull})`
                      : "none",
                }}
              />
            );
          })}
        </div>
      </div>

      <p className="text-fg-muted flex flex-wrap gap-x-2 gap-y-1 font-mono text-sm">
        <span>
          {formatContributionCount(total)} contributions in the last year
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
