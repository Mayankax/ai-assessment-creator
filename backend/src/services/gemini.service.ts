import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateQuestions(input: any) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

const prompt = `
  You are an AI that generates structured exam question papers.

  STRICT RULES:
  - Output ONLY valid JSON
  - NO markdown
  - NO explanations
  - NO extra text
  - JSON must be directly parseable

  IMPORTANT:
  - Section titles MUST be meaningful and based on question types
  - DO NOT use generic names like "Section A"
  - Use descriptive names

  SECTION TITLE RULES:
  - If MCQ → "Multiple Choice Questions"
  - If Short → "Short Answer Questions"
  - If Numerical → "Numerical Problems"
  - If Diagram → "Diagram-Based Questions"

  QUESTION TYPE RULES:

  1. MCQ:
  - Provide 4 options (A, B, C, D)
  - Include correct answer

  2. Short:
  - 1–2 line answers

  3. Numerical:
  - Calculation-based

  4. Diagram:
  - Conceptual explanation

  FORMAT:
  {
    "sections": [
      {
        "title": "Descriptive section title based on type",
        "instruction": "Attempt all questions",
        "questions": [
          {
            "question": "string",
            "options": ["optional for MCQ"],
            "answer": "string",
            "difficulty": "easy | medium | hard",
            "marks": number
          }
        ]
      }
    ]
  }

  INPUT:
  ${JSON.stringify(input)}
  `;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  return response;
}