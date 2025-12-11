// app/api/ai/analyze/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { geminiUtils, promptTemplates } from '@/lib/gemini/config';
import { PassThrough } from 'stream';

export async function POST(request: NextRequest) {
    try {
        const progressData = await request.json();

        // Tạo prompt
        const prompt = promptTemplates.analyzeProgress(progressData);
        const result = await geminiUtils.generateText(prompt);

        if (!result.success || !result.text) {
            return NextResponse.json({
                success: false,
                message: result.error || "AI response error",
                fallback: result.fallbackResponse || null
            }, { status: 500 });
        }
        // console.log("AI RAW RESPONSE:", result.text);

        let cleanText = result.text
            .trim()
            .replace(/^```json/i, "")
            .replace(/^```/, "")
            .replace(/```$/, "");

        // Safe JSON parse
        // console.log("Cleantext: ", cleanText)
        let parsed;
        try {
            parsed = JSON.parse(cleanText);
        } catch (e) {
            return NextResponse.json({
                success: false,
                error: "AI did not return valid JSON",
                raw: cleanText
            }, { status: 500 });
        }


        // let cleanText = {
        //     "overview": "Bạn đã đạt 40% số câu đúng, cho thấy kiến thức nền tảng Vật lý 11 chưa vững chắc. Thời gian làm bài nhanh có thể chỉ ra sự vội vàng hoặc thiếu tự tin trong việc giải quyết vấn đề.",
        //     "strengths": [
        //         "Hoàn thành bài kiểm tra trong thời gian ngắn",
        //         "Có khả năng giải quyết được một số câu hỏi cơ bản"
        //     ],
        //     "weaknesses": [
        //         "Nắm vững kiến thức tổng thể còn hạn chế",
        //         "Cần cải thiện độ chính xác và kỹ năng vận dụng công thức"
        //     ],
        //     "studyPlan": [
        //         {
        //             "topic": "Ôn tập toàn bộ kiến thức cơ bản Vật lý 11 (từ chương đầu)",
        //             "time": "3-4 giờ/tuần",
        //             "resources": ["Sách giáo khoa Vật lý 11", "Bài giảng trực tuyến (ví dụ: VietJack, Hocmai)", "Tuyển tập bài tập cơ bản có lời giải"]
        //         }
        //     ],
        //     "weekGoal": "Nắm vững các định nghĩa, công thức cốt lõi của ít nhất 2 chương đầu tiên, và có thể giải quyết đúng 60% các bài tập cơ bản liên quan."
        // }
        // let parsed = cleanText;
        // // console.log(parsed)

        return NextResponse.json({
            success: true,
            analysis: parsed,
            tokensUsed: result.usage || null
        });

    } catch (error: any) {
        console.error("❌ Analyze API Error:", error);
        return NextResponse.json({
            success: false,
            error: 'Internal server error'
        }, { status: 500 });
    }
}
