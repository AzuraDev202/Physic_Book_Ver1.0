// app/api/ai/vision/route.ts
import { NextRequest, NextResponse } from 'next/server';
// import { geminiUtils } from '@/lib/gemini/config';

export async function POST(request: NextRequest) {
    try {
        return NextResponse.json({
            success: false,
            error: 'Vision API đang được phát triển',
            message: 'Tính năng xử lý ảnh sẽ có trong phiên bản tiếp theo'
        }, { status: 501 });

        /* // Code khi triển khai vision
        const formData = await request.formData();
        const image = formData.get('image') as File;
        const question = formData.get('question') as string || '';

        if (!image) {
            return NextResponse.json({
                success: false,
                error: 'Vui lòng tải lên ảnh'
            }, { status: 400 });
        }

        // Convert image to buffer
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const mimeType = image.type;

        const result = await geminiUtils.processExerciseImage(buffer, mimeType);

        if (!result.success) {
            return NextResponse.json({
                success: false,
                message: result.error,
                analysis: result.fallbackResponse
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            analysis: JSON.parse(result.text || '{}'),
            tokensUsed: result.usage
        });
        */

    } catch (error) {
        console.error('Vision processing error:', error);
        return NextResponse.json({
            success: false,
            error: 'Lỗi xử lý ảnh'
        }, { status: 500 });
    }
}