// path/to/generateItinerary.js
import OpenAI from 'openai';
import { NextResponse } from "next/server";




const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  try {
    const body = await req.json();
    const prompt = body.prompt;
    console.log(prompt);
    const params = {
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    };
    const chatCompletion = await openai.chat.completions.create(params);
    // console.log("HERE ",chatCompletion.message);
    const response = {
      response: chatCompletion?.choices[0].message.content?.trim(),
      // response: chatCompletion?.choices[0].message,
    };
    console.log(response);
    return NextResponse.json(response);
  } catch (error) {
    console.log(error.message)
    return NextResponse.error();
  }
}


