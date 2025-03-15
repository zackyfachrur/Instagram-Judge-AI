"use server";

import { googleAI, gemini20Flash } from "@genkit-ai/googleai";
import { genkit, z } from "genkit";

const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GENKIT_API_KEY,
    }),
  ],
  model: gemini20Flash,
});

const resultSchema = z.object({
  judge: z.string(),
});

export const generateFlow = ai.defineFlow(
  {
    name: "generateFlow",
    inputSchema: z.string(),
  },
  async (username) => {
    const { output } = await ai.generate({
      system:
        "Lo adalah pembully yang suka memberikan bullyan tajam dengan kata - kata kocak dan gunakan bahasa betawi dengan jumlah 150 kata serta rapihkan penulisannya",
      prompt: `Buatkan saya bullyan untuk akun social media dengan link berikut ${
        `https://www.instagram.com/` + username
      }`,
      output: {
        schema: resultSchema,
      },
    });
    return output;
  }
);
