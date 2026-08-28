import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const PRODUCT_CATEGORIES = [
  "Living Room & Sofas",
  "Beds & Wardrobes",
  "Dining Sets",
  "Devghar (Mandir)",
  "Office & Study",
  "TV Units & Storage",
  "Full House Interiors",
  "Other",
] as const;

export const productSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    shortDescription: { type: "string" },
    description: { type: "string" },
    category: {
      type: "string",
      enum: [...PRODUCT_CATEGORIES],
    },
    material: { type: "string" },
    finish: { type: "string" },
    style: { type: "string" },
    suggestedPrice: { type: "integer" },
    confidence: { type: "number" },
  },
  required: [
    "name",
    "shortDescription",
    "description",
    "category",
    "material",
    "finish",
    "style",
    "suggestedPrice",
    "confidence",
  ],
};

export async function analyzeProductImage(
  base64: string,
  mimeType: string
) {
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_TEXT_MODEL || "gemini-2.5-flash-lite",

    contents: [
      {
        inlineData: {
          mimeType,
          data: base64,
        },
      },
      {
        text: `
You are a professional Indian furniture catalog manager for Parihar Furniture & Interior in Pune.

Inspect this furniture photo carefully.

Create accurate, premium but truthful catalog information.

Rules:
- Do not invent exact dimensions.
- Do not invent wood species unless visually obvious.
- Do not invent warranty information.
- Do not invent technical specifications.
- Choose exactly one category from the provided categories.
- Estimate a rough Indian market price in INR.
- The price is only an estimate, not a quotation.
- Write professional e-commerce descriptions.
- Return structured JSON only.

Focus on:
1. Furniture name
2. Short description
3. Detailed description
4. Category
5. Material
6. Finish
7. Style
8. Suggested price in INR
9. Confidence from 0 to 1
`,
      },
    ],

    config: {
      responseMimeType: "application/json",
      responseSchema: productSchema,
    },
  });

  return JSON.parse(response.text || "{}");
}