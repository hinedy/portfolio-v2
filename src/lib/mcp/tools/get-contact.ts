import { defineTool } from "@lovable.dev/mcp-js";
import { CONTENT } from "@/lib/content";

export default defineTool({
  name: "get_contact",
  title: "Get contact info",
  description: "Return Ahmed's public contact info: email, phone, and social links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(CONTENT.contact, null, 2) }],
    structuredContent: { contact: CONTENT.contact },
  }),
});
