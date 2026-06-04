import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";
import satori, { type SatoriOptions } from "satori";

import { ibmPlexSansRegular, lilexBold, lilexRegular } from "@/lib/og-fonts";
import { site } from "@/lib/site";
import globalCss from "@/styles/global.css?raw";

const WIDTH = 1200;
const HEIGHT = 630;

const colorTokenNames = [
  "bg",
  "bg-hover",
  "fg",
  "fg-muted",
  "accent",
  "string",
] as const;

type ColorTokenName = (typeof colorTokenNames)[number];

type ColorTokens = Record<ColorTokenName, string>;

const parseColorTokens = (css: string): ColorTokens => {
  const tokens = Object.fromEntries(
    colorTokenNames.map((name) => {
      const match = css.match(
        new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{3,8})\\s*;`),
      );

      if (!match) {
        throw new Error(`Missing --color-${name} token in global.css`);
      }

      return [name, match[1]];
    }),
  );

  return tokens as ColorTokens;
};

const colors = parseColorTokens(globalCss);

const fonts: SatoriOptions["fonts"] = [
  {
    name: "IBM Plex Sans",
    data: ibmPlexSansRegular,
    weight: 400,
    style: "normal",
  },
  {
    name: "Lilex",
    data: lilexRegular,
    weight: 400,
    style: "normal",
  },
  {
    name: "Lilex",
    data: lilexBold,
    weight: 700,
    style: "normal",
  },
];

const clamp = (value: string, maxLength: number) => {
  const trimmed = value.trim();

  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  return `${trimmed.slice(0, maxLength - 1)}…`;
};

const getParam = (
  url: URL,
  name: string,
  fallback: string,
  maxLength: number,
) => clamp(url.searchParams.get(name) ?? fallback, maxLength);

type SatoriNode = Parameters<typeof satori>[0];

export const GET: APIRoute = async ({ url }) => {
  const title = getParam(url, "title", site.name, 80);
  const description = getParam(url, "description", "Full-stack developer", 80);

  const image = {
    type: "div",
    props: {
      style: {
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: colors.bg,
        color: colors.fg,
        padding: "64px",
        fontFamily: "IBM Plex Sans",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              flex: 1,
              border: `1px dashed ${colors["bg-hover"]}`,
              padding: "48px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: colors.accent,
                    fontFamily: "Lilex",
                    fontSize: "30px",
                    letterSpacing: "0.02em",
                  },
                  children: "jamesblair.nz",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          color: colors.accent,
                          fontFamily: "Lilex",
                          fontSize: "72px",
                          fontWeight: 700,
                          lineHeight: 1,
                        },
                        children: [
                          title,
                          {
                            type: "span",
                            props: {
                              style: {
                                width: "32px",
                                height: "56px",
                                backgroundColor: colors.fg,
                                display: "flex",
                              },
                            },
                          },
                        ],
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          color: colors["fg-muted"],
                          fontSize: "36px",
                          lineHeight: 1.625,
                          maxWidth: "896px",
                        },
                        children: description,
                      },
                    },
                  ],
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    gap: "16px",
                    flexWrap: "wrap",
                    marginTop: "auto",
                  },
                  children: [
                    "TypeScript",
                    "Astro",
                    "React",
                    "Tailwind",
                    "Kotlin",
                    "Python",
                  ].map((item) => ({
                    type: "div",
                    props: {
                      style: {
                        border: `1px dashed ${colors.string}`,
                        color: colors.string,
                        fontFamily: "Lilex",
                        fontSize: "24px",
                        padding: "8px 16px",
                      },
                      children: item,
                    },
                  })),
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: colors["fg-muted"],
              fontFamily: "Lilex",
              fontSize: "24px",
              paddingTop: "24px",
            },
            children: [
              "Computer Science · University of Auckland",
              {
                type: "div",
                props: {
                  style: {
                    color: colors.accent,
                  },
                  children: site.url.replace("https://", ""),
                },
              },
            ],
          },
        },
      ],
    },
  } as SatoriNode;

  const svg = await satori(image, {
    width: WIDTH,
    height: HEIGHT,
    fonts,
  });
  const png = new Resvg(svg).render().asPng();

  return new Response(new Uint8Array(png), {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "image/png",
    },
  });
};
