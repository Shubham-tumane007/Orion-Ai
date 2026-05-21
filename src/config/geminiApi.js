// src/config/geminiApi.js
import { GoogleGenerativeAI } from '@google/generative-ai';

// Note: Ensure this API key is secured in a real application, 
// usually by using a process.env variable.
const apiKey = 'AIzaSyD5iZOfRklwcaTwHmTPUq293C402XGWXUw'; 
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash', // <-- **FIXED: Changed from gemini-1.5-flash**
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
};

export const run = async (prompt) => {
    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
};