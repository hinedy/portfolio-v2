import { createFileRoute } from "@tanstack/react-router";
import { ImageResponse } from "@vercel/og";
import { OgCard } from "@/components/og-card";

const FONT_PATHS = ["/fonts/BigShouldersDisplay-Black.ttf", "/fonts/SpaceMono-Regular.ttf"];

const makeFontUrl = (path: string, reqUrl: string) => new URL(path, reqUrl).href;

export const Route = createFileRoute("/api/og")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { searchParams } = new URL(request.url);
        const title = searchParams.get("title") || undefined;

        const [bigShoulders, spaceMono] = await Promise.all(
          FONT_PATHS.map((p) => fetch(makeFontUrl(p, request.url)).then((r) => r.arrayBuffer())),
        );

        return new ImageResponse(<OgCard title={title} />, {
          width: 1200,
          height: 630,
          fonts: [
            {
              name: "Big Shoulders Display",
              data: bigShoulders,
              weight: 900,
              style: "normal",
            },
            {
              name: "Space Mono",
              data: spaceMono,
              weight: 400,
              style: "normal",
            },
          ],
        });
      },
    },
  },
});
