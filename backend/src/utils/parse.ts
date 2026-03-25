export function safeJsonParse(text: string) {
  try {
    let cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // 🔥 extract JSON if extra text exists
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");

    if (firstBrace !== -1 && lastBrace !== -1) {
      cleaned = cleaned.slice(firstBrace, lastBrace + 1);
    }

    return JSON.parse(cleaned);
  } catch (err) {
    console.error("JSON parse failed:", text);
    throw new Error("Invalid AI response format");
  }
}

export function safeValidate(schema: any, data: any) {
  const result = schema.safeParse(data);

  if (!result.success) {
    console.error("Validation error:", result.error);
    throw new Error("AI response validation failed");
  }

  return result.data;
}