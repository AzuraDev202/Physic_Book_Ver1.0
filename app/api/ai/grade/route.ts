// app/api/ai/grade/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { geminiUtils, promptTemplates } from '@/lib/gemini/config';

export async function POST(request: NextRequest) {
    try {
        const { studentAnswer, correctAnswer } = await request.json();

        // Kiểm tra dữ liệu đầu vào
        if (!studentAnswer || !correctAnswer) {
            return NextResponse.json({
                success: false,
                error: 'Vui lòng cung cấp đầy đủ bài làm học sinh và đáp án đúng'
            }, { status: 400 });
        }

        // Giới hạn độ dài
        if (studentAnswer.length > 2000 || correctAnswer.length > 1000) {
            return NextResponse.json({
                success: false,
                error: 'Nội dung quá dài. Vui lòng giới hạn bài làm dưới 2000 ký tự và đáp án dưới 1000 ký tự'
            }, { status: 400 });
        }

        const prompt = promptTemplates.gradeExercise(studentAnswer, correctAnswer);
        const result = await geminiUtils.generateText(prompt);

        if (!result.success) {
            return NextResponse.json({
                success: false,
                message: result.error,
                grading: parseFallbackGrading(result.fallbackResponse || '')
            }, { status: 500 });
        }

        try {
            const grading = JSON.parse(result.text || '');

            // Validate response format
            if (!grading.score || !Array.isArray(grading.correctParts) || !Array.isArray(grading.incorrectParts)) {
                throw new Error('Invalid grading format');
            }

            return NextResponse.json({
                success: true,
                grading: grading,
                tokensUsed: result.usage
            });

        } catch (parseError) {
            console.error('Failed to parse grading response:', parseError);
            return NextResponse.json({
                success: false,
                error: 'Không thể phân tích kết quả chấm bài',
                fallback: parseFallbackGrading(result.text || '')
            }, { status: 500 });
        }

    } catch (error) {
        console.error('Grade exercise error:', error);
        return NextResponse.json({
            success: false,
            error: 'Lỗi máy chủ khi chấm bài tập'
        }, { status: 500 });
    }
}

// Hàm parse fallback response cho grading
function parseFallbackGrading(fallback: string): any {
    try {
        return JSON.parse(fallback);
    } catch {
        // Nếu không parse được JSON, tạo fallback đơn giản
        return {
            score: 5,
            correctParts: ["Đã hoàn thành bài làm"],
            incorrectParts: [{ part: "toàn bộ", reason: "Chưa có đánh giá chi tiết từ AI" }],
            feedback: "Hiện tại AI đang bận. Vui lòng kiểm tra lại bài làm của bạn.",
            modelSolution: "Hãy xem lại đáp án trong sách giáo khoa hoặc tài liệu học tập."
        };
    }
}