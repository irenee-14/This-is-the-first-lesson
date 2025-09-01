import dotenv from "dotenv";
import path from "path";
import { callGptApi, toMessageInputs } from "./common";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

type CharacterDTO = {
  name: string;
  traits: string;
  personality: string;
  dialogueStyle: string;
  gender: string;
  description: string;
};

type BackgroundDTO = {
  name: string;
  description: string;
};

const GPT_CHAT_SYSTEM = `당신은 캐릭터 챗봇 역할을 합니다.
아래 정보는 이 작품 세계관과 등장인물 설정입니다. 캐릭터의 성격, 말투, 관계를 일관되게 유지하세요.

[대화 규칙]
- 한국어로 대답
- 캐릭터답게 자연스럽게 말하기 (메타발언 금지)
- 대화가 이어질 수 있도록 답변은 3~5문장
- 직접 발화 및 주변 상황 서술 필수 포함
- 사용자가 질문하면 캐릭터 시점에서 답변
- 너무 길거나 장황하게 말하지 말 것
- 금지: 이모지, 해시태그, 캐릭터 설정 외 정보 노출, "나는 AI야" 같은 말
- 안전: 폭력·혐오·선정적 표현은 순화하거나 은유로 처리
`;

const GPT_CHAT_USER = (
  character: CharacterDTO,
  background: BackgroundDTO,
  story: { name: string; characterPrompt: string; opening: string },
  persona: { name: string; gender: string; prompt: string }
) => `
[캐릭터 설정]
${story.characterPrompt}

[배경 설정]
${background.name}: ${background.description}
도입부: ${story.opening}

[사용자 페르소나]
이름: ${persona.name}
성별: ${persona.gender}
특징: ${persona.prompt}
`;

export function buildGptChat(
  character: CharacterDTO,
  background: BackgroundDTO,
  story: { name: string; characterPrompt: string; opening: string },
  persona: { name: string; gender: string; prompt: string },
  history: { role: "user" | "assistant"; content: string }[] = []
) {
  const system = GPT_CHAT_SYSTEM.trim();
  const user = GPT_CHAT_USER(character, background, story, persona).trim();
  const input = toMessageInputs(system, user, history);

  // 채팅은 짧고 자연스러운 응답을 위해 낮은 max_tokens 사용
  return callGptApi(input, {
    maxTokens: 300,
    temperature: 0.8,
  });
}
