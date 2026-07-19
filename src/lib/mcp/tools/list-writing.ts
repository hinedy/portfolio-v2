import { defineTool } from "@lovable.dev/mcp-js";
import { listPosts } from "@/lib/posts";

export default defineTool({
  name: "list_writing",
  title: "List blog posts",
  description:
    "List published blog posts (newest first) with slug, title, publishedAt, and summary. Use get_post for the full body.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const posts = listPosts();
    return {
      content: [{ type: "text", text: JSON.stringify(posts, null, 2) }],
      structuredContent: { posts },
    };
  },
});
