// app/api/ai/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { geminiUtils } from '@/lib/gemini/config';

export async function POST(request: NextRequest) {
    try {
        const { messages, userId } = await request.json();

        // Kiểm tra dữ liệu đầu vào
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'Vui lòng cung cấp tin nhắn'
            }, { status: 400 });
        }

        // Kiểm tra tin nhắn cuối cùng
        const lastMessage = messages[messages.length - 1];
        if (!lastMessage || !lastMessage.content || lastMessage.role !== 'user') {
            return NextResponse.json({
                success: false,
                error: 'Tin nhắn cuối cùng phải từ người dùng'
            }, { status: 400 });
        }

        // Giới hạn độ dài tin nhắn
        const totalLength = messages.reduce((sum, msg) => sum + msg.content.length, 0);
        if (totalLength > 4000) {
            return NextResponse.json({
                success: false,
                error: 'Cuộc trò chuyện quá dài. Vui lòng bắt đầu cuộc trò chuyện mới'
            }, { status: 400 });
        }

        // Giới hạn số lượng tin nhắn
        const limitedMessages = messages.slice(-10); // Chỉ lấy 10 tin nhắn gần nhất

        // Kiểm tra nội dung tin nhắn có liên quan đến Vật lý Dao động không
        const isPhysicsRelated = checkPhysicsRelated(lastMessage.content);
        if (!isPhysicsRelated) {
            return NextResponse.json({
                success: false,
                error: 'Xin lỗi, tôi chỉ có thể trả lời các câu hỏi về Vật lý 11 - Chương Dao động',
                allowedTopics: [
                    'Dao động điều hòa',
                    'Con lắc lò xo',
                    'Con lắc đơn',
                    'Năng lượng dao động',
                    'Tổng hợp dao động',
                    'Dao động tắt dần',
                    'Hiện tượng cộng hưởng'
                ]
            }, { status: 400 });
        }

        const result = await geminiUtils.chatWithContext(limitedMessages);

        if (!result.success) {
            return NextResponse.json({
                success: false,
                message: result.error,
                response: getChatFallback(lastMessage.content)
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            response: result.text,
            tokensUsed: result.usage,
            messageCount: limitedMessages.length
        });

    } catch (error) {
        console.error('Chat error:', error);
        return NextResponse.json({
            success: false,
            error: 'Lỗi máy chủ khi xử lý tin nhắn',
            response: getChatFallback('')
        }, { status: 500 });
    }
}

// Kiểm tra nội dung có liên quan đến Vật lý Dao động không
function checkPhysicsRelated(message: string): boolean {
    const physicsKeywords = [
        'dao động', 'con lắc', 'lò xo', 'chu kỳ', 'tần số',
        'biên độ', 'năng lượng', 'điều hòa', 'tắt dần', 'cộng hưởng',
        'vật lý', 'lý 11', 'dao động cơ', 'pha ban đầu', 'tần số góc',
        'ω', 'π', 'cos', 'sin', 'A', 'T', 'f', 'k', 'm', 'g'
    ];

    const lowerMessage = message.toLowerCase();
    return physicsKeywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()));
}

// Hàm tạo fallback cho chat
function getChatFallback(message: string): string {
    const fallbacks = [
        "Xin lỗi, hiện tôi đang gặp sự cố kỹ thuật. Bạn có thể thử hỏi lại sau hoặc xem tài liệu về dao động điều hòa trong sách giáo khoa.",
        "Tạm thời tôi không thể trả lời câu hỏi này. Hãy kiểm tra các công thức: x = Acos(ωt + φ), T = 2π√(m/k), W = ½kA².",
        "AI đang bảo trì. Bạn có câu hỏi nào về dao động điều hòa, con lắc lò xo, hay năng lượng dao động không?",
        "Hệ thống đang quá tải. Vui lòng thử lại sau. Trong lúc chờ, hãy ôn lại phương trình dao động x = Acos(ωt + φ)."
    ];

    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}