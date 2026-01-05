// app/api/ai/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    return NextResponse.json({
        message: 'Gemini AI API for Physics Learning',
        version: '1.0.0',
        endpoints: {
            explain: 'POST /api/ai/explain - Giải thích khái niệm',
            analyze: 'POST /api/ai/analyze - Phân tích tiến độ học tập',
            solve: 'POST /api/ai/solve - Giải bài tập',
            grade: 'POST /api/ai/grade - Chấm bài tập',
            generate: 'POST /api/ai/generate - Tạo bài tập',
            chat: 'POST /api/ai/chat - Chat với AI có context',
            health: 'GET /api/ai/health - Kiểm tra trạng thái API',
            vision: 'POST /api/ai/vision - Xử lý ảnh bài tập (coming soon)'
        },
        config: {
            subject: 'Vật Lý 11',
            chapter: 'Dao Động Cơ',
            focusTopics: [
                'Dao động điều hòa',
                'Con lắc lò xo',
                'Con lắc đơn',
                'Năng lượng dao động',
                'Tổng hợp dao động',
                'Dao động tắt dần',
                'Hiện tượng cộng hưởng'
            ]
        }
    });
}