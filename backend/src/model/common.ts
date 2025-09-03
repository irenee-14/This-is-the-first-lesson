import dotenv from "dotenv";
import path from "path";
import OpenAI from "openai";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// OpenAI 메시지 타입 정의
export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// 메시지 배열을 JSON 문자열로 변환하는 공통 함수
export function toMessageInputs(
  system: string,
  user: string,
  history: { role: "user" | "assistant"; content: string }[] = []
): string {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: system,
    },
    {
      role: "user",
      content: user,
    },
    ...history.map((h) => ({
      role: h.role === "user" ? ("user" as const) : ("assistant" as const),
      content: h.content,
    })),
  ];

  return JSON.stringify(messages);
}

// GPT API 호출 함수 (JSON 문자열 받는 버전 - 기존 호환성)
export async function callGptApi(
  messagesInput: string,
  options?: {
    maxTokens?: number;
    temperature?: number;
    model?: string;
  }
) {
  console.log("GPT Key:", process.env.OPENAI_API_KEY ? "Exists" : "Missing");
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const messages = JSON.parse(messagesInput);

    const response = await openai.chat.completions.create({
      model: options?.model || "gpt-4o-mini",
      messages: messages,
      max_tokens: options?.maxTokens || 500,
      temperature: options?.temperature || 0.8,

    });

    if (!response.choices || response.choices.length === 0) {
      throw new Error("GPT API에서 응답을 받지 못했습니다.");
    }

    return response.choices[0].message.content || "응답을 생성할 수 없습니다.";
  } catch (error) {
    console.error("GPT API 호출 오류:", error);
    throw new Error(`GPT API Error: ${error}`);
  }
}

// GPT API 호출 함수 (메시지 배열 직접 받는 버전)
export async function callGptApiDirect(
  messages: ChatMessage[],
  options?: {
    maxTokens?: number;
    temperature?: number;
    model?: string;
  }
) {
  console.log("GPT Key:", process.env.OPENAI_API_KEY ? "Exists" : "Missing");
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const response = await openai.chat.completions.create({
      model: options?.model || "gpt-4o-mini",
      messages: messages,
      max_tokens: options?.maxTokens || 500,
      temperature: options?.temperature || 0.8,
    });

    if (!response.choices || response.choices.length === 0) {
      throw new Error("GPT API에서 응답을 받지 못했습니다.");
    }

    return response.choices[0].message.content || "응답을 생성할 수 없습니다.";
  } catch (error) {
    console.error("GPT API 호출 오류:", error);
    throw new Error(`GPT API Error: ${error}`);
  }
}
