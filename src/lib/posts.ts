// Blog post loader — reads .mdx files from content/posts/ verbatim.
// Frontmatter (title, publishedAt, summary) is parsed from the YAML block;
// the body is the raw markdown following it. Rendering is done at the route.

const modules = import.meta.glob("/content/posts/*.mdx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export interface PostMeta {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
}

export interface Post extends PostMeta {
  body: string;
}

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = /^([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(.*)$/.exec(line);
    if (!m) continue;
    let value = m[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[m[1]] = value;
  }
  return { data, body: match[2] };
}

const POSTS: Post[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split("/").pop()!.replace(/\.mdx$/, "");
    const { data, body } = parseFrontmatter(raw);
    return {
      slug,
      title: data.title ?? slug,
      publishedAt: data.publishedAt ?? "",
      summary: data.summary ?? "",
      body,
    };
  })
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export function listPosts(): PostMeta[] {
  return POSTS.map(({ slug, title, publishedAt, summary }) => ({
    slug,
    title,
    publishedAt,
    summary,
  }));
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/**
 * Cross-check parsed frontmatter against CONTENT.writing.posts.
 * Returns a list of human-readable mismatch messages; empty when everything matches.
 */
export function diffAgainstContentPosts(
  contentPosts: ReadonlyArray<{ slug: string; title: string; publishedAt: string; summary: string }>,
): string[] {
  const issues: string[] = [];
  const bySlug = new Map(POSTS.map((p) => [p.slug, p]));
  for (const cp of contentPosts) {
    const fp = bySlug.get(cp.slug);
    if (!fp) {
      issues.push(`content.ts lists slug "${cp.slug}" but no matching .mdx was found.`);
      continue;
    }
    if (fp.title !== cp.title) issues.push(`title mismatch for ${cp.slug}: mdx="${fp.title}" vs content.ts="${cp.title}"`);
    if (fp.publishedAt !== cp.publishedAt)
      issues.push(`publishedAt mismatch for ${cp.slug}: mdx="${fp.publishedAt}" vs content.ts="${cp.publishedAt}"`);
    if (fp.summary !== cp.summary)
      issues.push(`summary mismatch for ${cp.slug}: mdx="${fp.summary}" vs content.ts="${cp.summary}"`);
  }
  const contentSlugs = new Set(contentPosts.map((p) => p.slug));
  for (const p of POSTS) {
    if (!contentSlugs.has(p.slug)) issues.push(`.mdx "${p.slug}" has no entry in content.ts writing.posts.`);
  }
  return issues;
}
