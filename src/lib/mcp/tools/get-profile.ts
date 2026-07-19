import { defineTool } from "@lovable.dev/mcp-js";
import { CONTENT } from "@/lib/content";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description:
    "Return Ahmed Hinedy's identity, role, location, portfolio URL, and the Position section (framing question and 4-line answer to 'How do you think?').",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify({ meta: CONTENT.meta, position: CONTENT.position }, null, 2),
      },
    ],
    structuredContent: { meta: CONTENT.meta, position: CONTENT.position },
  }),
});
