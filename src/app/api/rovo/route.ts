import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { message, context } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ reply: "I'm not connected to Gemini right now. Please check your API key." });
        }

        const prompt = `
      You are Rovo, an intelligent assistant for the Chief of Staff.
      Context: access to Jira Roadmap and Engineering Health data.
      User asks: "${message}"
      
      Current Dashboard Context: ${JSON.stringify(context || {})}
      
      Provide a concise, executive-level answer. Focus on risks and strategic alignment.
    `;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            throw new Error(`Gemini API Error: ${response.statusText}`);
        }

        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a clear insight right now.";

        return NextResponse.json({ reply });

    } catch (error) {
        console.error('Rovo Error:', error);
        return NextResponse.json({ error: 'Failed to fetch Rovo insight' }, { status: 500 });
    }
}
