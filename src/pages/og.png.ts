import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";
import satori, { type SatoriOptions } from "satori";

import { ibmPlexSansRegular, lilexBold, lilexRegular } from "@/lib/og-fonts";
import { site } from "@/lib/site";

const WIDTH = 1200;
const HEIGHT = 630;

const colors = {
  base: "#151726",
  interface: "#1c1e2d",
  overlay: "#232534",
  subtle: "#8d8f9e",
  text: "#dee0ef",
  salmon: "#f8d2c9",
  mint: "#9ccfd8",
} as const;

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
  const description = getParam(
    url,
    "description",
    "Computer Science @ University of Auckland · Full-stack developer",
    140,
  );

  const image = {
    type: "div",
    props: {
      style: {
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: colors.base,
        color: colors.text,
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
              gap: "30px",
              flex: 1,
              border: `2px dashed ${colors.subtle}`,
              backgroundColor: colors.interface,
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
                    color: colors.subtle,
                    fontFamily: "Lilex",
                    fontSize: "28px",
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
                    gap: "22px",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          color: colors.mint,
                          fontFamily: "Lilex",
                          fontSize: "76px",
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
                                height: "58px",
                                backgroundColor: colors.text,
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
                          color: colors.subtle,
                          fontSize: "36px",
                          lineHeight: 1.35,
                          maxWidth: "900px",
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
                        border: `2px dashed ${colors.salmon}`,
                        color: colors.salmon,
                        fontFamily: "Lilex",
                        fontSize: "24px",
                        padding: "8px 14px",
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
              color: colors.subtle,
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
                    color: colors.mint,
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
