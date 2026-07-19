import { defineTool } from "@lovable.dev/mcp-js";
import { CONTENT } from "@/lib/content";

export default defineTool({
  name: "list_lab",
  title: "List lab work",
  description:
    "Return the Lab section — current explorations and side projects with title, description, links (GitHub, npm, demo, showcase), and status.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(CONTENT.lab.items, null, 2) }],
    structuredContent: { items: CONTENT.lab.items },
  }),
});
