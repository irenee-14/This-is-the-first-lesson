import dotenv from 'dotenv'
import path from 'path'
import OpenAI from "openai";

dotenv.config({ path: path.resolve(__dirname, '../../../.env') })

export async function callGptApi(input: string) {
    console.log('GPT Key:', process.env.OPENAI_API_KEY ? 'Exists' : 'Missing');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


    const response = await openai.responses.create({
        model: "gpt-4o-mini",
        text: { 
            format: { 
                type: "json_object"
            } 
        },
        input
    });
    if (response.error != null) {
        throw new Error(`GPT API Error: ${response.status}`)
    }
    return response.output_text
}

