import { createFileRoute, Link } from "@tanstack/react-router";
import { CONTENT } from "@/lib/content";
import { BlogShell } from "@/components/BlogShell";
import { listPosts, diffAgainstContentPosts, type PostMeta } from "@/lib/posts";

export const Route = createFileRoute("/blog/")({
  loader: () => {
    const posts = listPosts();
    const mismatches = diffAgainstContentPosts(CONTENT.writing.posts);
    if (mismatches.length > 0) {
      // Surface in server + browser logs so drift is visible immediately.
      // Both sources are preserved as-is — no silent overwrite.
      console.warn("[blog] frontmatter / content.ts mismatch:\n" + mismatches.join("\n"));
    }
    return { posts, mismatches };
  },
  head: () => ({
    meta: [
      { title: "Writing — Ahmed Hinedy" },
      {
        name: "description",
        content:
          "Essays on frontend architecture, tradeoffs, and the decisions behind the interfaces — by Ahmed Hinedy.",
      },
      { property: "og:title", content: "Writing — Ahmed Hinedy" },
      {
        property: "og:description",
        content: "Essays on frontend architecture, tradeoffs, and the decisions behind the interfaces.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://hinedy.vercel.app/blog" },
    ],
  }),
  component: BlogIndex,
});

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

function BlogIndex() {
  const { posts, mismatches } = Route.useLoaderData();

  return (
    <BlogShell>
      <section className="mx-auto max-w-[1440px] px-6 md:px-10">
        <header className="grid grid-cols-12 gap-x-6 pt-12 pb-14 md:pt-16 md:pb-20">
          <div className="col-span-12 md:col-span-3 mb-6 md:mb-0">
            <div className="section-label">{CONTENT.writing.sectionLabel}</div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95] text-ink">
              Can you articulate your reasoning?
            </h1>
            <p className="mt-8 max-w-xl text-lg text-ink/85">
              Essays on frontend architecture, tradeoffs, and the decisions behind the interfaces.
            </p>
          </div>
        </header>

        {mismatches.length > 0 ? (
          <div className="border border-accent bg-paper p-6 mb-12 font-mono text-xs text-ink space-y-2">
            <div className="uppercase tracking-widest text-accent">// frontmatter ⇔ content.ts mismatch</div>
            {mismatches.map((m: string) => (
              <div key={m}>{m}</div>
            ))}
          </div>
        ) : null}

        <ol className="border-t border-rule">
          {posts.map((post: PostMeta, i: number) => (
            <li key={post.slug} className="border-b border-rule">
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="grid grid-cols-12 gap-x-6 py-8 md:py-10 group items-baseline"
              >
                <div className="col-span-12 md:col-span-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3 md:mb-0">
                  <span className="text-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mx-2">·</span>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </div>
                <div className="col-span-12 md:col-span-9">
                  <h2 className="font-display text-3xl md:text-5xl leading-[1.02] text-ink group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-base md:text-lg text-ink/80 max-w-2xl">{post.summary}</p>
                  <div className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground group-hover:text-accent transition-colors">
                    read →
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>

        <div className="py-16">
          <Link to="/" className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors">
            ← back to index
          </Link>
        </div>
      </section>
    </BlogShell>
  );
}
