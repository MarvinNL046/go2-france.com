import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import {
  translatePost,
  type TranslationLocale,
  type GeneratedPost,
} from "../../../lib/pipeline/content-generator";
import { commitFilesToGitHub } from "../../../lib/pipeline/github-commit";

export const config = {
  maxDuration: 300,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || req.headers.authorization !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const enDir = path.join(process.cwd(), "content", "blog", "en");
    if (!fs.existsSync(enDir)) {
      return res.status(200).json({ message: "No English blog posts found" });
    }

    const allLocales: TranslationLocale[] = ["fr"];
    const enFiles = fs.readdirSync(enDir).filter((f) => f.endsWith(".md"));

    const sorted = enFiles
      .map((f) => {
        const content = fs.readFileSync(path.join(enDir, f), "utf-8");
        const dateMatch = content.match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})["']?\s*$/m);
        const date = dateMatch?.[1] || "1970-01-01";
        return { name: f, date };
      })
      .sort((a, b) => b.date.localeCompare(a.date));

    let translated = false;

    for (const file of sorted.slice(0, 3)) {
      const slug = file.name.replace(".md", "");

      const missingLocales = allLocales.filter((locale) => {
        const localePath = path.join(process.cwd(), "content", "blog", locale, `${slug}.md`);
        return !fs.existsSync(localePath);
      });

      if (missingLocales.length === 0) continue;

      const enContent = fs.readFileSync(path.join(enDir, file.name), "utf-8");

      const titleMatch = enContent.match(/^title:\s*["']?(.+?)["']?\s*$/m);
      const title = titleMatch?.[1] || slug;

      const localesToTranslate = missingLocales.slice(0, 1);

      console.log(`[cron/translate] Translating "${title}" to: ${localesToTranslate.join(", ")}`);

      const post: GeneratedPost = {
        title,
        slug,
        date: new Date().toISOString().split("T")[0],
        author: { name: "Go2France Team" },
        category: "city-guide",
        tags: [],
        image: `/images/blog/${slug}.webp`,
        description: "",
        featured: false,
        readingTime: 8,
        lastUpdated: new Date().toISOString().split("T")[0],
        sources: [],
        content: enContent,
      };

      const filesToCommit: Array<{ path: string; content: string; encoding?: "utf-8" | "base64" }> = [];
      const savedLocales: string[] = [];

      for (const locale of localesToTranslate) {
        try {
          console.log(`[cron/translate] Translating to ${locale}...`);
          const result = await translatePost(post, locale, "claude-haiku");

          filesToCommit.push({
            path: `content/blog/${locale}/${slug}.md`,
            content: result.content,
            encoding: "utf-8",
          });
          savedLocales.push(locale);
        } catch (err) {
          console.error(`[cron/translate] ${locale} failed:`, err);
        }
      }

      if (filesToCommit.length > 0) {
        const commitResult = await commitFilesToGitHub(
          filesToCommit,
          `Add translations for: ${title}\n\nLocales: ${savedLocales.join(", ")}`
        );
        console.log(`[cron/translate] Committed ${savedLocales.length} translations: ${commitResult.sha}`);
        translated = true;
        break;
      }
    }

    if (!translated) {
      return res.status(200).json({ message: "All recent posts are fully translated" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("[cron/translate] Error:", error);
    return res.status(500).json({
      error: "Translation cron failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
