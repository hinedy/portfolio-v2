import { defineTool } from "@lovable.dev/mcp-js";
import { CONTENT } from "@/lib/content";

export default defineTool({
  name: "list_case_studies",
  title: "List case studies",
  description:
    "List the Evidence case studies (MedX, Revixir, SupplyTech) with title, category, URL, ownership, decision surface, and thesis. Use get_case_study for the full six-part body.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = CONTENT.evidence.caseStudies.map((c) => ({
      title: c.title,
      category: c.category,
      url: c.url,
      owned: c.owned,
      decisionSurface: c.decisionSurface,
      thesis: c.thesis,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { caseStudies: items },
    };
  },
});
