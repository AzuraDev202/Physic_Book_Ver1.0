/**
 * Cấu hình Gemini AI cho hệ thống Vật Lý 11
 * Tập trung vào chương Dao Động
 */

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// ==================== CẤU HÌNH API KEY ====================
const getApiKey = (): string => {
    // Ưu tiên lấy từ environment variables
    if (process.env.GEMINI_API_KEY) {
        return process.env.GEMINI_API_KEY;
    }

    // Fallback cho development
    if (process.env.NODE_ENV === "development") {
        console.warn("⚠️  GEMINI_API_KEY not found in .env file. Using demo key (limited).");
        return "demo_key_for_development_only";
    }

    throw new Error("GEMINI_API_KEY is required in production");
};

const API_KEY = getApiKey();

// ==================== KHỞI TẠO GEMINI ====================
const genAI = new GoogleGenerativeAI(API_KEY);

// ==================== CẤU HÌNH SAFETY SETTINGS ====================
const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];

// ==================== CẤU HÌNH GENERATION ====================
const generationConfig = {
    temperature: 0.7,          // Độ sáng tạo (0-1)
    topP: 0.8,                // Đa dạng hóa
    topK: 40,                 // Chọn từ top K
    maxOutputTokens: 8192,    // Giới hạn tokens
    responseMimeType: "text/plain" as const,
};

// ==================== MODEL CHÍNH (TEXT) ====================
export const textModel = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    safetySettings,
    generationConfig,
});

// ==================== MODEL VISION (XỬ LÝ ẢNH) ====================
export const visionModel = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    safetySettings,
    generationConfig: {
        ...generationConfig,
        maxOutputTokens: 4096, // Vision cần nhiều tokens hơn
    },
});

// ==================== CẤU HÌNH CHO VẬT LÝ DAO ĐỘNG ====================
export const physicsConfig = {
    subject: "Vật Lý 11",
    chapter: "Dao Động Cơ",
    focusTopics: [
        "Dao động điều hòa",
        "Con lắc lò xo",
        "Con lắc đơn",
        "Năng lượng dao động",
        "Tổng hợp dao động",
        "Dao động tắt dần",
        "Hiện tượng cộng hưởng"
    ],
    keyFormulas: {
        harmonicMotion: "x = A cos(ωt + φ)",
        periodSpring: "T = 2π√(m/k)",
        periodPendulum: "T = 2π√(l/g)",
        energy: "W = ½kA² = ½mω²A²",
        angularFrequency: "ω = 2πf = √(k/m)"
    }
};

// ==================== PROMPT TEMPLATES ====================
export const promptTemplates = {
    // Giải thích lý thuyết
    explainConcept: (concept: string, level: 'basic' | 'advanced' = 'basic') => `
Bạn là giáo viên Vật Lý 11 chuyên về DAO ĐỘNG.
Yêu cầu: Giải thích khái niệm "${concept}"
Đối tượng: Học sinh lớp 11 ${level === 'basic' ? 'mới học' : 'nâng cao'}
Cách giải thích: ${level === 'basic' ? 'Đơn giản, ví dụ thực tế, tránh công thức phức tạp' : 'Chi tiết, công thức đầy đủ, chứng minh'}
Ngôn ngữ: Tiếng Việt, thân thiện
Độ dài: 150-200 từ
`,

    // Giải bài tập
    solveExercise: (problem: string, showSteps: boolean = true) => `
Bạn là gia sư Vật Lý giải bài tập DAO ĐỘNG.
Bài tập: "${problem}"
Yêu cầu:
1. Phân tích đề bài
2. ${showSteps ? 'Giải từng bước chi tiết' : 'Đưa ra đáp án cuối cùng'}
3. Kiểm tra đơn vị
4. Kết luận và giải thích ý nghĩa
5. Đề xuất bài tập tương tự
Không sử dụng markdown, viết như giáo viên giảng bài.
`,

    // Chấm bài tập
    gradeExercise: (studentAnswer: string, correctAnswer: string) => `
Bạn là trợ lý chấm bài Vật Lý DAO ĐỘNG.
Bài làm học sinh: "${studentAnswer}"
Đáp án đúng: "${correctAnswer}"
Yêu cầu:
1. Chấm điểm (0-10)
2. Chỉ ra phần đúng/sai
3. Giải thích lỗi (nếu có)
4. Gợi ý cải thiện
5. Đưa ra lời giải mẫu
Định dạng JSON: {
  "score": number,
  "correctParts": string[],
  "incorrectParts": {part: string, reason: string}[],
  "feedback": string,
  "modelSolution": string
}
`,

    // Tạo bài tập
    generateExercise: (topic: string, difficulty: 'easy' | 'medium' | 'hard') => `
Tạo bài tập Vật Lý DAO ĐỘNG:
Chủ đề: ${topic}
Độ khó: ${difficulty}
Yêu cầu:
1. Đề bài rõ ràng, có dữ kiện
2. Câu hỏi cụ thể
3. Đáp án chi tiết từng bước
4. Công thức áp dụng
5. Lưu ý khi giải
Định dạng JSON: {
  "problem": string,
  "solution": string,
  "formulasUsed": string[],
  "hints": string[],
  "difficulty": "${difficulty}"
}
`,

    // Phân tích tiến độ học tập
    analyzeProgress: (progressData: any) => `
    Bạn là hệ thống phân tích kết quả học tập Vật lý 11.

    Dữ liệu:
    - total: ${progressData.total}số câu
    - score: ${progressData.score}số câu đúng
    - percentage: ${progressData.percentage}%
    - timeMinutes: ${progressData.timeMinutes} phút làm bài
    - weakestLesson: {${progressData.weakestLesson}, ${progressData.worstRate}} hoặc null
    - weakestDifficulty: {${progressData.worstDiff}, ${progressData.worstRate}} hoặc null

    Nhiệm vụ:
    Tạo phân tích cực ngắn, dưới 150 từ.

    Trả về đúng JSON:
    {
    "overview": "1–2 câu tóm tắt mức độ nắm bài",
    "strengths": ["2–3 điểm mạnh"],
    "weaknesses": ["1–2 điểm yếu"],
    "studyPlan": [
        { "topic": "nội dung", "time": "thời gian", "resources": ["tài nguyên"] }
    ],
    "weekGoal": "1 câu mục tiêu học tập"
    }

    Lưu ý:
    - Không giải thích.
    - Không thêm văn bản ngoài JSON.
    - Hướng dẫn học phải thực tế, dựa vào bài yếu nhất và độ khó yếu nhất.
`
};

