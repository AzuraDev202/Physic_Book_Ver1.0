// app/api/ai/health/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { geminiUtils, physicsConfig } from '@/lib/gemini/config';

export async function GET(request: NextRequest) {
    try {
        // Kiểm tra kết nối với Gemini API bằng một prompt đơn giản
        const testPrompt = `Kiểm tra kết nối. Trả lời ngắn gọn: "Kết nối thành công"`;

        const result = await geminiUtils.generateText(testPrompt);

        const healthStatus = {
            timestamp: new Date().toISOString(),
            gemini: {
                connected: result.success,
                status: result.success ? 'healthy' : 'unhealthy',
                error: result.success ? null : result.error
            },
            config: {
                subject: physicsConfig.subject,
                chapter: physicsConfig.chapter,
                topics: physicsConfig.focusTopics.length,
                environment: process.env.NODE_ENV
            },
            limits: {
                maxOutputTokens: 1024,
                rateLimit: '30 requests/minute'
            }
        };

        return NextResponse.json({
            success: true,
            status: healthStatus,
            message: result.success ? 'AI service is operational' : 'AI service has issues'
        });

    } catch (error) {
        console.error('Health check error:', error);

        return NextResponse.json({
            success: false,
            status: {
                timestamp: new Date().toISOString(),
                gemini: {
                    connected: false,
                    status: 'unhealthy',
                    error: 'Health check failed'
                },
                config: {
                    subject: physicsConfig.subject,
                    chapter: physicsConfig.chapter,
                    environment: process.env.NODE_ENV
                }
            },
            message: 'AI service is unavailable'
        }, { status: 503 });
    }
}