import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";
import satori, { type SatoriOptions } from "satori";

import { ibmPlexSansBold, ibmPlexSansRegular } from "@/lib/og-fonts";
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
    name: "IBM Plex Sans",
    data: ibmPlexSansBold,
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
        padding: "72px",
        fontFamily: "IBM Plex Sans",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "34px",
              flex: 1,
              border: `2px dashed ${colors.salmon}`,
              borderRadius: "28px",
              backgroundColor: colors.interface,
              padding: "56px",
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.22)",
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
                    fontSize: "30px",
                    letterSpacing: "0.02em",
                  },
                  children: [
                    "jamesblair.nz",
                    {
                      type: "div",
                      props: {
                        style: {
                          width: "18px",
                          height: "34px",
                          backgroundColor: colors.text,
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
                          gap: "22px",
                          fontSize: "92px",
                          fontWeight: 700,
                          lineHeight: 1,
                          letterSpacing: "-0.045em",
                        },
                        children: [
                          title,
                          {
                            type: "span",
                            props: {
                              style: {
                                width: "38px",
                                height: "72px",
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
                          fontSize: "38px",
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
                        borderRadius: "999px",
                        color: colors.salmon,
                        fontSize: "24px",
                        padding: "10px 18px",
                        backgroundColor: colors.overlay,
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
              fontSize: "26px",
              paddingTop: "28px",
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