// ==================== UTILITY FUNCTIONS ====================
export const geminiUtils = {
    /**
     * Gọi Gemini API với xử lý lỗi
     */
    async generateText(prompt: string, model: 'text' | 'vision' = 'text') {
        try {
            const selectedModel = model === 'vision' ? visionModel : textModel;
            const result = await retryRequest(() => selectedModel.generateContent(prompt));
            const response = result.response;

            return {
                success: true,
                text: response.text(),
                usage: {
                    promptTokens: response.usageMetadata?.promptTokenCount || 0,
                    candidatesTokens: response.usageMetadata?.candidatesTokenCount || 0,
                    totalTokens: response.usageMetadata?.totalTokenCount || 0
                }
            };
        } catch (error: any) {
            console.error("Gemini API Error:", error);

            // Phân loại lỗi
            let errorMessage = "Lỗi không xác định";
            let errorCode = "UNKNOWN_ERROR";

            if (error.message?.includes("API key")) {
                errorMessage = "API Key không hợp lệ. Vui lòng kiểm tra cấu hình.";
                errorCode = "INVALID_API_KEY";
            } else if (error.message?.includes("quota")) {
                errorMessage = "Đã hết lượt sử dụng API miễn phí. Vui lòng nâng cấp tài khoản.";
                errorCode = "QUOTA_EXCEEDED";
            } else if (error.message?.includes("safety")) {
                errorMessage = "Nội dung vi phạm chính sách an toàn.";
                errorCode = "SAFETY_BLOCKED";
            } else if (error.message?.includes("network")) {
                errorMessage = "Lỗi kết nối mạng. Vui lòng kiểm tra internet.";
                errorCode = "NETWORK_ERROR";
            } else if (error.status === 503) {
                errorMessage = "Máy chủ AI đang quá tải. Vui lòng thử lại sau.";
                errorCode = "MODEL_OVERLOADED";
            }

            return {
                success: false,
                error: errorMessage,
                errorCode,
                fallbackResponse: getFallbackResponse(prompt)
            };
        }
    },

    /**
     * Xử lý ảnh bài tập viết tay
     */
    // async processExerciseImage(imageBuffer: Buffer, mimeType: string) {
    //     const prompt = `
    // Phân tích ảnh bài tập Vật Lý DAO ĐỘNG:
    // 1. Nhận dạng chữ viết tay
    // 2. Trích xuất đề bài và lời giải
    // 3. Phân tích nội dung có phải dao động không
    // 4. Đề xuất cách chấm điểm

    // Trả lời bằng JSON: {
    //   "detectedText": string,
    //   "isPhysicsExercise": boolean,
    //   "topic": string,
    //   "confidence": number,
    //   "suggestedGrading": string
    // }
    // `;

    //     const imageParts = [
    //         {
    //             inlineData: {
    //                 data: imageBuffer.toString("base64"),
    //                 mimeType: mimeType
    //             }
    //         },
    //         { text: prompt }
    //     ];

    //     return this.generateText(imageParts, 'vision');
    // },

    /**
     * Chat conversation với context
     */
    async chatWithContext(messages: Array<{ role: 'user' | 'assistant', content: string }>) {
        const history = messages.slice(0, -1); // Tất cả trừ tin nhắn cuối
        const currentMessage = messages[messages.length - 1];

        const contextPrompt = `
    [VẬT LÝ 11 - CHƯƠNG DAO ĐỘNG]
    Lịch sử chat:
    ${history.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
    
    Tin nhắn hiện tại: ${currentMessage.content}
    
    Trả lời với:
    1. Tiếp nối cuộc trò chuyện
    2. Không lặp lại thông tin đã nói
    3. Tập trung vào dao động
    4. Ngôn ngữ tự nhiên, thân thiện
    `;

        return this.generateText(contextPrompt);
    }
};

