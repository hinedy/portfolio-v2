import { defineTool } from "@lovable.dev/mcp-js";
import { CONTENT } from "@/lib/content";

export default defineTool({
  name: "list_decisions",
  title: "List decisions (How I Decide)",
  description:
    "Return the 'How I Decide' epigraph and every principle row: category, statement, explanation, optional note, evidence references (case study titles), and weight (0-5).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(
          { epigraph: CONTENT.decisions.epigraph, items: CONTENT.decisions.items },
          null,
          2,
        ),
      },
    ],
    structuredContent: {
      epigraph: CONTENT.decisions.epigraph,
      items: CONTENT.decisions.items,
    },
  }),
});
