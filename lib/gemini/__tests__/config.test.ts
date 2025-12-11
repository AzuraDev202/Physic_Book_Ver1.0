// /**
//  * Test file for Gemini configuration
//  */

// import { textModel, geminiUtils, promptTemplates } from '../config';

// describe('Gemini Configuration', () => {
//     test('textModel should be configured', () => {
//         expect(textModel).toBeDefined();
//         expect(textModel.model).toBe('gemini-pro');
//     });

//     test('promptTemplates should have all required templates', () => {
//         expect(promptTemplates.explainConcept).toBeDefined();
//         expect(promptTemplates.solveExercise).toBeDefined();
//         expect(promptTemplates.gradeExercise).toBeDefined();
//         expect(promptTemplates.generateExercise).toBeDefined();
//         expect(promptTemplates.analyzeProgress).toBeDefined();
//     });

//     test('explainConcept template should generate correct prompt', () => {
//         const prompt = promptTemplates.explainConcept('dao động điều hòa', 'basic');
//         expect(prompt).toContain('dao động điều hòa');
//         expect(prompt).toContain('Học sinh lớp 11');
//         expect(prompt).toContain('Tiếng Việt');
//     });

//     test('fallback response should work', async () => {
//         // Mock failed API call
//         const mockError = new Error('API Error');

//         // Test that fallback response is returned
//         const result = await geminiUtils.generateText('test');
//         if (!result.success) {
//             expect(result.fallbackResponse).toBeDefined();
//             expect(typeof result.fallbackResponse).toBe('string');
//         }
//     });
// });