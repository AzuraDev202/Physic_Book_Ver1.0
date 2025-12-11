// app/api/ai/solve/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { geminiUtils, promptTemplates } from '@/lib/gemini/config';

export async function POST(request: NextRequest) {
    try {
        const { problem, showSteps = true } = await request.json();

        // Kiểm tra dữ liệu đầu vào
        if (!problem || typeof problem !== 'string') {
            return NextResponse.json({
                success: false,
                error: 'Vui lòng cung cấp bài tập cần giải'
            }, { status: 400 });
        }

        // Giới hạn độ dài bài tập
        if (problem.length > 1000) {
            return NextResponse.json({
                success: false,
                error: 'Bài tập quá dài. Vui lòng giới hạn dưới 1000 ký tự'
            }, { status: 400 });
        }

        const prompt = promptTemplates.solveExercise(problem, showSteps);
        const result = await geminiUtils.generateText(prompt);

        if (!result.success) {
            return NextResponse.json({
                success: false,
                message: result.error,
                solution: result.fallbackResponse
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            solution: result.text,
            tokensUsed: result.usage
        });

    } catch (error) {
        console.error('Solve exercise error:', error);
        return NextResponse.json({
            success: false,
            error: 'Lỗi máy chủ khi giải bài tập'
        }, { status: 500 });
    }
}