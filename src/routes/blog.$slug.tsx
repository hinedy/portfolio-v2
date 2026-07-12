import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { marked } from "marked";
import { BlogShell } from "@/components/BlogShell";
import { getPost } from "@/lib/posts";

marked.setOptions({ gfm: true, breaks: false });

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    const html = marked.parse(post.body, { async: false }) as string;
    return { post, html };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — Ahmed Hinedy` },
        { name: "description", content: post.summary },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.summary },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: post.publishedAt },
      ],
    };
  },
  notFoundComponent: () => (
    <BlogShell>
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 py-24">
        <div className="section-label mb-6">404 / Not found</div>
        <h1 className="font-display text-[clamp(3rem,8vw,7rem)] text-ink">No post at that slug.</h1>
        <div className="mt-8">
          <Link to="/blog" className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-accent">
            ← all writing
          </Link>
        </div>
      </div>
    </BlogShell>
  ),
  errorComponent: ({ error }) => (
    <BlogShell>
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 py-24">
        <div className="section-label mb-6">Error</div>
        <h1 className="font-display text-4xl text-ink">This post didn't render.</h1>
        <p className="mt-4 font-mono text-xs text-muted-foreground">{error.message}</p>
      </div>
    </BlogShell>
  ),
  component: BlogPost,
});

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

function BlogPost() {
  const { post, html } = Route.useLoaderData();
  return (
    <BlogShell>
      <article className="mx-auto max-w-[1440px] px-6 md:px-10">
        <header className="grid grid-cols-12 gap-x-6 pt-12 pb-14 md:pt-16 md:pb-20 border-b border-rule">
          <div className="col-span-12 md:col-span-3 mb-6 md:mb-0 space-y-3">
            <div className="section-label">Essay</div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.98] text-ink">
              {post.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-ink/85">{post.summary}</p>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-x-6 py-16 md:py-20">
          <div className="hidden md:block col-span-3" aria-hidden="true" />
          <div
            className="col-span-12 md:col-span-8 prose-post font-sans text-ink"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>

        <div className="border-t border-rule py-10">
          <Link to="/blog" className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors">
            ← all writing
          </Link>
        </div>
      </article>
    </BlogShell>
  );
}
