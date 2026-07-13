// Shiki-based syntax highlighter with a custom spec-sheet theme.
// Monochrome tokens on the site's paper background, with signal-orange
// reserved for strings — no IDE-style palette, no code-block chrome.
import { createHighlighter, type Highlighter, type ThemeRegistration } from "shiki";

// Colors are resolved sRGB approximations of the OKLCH tokens in styles.css.
// Shiki requires literal hex; the surrounding <pre> uses CSS variables, so
// only token foregrounds need to be baked in here.
const INK_LIGHT = "#26221d";
const MUTED_LIGHT = "#7a736a";
const ACCENT_LIGHT = "#c96421";
const PAPER_LIGHT = "#f2ede2";

const INK_DARK = "#f2ede2";
const MUTED_DARK = "#a8a196";
const ACCENT_DARK = "#e88a4a";
const PAPER_DARK = "#2a2621";

function buildTheme(
  name: string,
  ink: string,
  muted: string,
  accent: string,
  paper: string,
): ThemeRegistration {
  return {
    name,
    type: name.endsWith("dark") ? "dark" : "light",
    colors: { "editor.background": paper, "editor.foreground": ink },
    tokenColors: [
      { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: muted, fontStyle: "italic" } },
      { scope: ["string", "string.quoted", "punctuation.definition.string"], settings: { foreground: accent } },
      { scope: ["constant.numeric", "constant.language", "constant.character"], settings: { foreground: ink } },
      { scope: ["keyword", "storage", "storage.type", "keyword.control"], settings: { foreground: ink, fontStyle: "bold" } },
      { scope: ["entity.name.function", "support.function", "meta.function-call"], settings: { foreground: ink } },
      { scope: ["entity.name.type", "support.type", "support.class"], settings: { foreground: ink } },
      { scope: ["variable", "variable.other", "meta.definition.variable"], settings: { foreground: ink } },
      { scope: ["punctuation", "meta.brace", "meta.delimiter"], settings: { foreground: muted } },
      { scope: ["entity.name.tag", "punctuation.definition.tag"], settings: { foreground: ink, fontStyle: "bold" } },
      { scope: ["entity.other.attribute-name"], settings: { foreground: muted } },
    ],
  };
}

const themeLight = buildTheme("spec-light", INK_LIGHT, MUTED_LIGHT, ACCENT_LIGHT, PAPER_LIGHT);
const themeDark = buildTheme("spec-dark", INK_DARK, MUTED_DARK, ACCENT_DARK, PAPER_DARK);

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [themeLight, themeDark],
      langs: ["javascript", "typescript", "tsx", "jsx", "bash", "json", "css", "html"],
    });
  }
  return highlighterPromise;
}

/** Warm the highlighter so route loaders can call `highlightCode` synchronously via `await`. */
export async function ensureHighlighter(): Promise<void> {
  await getHighlighter();
}

export async function highlightCode(code: string, lang: string | undefined): Promise<string> {
  const hl = await getHighlighter();
  const language = lang && hl.getLoadedLanguages().includes(lang as never) ? lang : "text";
  return hl.codeToHtml(code, {
    lang: language,
    themes: { light: "spec-light", dark: "spec-dark" },
    defaultColor: "light",
  });
}
