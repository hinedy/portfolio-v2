import { readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const ROOT = dirname(fileURLToPath(import.meta.url));
const SITE = "https://hinedy.vercel.app";
const POSTS_DIR = join(ROOT, "..", "content", "posts");
const OUT = join(ROOT, "..", "public", "sitemap.xml");

function frontmatterField(raw, key) {
  const re = new RegExp(`^${key}\\s*:\\s*(.+)$`, "m");
  const m = re.exec(raw);
  if (!m) return null;
  let v = m[1].trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))
    v = v.slice(1, -1);
  return v;
}

try {
  const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  const urls = [
    { loc: "/", priority: "1.0", changefreq: "monthly" },
    { loc: "/blog", priority: "0.9", changefreq: "weekly" },
  ];

  for (const f of files) {
    const slug = f.replace(/\.mdx$/, "");
    const raw = readFileSync(join(POSTS_DIR, f), "utf-8");
    const publishedAt = frontmatterField(raw, "publishedAt");
    const stats = statSync(join(POSTS_DIR, f));
    urls.push({
      loc: `/blog/${slug}`,
      priority: "0.8",
      changefreq: "monthly",
      lastmod: publishedAt || stats.mtime.toISOString().split("T")[0],
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE}${u.loc}</loc>
    <priority>${u.priority}</priority>
    <changefreq>${u.changefreq}</changefreq>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}
  </url>`,
  )
  .join("\n")}
</urlset>`;

  writeFileSync(OUT, xml, "utf-8");
  console.log(`sitemap: ${urls.length} URLs written to ${OUT}`);
} catch (e) {
  console.error("sitemap generation failed:", e.message);
  process.exit(1);
}
