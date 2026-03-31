const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_IMAGE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent";

export interface GeneratedImage {
  base64: string;
  mimeType: string;
  prompt: string;
  filePath?: string;
}

// France travel category -> visual style mapping
const FRANCE_STYLE_MAP: Record<string, string> = {
  "city-guide":
    "elegant French cityscape, Haussmann buildings, cobblestone streets, cafe terraces, warm golden hour lighting, iconic architecture",
  food: "colorful French bistro scene, fresh patisseries, croissants, cheese boards, wine glasses, bustling market atmosphere",
  activities:
    "adventurous France activities, lavender fields, vineyard landscapes, alpine scenery, coastal views, sunny Mediterranean light",
  practical:
    "traveler in France, maps and metro stations, charming streets, helpful locals, authentic French details",
  budget:
    "budget traveler in France, affordable bistros, local markets, beautiful French scenery on a budget",
  seasonal:
    "French seasonal celebration, festive markets, holiday lights, traditional festivities, joyful atmosphere",
  regions:
    "diverse French landscapes, rolling vineyards, coastal cliffs, mountain villages, medieval towns, rural beauty",
  default:
    "beautiful France landscape, Parisian elegance, countryside charm, Mediterranean coast, rich culture",
};

// Core Gemini image generation function
export async function generateImage(prompt: string): Promise<GeneratedImage> {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const response = await fetch(`${GEMINI_IMAGE_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseModalities: ["IMAGE"],
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini image API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  const parts = data.candidates?.[0]?.content?.parts;

  if (!parts) {
    throw new Error("No content in Gemini response");
  }

  const imagePart = parts.find(
    (p: {
      inline_data?: { mime_type: string; data: string };
      inlineData?: { mimeType: string; data: string };
    }) => p.inline_data || p.inlineData
  );

  if (imagePart?.inlineData) {
    return {
      base64: imagePart.inlineData.data,
      mimeType: imagePart.inlineData.mimeType || "image/png",
      prompt,
    };
  }
  if (imagePart?.inline_data) {
    return {
      base64: imagePart.inline_data.data,
      mimeType: imagePart.inline_data.mime_type || "image/png",
      prompt,
    };
  }

  throw new Error("No image generated in Gemini response");
}

// Generate a France travel blog featured image (16:9 landscape)
export async function generateBlogImage(
  title: string,
  category: string,
  slug: string
): Promise<GeneratedImage & { publicPath: string }> {
  const style =
    FRANCE_STYLE_MAP[category] || FRANCE_STYLE_MAP["default"];

  const prompt = `Create a professional, photorealistic travel photography blog header image for an article titled "${title}".
Visual style: ${style}.
Composition: Wide landscape format (16:9 aspect ratio), high resolution, magazine quality.
Must be evocative of France travel -- Parisian architecture, Provencal countryside, coastal Riviera, Alpine villages, or French markets depending on context.
Lighting: Natural, golden hour, or bright Mediterranean daylight.
CRITICAL RULE: The image must contain ZERO text, ZERO letters, ZERO numbers, ZERO words, ZERO labels, ZERO watermarks. Only use photographic visual elements.`;

  const image = await generateImage(prompt);

  const publicPath = `/images/blog/${slug}.webp`;

  console.log(`[image-generator] Image generated for: ${slug}`);

  return {
    ...image,
    publicPath,
  };
}

// Convert base64 image to a data URL
export function toDataUrl(image: GeneratedImage): string {
  return `data:${image.mimeType};base64,${image.base64}`;
}
