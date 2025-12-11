/**
 * Middleware for Gemini API requests
 */

import { NextRequest, NextResponse } from 'next/server';
import { apiRateLimiter } from './config';

export async function geminiMiddleware(request: NextRequest) {
    // Kiểm tra rate limiting
    if (!apiRateLimiter.canMakeRequest()) {
        const waitTime = apiRateLimiter.getWaitTime();
        return NextResponse.json({
            error: 'Rate limit exceeded',
            message: `Vui lòng thử lại sau ${Math.ceil(waitTime / 1000)} giây`,
            retryAfter: waitTime
        }, { status: 429 });
    }

    // Kiểm tra API key
    if (!process.env.GEMINI_API_KEY && process.env.NODE_ENV === 'production') {
        return NextResponse.json({
            error: 'Configuration error',
            message: 'Gemini API key is not configured'
        }, { status: 500 });
    }

    return null; // Cho phép request tiếp tục
}

// Helper để xử lý lỗi phổ biến
export function handleGeminiError(error: any) {
    console.error('Gemini Error Details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
    });

    if (error.message?.includes('429')) {
        return {
            success: false,
            error: 'Quá nhiều yêu cầu',
            suggestion: 'Vui lòng chờ 1 phút trước khi thử lại'
        };
    }

    if (error.message?.includes('403')) {
        return {
            success: false,
            error: 'API Key không hợp lệ',
            suggestion: 'Kiểm tra lại GEMINI_API_KEY trong .env.local'
        };
    }

    return {
        success: false,
        error: 'Lỗi hệ thống AI',
        suggestion: 'Vui lòng thử lại sau ít phút'
    };
}