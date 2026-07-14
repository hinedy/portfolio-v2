import { createFileRoute } from "@tanstack/react-router";
import { ImageResponse } from "@vercel/og";
import { OgCard } from "@/components/og-card";

const BIG_SHOULDERS_URL =
  "https://fonts.gstatic.com/s/bigshouldersdisplay/v24/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdSY8JF4.ttf";
const SPACE_MONO_URL =
  "https://fonts.gstatic.com/s/spacemono/v17/i7dPIFZifjKcF5UAWdDRUEY.ttf";

const fontsPromise = Promise.all([
  fetch(BIG_SHOULDERS_URL).then((r) => r.arrayBuffer()),
  fetch(SPACE_MONO_URL).then((r) => r.arrayBuffer()),
]).then(([bigShoulders, spaceMono]) => ({ bigShoulders, spaceMono }));

export const Route = createFileRoute("/api/og")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { searchParams } = new URL(request.url);
        const title = searchParams.get("title") || undefined;
        const { bigShoulders, spaceMono } = await fontsPromise;

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
