// FIX: Cleaned up the Gemini API service, removing placeholder comments and ensuring the implementation follows the latest @google/genai SDK guidelines.
import { GoogleGenAI, Type } from "@google/genai";
import { Chair, Recommendation } from "../types";

const recommendationSchema = {
    type: Type.OBJECT,
    properties: {
        chairName: { 
            type: Type.STRING,
            description: "The name of the recommended massage chair."
        },
        duration: {
            type: Type.NUMBER,
            description: "The recommended session duration in minutes (must be 15, 30, or 60)."
        },
        reasoning: {
            type: Type.STRING,
            description: "A brief, friendly explanation for why this chair and duration were recommended based on the user's input."
        }
    },
    required: ["chairName", "duration", "reasoning"],
};

export const getMassageRecommendation = async (
    userInput: string,
    availableChairs: Omit<Chair, 'status' | 'sessionEndTime' | 'id'>[]
): Promise<Recommendation> => {
    
    // Per guidelines, the API key must be obtained from the environment variable.
    const API_KEY = process.env.API_KEY;

    if (!API_KEY) {
      console.error("Gemini API key not found in environment variables.");
      throw new Error("AI service is not configured. Missing API key.");
    }

    // Initialize GoogleGenAI with a named apiKey parameter.
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const chairInfo = availableChairs.map(c => `- ${c.name} (${c.model}): specializes in ${c.features.join(', ')}.`).join('\n');

    const systemInstruction = `
        You are an expert AI Massage Concierge at ChairZen. 
        Your goal is to help users find the perfect massage experience.
        Based on the user's description of their needs, you must recommend one of the available chairs and a session duration (15, 30, or 60 minutes).
        
        Here are the available chairs and their features:
        ${chairInfo}

        Analyze the user's input and choose the best chair and duration. Provide a short, reassuring reason for your choice.
        You must respond in the specified JSON format.
    `;

    try {
        // Call generateContent with model, contents, and config.
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userInput,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: recommendationSchema,
                temperature: 0.7,
            }
        });

        // Extract text and parse JSON response from the .text property.
        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        
        // Validate the response
        if (!parsedJson.chairName || !parsedJson.duration || !parsedJson.reasoning) {
            throw new Error("Invalid response format from AI.");
        }
        
        return parsedJson as Recommendation;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get recommendation from AI service.");
    }
};
