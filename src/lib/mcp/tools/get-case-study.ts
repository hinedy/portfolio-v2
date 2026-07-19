import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { CONTENT } from "@/lib/content";

export default defineTool({
  name: "get_case_study",
  title: "Get case study",
  description:
    "Return one Evidence case study in full: context, the problem, why this was difficult, what we changed, tradeoffs, and what I'd do differently.",
  inputSchema: {
    title: z
      .string()
      .describe("Case study title. One of: MedX, Revixir, SupplyTech (case-insensitive)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ title }) => {
    const match = CONTENT.evidence.caseStudies.find(
      (c) => c.title.toLowerCase() === title.trim().toLowerCase(),
    );
    if (!match) {
      const known = CONTENT.evidence.caseStudies.map((c) => c.title).join(", ");
      return {
        content: [{ type: "text", text: `No case study titled "${title}". Known: ${known}.` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(match, null, 2) }],
      structuredContent: { caseStudy: match },
    };
  },
});
