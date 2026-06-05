export interface GithubContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface GithubContributionCalendar {
  total: number;
  days: GithubContributionDay[];
}

interface GithubContributionsApiResponse {
  total?: {
    lastYear?: number;
  };
  contributions?: GithubContributionDay[];
}

const GITHUB_CONTRIBUTIONS_URL =
  "https://github-contributions-api.jogruber.de/v4/jameblai?y=last";

const isContributionDay = (value: unknown): value is GithubContributionDay => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const day = value as Record<string, unknown>;

  return (
    typeof day.date === "string" &&
    typeof day.count === "number" &&
    typeof day.level === "number"
  );
};

export const getGithubContributions =
  async (): Promise<GithubContributionCalendar> => {
    try {
      const response = await fetch(GITHUB_CONTRIBUTIONS_URL);

      if (!response.ok) {
        throw new Error(`GitHub contributions API returned ${response.status}`);
      }

      const data = (await response.json()) as GithubContributionsApiResponse;
      const days = data.contributions?.filter(isContributionDay) ?? [];

      return {
        total:
          typeof data.total?.lastYear === "number"
            ? data.total.lastYear
            : days.reduce((sum, day) => sum + day.count, 0),
        days,
      };
    } catch (error) {
      console.warn("Unable to fetch GitHub contributions", error);

      return {
        total: 0,
        days: [],
      };
    }
  };
