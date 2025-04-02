import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";

// Load environment variables
config();

// Initialize the AI instance
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_KEY, // Ensure your .env file has GOOGLE_GEMINI_KEY set
});

// Function to generate content
async function generateContent(prompt) {
    const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        systemInstruction:`
        You are an code reviewer, who have an experties in development.
        you look for the code and find the problems and suggest the solution to the developer.

        you always try to find best solution for the developer and also try to
        make the code more efficient and clean.
        `,
    });
    return result.text; // Return the response text
}

// Export the AI service
const aiService = async (prompt) => {
    return await generateContent(prompt);
};

export default aiService;
