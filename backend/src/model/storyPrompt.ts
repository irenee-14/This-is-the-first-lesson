import dotenv from "dotenv";
import { $Enums } from "generated/prisma";
import path from "path";
import { callGptApi, toMessageInputs } from "./common";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

type CharacterDTO = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  writerId: string;
  description: string;
  characterImg: string | null;
  traits: string;
  personality: string;
  dialogueStyle: string;
  gender: $Enums.Gender;
  writerNote: string | null;
};

type BackgroundDTO = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  writerId: string;
  description: string;
  prompt: string;
  tags: string[];
  introTitle: string;
  introDescription: string;
  unlockChatCount: number;
  backgroundImg: string | null;
};

const GPT_CREATE_STORY_SYSTEM = `당신은 한국어 스토리 프롬프트 엔지니어이자 콘셉트 라이터입니다.
아래 요구사항을 정확히 만족하는 JSON만 출력하세요. 설명, 주석, 마크다운 금지.

[목표]
입력된 캐릭터와 배경 정보를 조합해
1) 작품의 제목 title
2) 캐릭터-배경 설명 characterPrompt  (캐릭터의 성격/말투/특징이 배경 콘셉트에 녹아든 ‘이 작품 한정 캐릭터 설명’)
3) 작품 도입부 opening  (배경의 도입부 분위기와 사건의 첫 장면. 훅이 있어야 하며 다음 대화가 자연스럽게 이어지도록 마무리)

[작성 규칙]
- 언어: 한국어
- 톤: 입력 태그/장르를 따르되, 과도한 선정성/폭력성 금지
- 시점: 3인칭 기본 (필요하면 1인칭 전환 허용)
- 길이 가이드:
  - name: 12자 내외, 과도한 수식어 금지
  - characterPrompt: 130~220자 (캐릭터의 말투·가치관·관계맺는 방식까지 포함)
  - opening: 250~400자 (공간감·감각 묘사 1개 이상, 갈등의 씨앗 1개 명시)
- 금지: 이모지, 해시태그, 마크다운, 따옴표로 제목 감싸기, 불필요한 메타설명
- 안전: 실제 인물/단체 실명은 등장시키지 말 것. 민감한 설정은 은유적으로 처리.

[출력 형식(JSON)]
{
  "name": "string",
  "characterPrompt": "string",
  "opening": "string"
}

JSON 외 텍스트 금지.`;

const GPT_CREATE_STORY_USER = (
  character: CharacterDTO,
  background: BackgroundDTO
) => `
[캐릭터 정보]
이름: ${character.name}
성격: ${character.personality || ""}
특성: ${character.traits || ""}
말투: ${character.dialogueStyle || ""}
소개: ${character.description || ""}
(참고) 작가 메모: ${character.writerNote || ""}

[배경 정보]
이름: ${background.name}
설명: ${background.description || ""}
프롬프트/설정: ${background.prompt || ""}
태그: ${(background.tags || []).join(", ")}
도입부 제목: ${background.introTitle || ""}
도입부 설명: ${background.introDescription || ""}
해금 조건(참고): ${background.unlockChatCount ?? ""}

[요청]
위 정보를 바탕으로 본 작품에 한정된 characterPrompt, opening, name을 생성하세요.
출력은 지정된 JSON 형식만.
  `;

export function buildGptStory(
  character: CharacterDTO,
  background: BackgroundDTO
) {
  const system = (GPT_CREATE_STORY_SYSTEM || "").trim();
  const user = (GPT_CREATE_STORY_USER(character, background) || "").trim();

  const input = toMessageInputs(system, user);

  // 스토리 생성은 JSON 응답을 받아야 하므로 더 높은 max_tokens 사용
  return callGptApi(input, {
    maxTokens: 800,
    temperature: 0.7,
  });
}
