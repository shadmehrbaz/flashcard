
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateFlashcards(text: string): Promise<{ question: string, answer: string }[]> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Extract flashcards (Question and Answer pairs) from the following text: \n\n${text}`,
    config: {
      systemInstruction: "You are an expert educator. Extract key concepts and create clear, concise question-and-answer pairs for flashcards. Return strictly JSON data.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: {
              type: Type.STRING,
              description: "The study question",
            },
            answer: {
              type: Type.STRING,
              description: "The concise answer",
            },
          },
          required: ["question", "answer"],
        },
      },
    },
  });

  try {
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    return [];
  }
}
