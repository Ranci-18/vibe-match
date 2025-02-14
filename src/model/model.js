import dotenv from 'dotenv';
dotenv.config();
// import the model
import { GoogleGenerativeAI } from '@google/generative-ai';

// model logic starts here
const apikey = process.env.GEMINI_API;
const genAI = new GoogleGenerativeAI(apikey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});
const prompt = "if i like the musician kendrik lamar give me a list of 5 similar musicians I might like without description - just the titles of the musicians"