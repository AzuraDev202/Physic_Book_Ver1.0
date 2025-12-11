/**
 * Type definitions for Gemini AI
 */

export interface GeminiResponse {
    success: boolean;
    text?: string;
    error?: string;
    errorCode?: string;
    fallbackResponse?: string;
    usage?: {
        promptTokens: number;
        candidatesTokens: number;
        totalTokens: number;
    };
}

export interface ExerciseData {
    problem: string;
    solution: string;
    formulasUsed: string[];
    hints: string[];
    difficulty: 'easy' | 'medium' | 'hard';
}

export interface GradingResult {
    score: number;
    correctParts: string[];
    incorrectParts: Array<{
        part: string;
        reason: string;
    }>;
    feedback: string;
    modelSolution: string;
}

export interface ProgressAnalysis {
    overview: string;
    strengths: string[];
    weaknesses: string[];
}

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export interface PhysicsTopic {
    id: string;
    name: string;
    description: string;
    difficulty: number;
    prerequisites: string[];
    formulas: string[];
    commonMistakes: string[];
}