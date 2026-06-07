
import { GoogleGenAI, Type } from "@google/genai";
import { ChatbotPersonality, QuizQuestion } from "../types";

let aiInstance: GoogleGenAI | null = null;

export const getGeminiClient = (): GoogleGenAI => {
  if (!aiInstance) {
    const key = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("Missing GEMINI_API_KEY environment variable. Please add it to your Vercel Project Environment Variables.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
};

const SYSTEM_CONSTRAINTS = `
Target audience: 11-14 year olds (Junior and Senior High School).
Constraint 1: Use simple English.
Constraint 2: No idioms or complex metaphors.
Constraint 3: Keep it fun and interactive.
Constraint 4: The tone should be helpful and encouraging.
Constraint 5: All math explanations must be step-by-step.
`;

export const getHomeworkHelp = async (question: string, imageBase64?: string) => {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash',
    contents: imageBase64 
      ? { parts: [{ text: question + " Explain this homework problem simply." }, { inlineData: { data: imageBase64, mimeType: 'image/jpeg' } }] }
      : question + " Explain this homework problem simply.",
    config: {
      systemInstruction: SYSTEM_CONSTRAINTS + " You are a helpful math tutor in a space galaxy.",
    },
  });
  return response.text;
};

export const generateQuiz = async (personality: ChatbotPersonality, topic: string): Promise<QuizQuestion[]> => {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash',
    contents: `Generate 3 multiple-choice math questions about ${topic} for a student aged 11-14.`,
    config: {
      systemInstruction: SYSTEM_CONSTRAINTS + ` You are ${personality}. Speak in your specific style. 
      Output the quiz in valid JSON format.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.INTEGER, description: "Index of correct option (0-3)" },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswer", "explanation"]
        }
      }
    }
  });
  
  return JSON.parse(response.text || "[]");
};

export const getRevisionSummary = async (topicId: string) => {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash',
    contents: `Provide a simple, fun revision guide for ${topicId}. Include examples and a "Star Tip".`,
    config: {
      systemInstruction: SYSTEM_CONSTRAINTS + " You are a cosmic teacher helping students revise for their math exams.",
    }
  });
  return response.text;
};