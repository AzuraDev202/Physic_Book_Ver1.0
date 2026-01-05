// app/api/ai/explain/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { geminiUtils, promptTemplates } from '@/lib/gemini/config';

export async function POST(request: NextRequest) {
    try {
        const { concept, level } = await request.json();

        const prompt = promptTemplates.explainConcept(concept, level);
        const result = await geminiUtils.generateText(prompt);

        if (!result.success) {
            return NextResponse.json({
                success: false,
                message: result.error,
                fallback: result.fallbackResponse
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            explanation: result.text,
            tokensUsed: result.usage
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: 'Internal server error'
        }, { status: 500 });
    }
}