// ==================== FALLBACK RESPONSES ====================
function getFallbackResponse(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();

    // Phân loại prompt để đưa ra fallback phù hợp
    if (lowerPrompt.includes("dao động điều hòa") || lowerPrompt.includes("x = a cos")) {
        return "Dao động điều hòa có phương trình: x = A cos(ωt + φ). Trong đó A là biên độ, ω là tần số góc, φ là pha ban đầu.";
    }

    if (lowerPrompt.includes("chu kỳ") || lowerPrompt.includes("t = ")) {
        return "Công thức chu kỳ:\n- Con lắc lò xo: T = 2π√(m/k)\n- Con lắc đơn: T = 2π√(l/g)";
    }

    if (lowerPrompt.includes("năng lượng") || lowerPrompt.includes("w = ")) {
        return "Năng lượng dao động: W = ½kA² = ½mω²A². Năng lượng bảo toàn, chuyển hóa giữa động năng và thế năng.";
    }

    if (lowerPrompt.includes("con lắc lò xo")) {
        return "Con lắc lò xo: dao động điều hòa với chu kỳ T = 2π√(m/k). Năng lượng tỉ lệ với bình phương biên độ.";
    }

    if (lowerPrompt.includes("con lắc đơn")) {
        return "Con lắc đơn: chỉ dao động điều hòa khi góc lệch nhỏ (< 10°). Chu kỳ T = 2π√(l/g) không phụ thuộc khối lượng.";
    }

    // Fallback chung
    const fallbacks = [
        "Hiện hệ thống AI đang bận. Bạn có thể xem lại công thức: x = A cos(ωt + φ) cho dao động điều hòa.",
        "Tạm thời chưa trả lời được. Nhớ rằng năng lượng dao động luôn bảo toàn: W = Wđ + Wt = const.",
        "Kết nối có vấn đề. Chu kỳ con lắc lò xo: T = 2π√(m/k), con lắc đơn: T = 2π√(l/g).",
        "AI đang bảo trì. Pha ban đầu φ xác định vị trí bắt đầu của dao động."
    ];

    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// ==================== RATE LIMITER ====================
class RateLimiter {
    private requests: number[] = [];
    private limit: number;
    private windowMs: number;

    constructor(limit: number = 60, windowMs: number = 60000) {
        this.limit = limit; // 60 requests
        this.windowMs = windowMs; // per minute
    }

    canMakeRequest(): boolean {
        const now = Date.now();

        // Xóa các request cũ
        this.requests = this.requests.filter(time => now - time < this.windowMs);

        // Kiểm tra giới hạn
        if (this.requests.length >= this.limit) {
            return false;
        }

        // Thêm request mới
        this.requests.push(now);
        return true;
    }

    getWaitTime(): number {
        const now = Date.now();
        this.requests = this.requests.filter(time => now - time < this.windowMs);

        if (this.requests.length < this.limit) {
            return 0;
        }

        const oldestRequest = this.requests[0];
        return this.windowMs - (now - oldestRequest);
    }
}

export const apiRateLimiter = new RateLimiter(60, 60000); // 60 requests/minute
// ==================== RETRY WRAPPER ====================
async function retryRequest<T>(fn: () => Promise<T>, retries = 3, delayMs = 1000): Promise<T> {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await fn();
        } catch (err: any) {
            // Nếu lỗi là 503 Overloaded thì retry
            if (err.status === 503 || err.message?.includes("overloaded")) {
                console.warn(`⚠️ Gemini overloaded. Retry ${attempt}/${retries}...`);
                if (attempt < retries) {
                    await new Promise(res => setTimeout(res, delayMs * attempt)); // exponential backoff
                    continue;
                }
            }
            throw err; // hết retries → throw
        }
    }
    throw new Error("Retry failed.");
}

// ==================== EXPORT CHÍNH ====================
export default {
    textModel,
    visionModel,
    physicsConfig,
    promptTemplates,
    geminiUtils,
    apiRateLimiter
};