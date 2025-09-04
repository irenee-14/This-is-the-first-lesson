export interface ChatSummary {
  id: string;
  chatId: string;
  characterName: string;
  characterImg: string;
  storyName: string;
  backgroundName: string;
  personaName: string;
  lastMessage?: string;
  lastMessageAt?: string;
  chatCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatDetail {
  chatId: string;
  character: {
    characterId: string;
    name: string;
    characterImg: string;
    traits: string;
    personality: string;
    dialogueStyle: string;
    gender: string;
    description: string;
  };
  background: {
    backgroundId: string;
    name: string;
    description: string;
    backgroundImg: string;
  };
  story: {
    storyId: string;
    name: string;
    characterPrompt: string;
    opening: string;
  };
  persona: {
    name: string;
    gender: string;
    prompt: string;
  };
  chatCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  chatId: string;
  seq: number;
  backgroundId: string;
  characterId: string;
  role: "character" | "persona";
  contents: string;
  createdAt: string;
  unlockedBackground: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SendMessageRequest {
  contents: string;
}

export interface SendMessageResponse {
  userMessage: Message;
  aiMessage: Message;
}

export interface MessageListResponse {
  messages: Message[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextBefore?: number;
}

export interface ChatData {
  success: boolean;
  data: {
    chatId?: string;
    chatSummary?: ChatSummary[];
    chatDetail?: ChatDetail;
    messageList?: MessageListResponse[];
    message?: Message[];
  };
}
