import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getPost, listPosts } from "@/lib/posts";

export default defineTool({
  name: "get_post",
  title: "Get blog post",
  description: "Return one blog post in full: frontmatter and raw MDX body.",
  inputSchema: {
    slug: z.string().describe("Post slug, e.g. 'best-practices', 'bundle', 'cookies'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const post = getPost(slug.trim());
    if (!post) {
      const known = listPosts()
        .map((p) => p.slug)
        .join(", ");
      return {
        content: [{ type: "text", text: `No post with slug "${slug}". Known: ${known}.` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(post, null, 2) }],
      structuredContent: { post },
    };
  },
});
