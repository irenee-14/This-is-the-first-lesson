// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Character Types
export interface Character {
  characterId: string;
  writerId: string;
  writerName: string;
  name: string;
  characterImg?: string;
  traits: string;
  personality: string;
  dialogueStyle: string;
  gender: string;
  description: string;
  writerNote?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCharacterRequest {
  name: string;
  characterImg?: string;
  traits: string;
  personality: string;
  dialogueStyle: string;
  gender: string;
  description: string;
  writerNote?: string;
  tags?: string[];
}

export interface UpdateCharacterRequest {
  name?: string;
  characterImg?: string;
  traits: string;
  personality: string;
  dialogueStyle: string;
  gender: string;
  description: string;
  writerNote?: string;
}

// Background Types
export interface Background {
  backgroundId: string;
  backgroundName: string;
  writerId: string;
  writerName: string;
  description: string;
  tags: string[];
  introTitle: string;
  introDescription: string;
  unlockChatCount?: number;
  backgroundImg?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBackgroundRequest {
  backgroundName: string;
  description: string;
  prompt: string;
  tags?: string[];
  introTitle: string;
  introDescription: string;
  unlockChatCount: number;
}

export interface UpdateBackgroundRequest {
  backgroundName?: string;
  description?: string;
  prompt?: string;
  tags?: string[];
  introTitle?: string;
  introDescription?: string;
  unlockChatCount?: number;
}

// Story Types
export interface Story {
  storyId: string;
  characterId: string;
  backgroundId: string;
  writerId: string;
  basic: boolean;
  characterPrompt?: string;
  opening: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStoryRequest {
  characterId: string;
  backgroundId: string;
  characterPrompt: string;
  basic: boolean;
  opening: string;
}

// Chat Types
export interface Chat {
  chatId: string;
  backgroundId: string;
  characterId: string;
  storyId: string;
  ownerId: string;
  personaId: string;
  chatCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateChatRequest {
  storyId: string;
  persona: {
    name: string;
    gender: string;
    prompt: string;
  };
}

export interface Message {
  chatId: string;
  seq: number;
  backgroundId: string;
  characterId: string;
  role: "character" | "persona";
  contents: string;
  createdAt: string;
}

export interface SendMessageRequest {
  chatId: string;
  contents: string;
}

export interface SendMessageResponse {
  userMessage: Message;
  aiMessage: Message;
}

// 채팅 목록 조회 관련 타입
export interface ChatListQuery {
  page?: number;
  limit?: number;
  characterId?: string;
  storyId?: string;
}

export interface ChatSummary {
  chatId: string;
  characterName: string;
  characterImg?: string;
  storyName: string;
  backgroundName: string;
  personaName: string;
  lastMessage?: string;
  lastMessageAt?: string;
  chatCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatListResponse {
  chats: ChatSummary[];
  total: number;
  page: number;
  limit: number;
}

// 채팅 상세 정보 타입
export interface ChatDetail {
  chatId: string;
  character: {
    characterId: string;
    name: string;
    characterImg?: string;
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
    backgroundImg?: string;
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

// 메시지 페이지네이션 타입
export interface MessageListQuery {
  page?: number;
  limit?: number;
  before?: number; // seq 번호 기준
  after?: number; // seq 번호 기준
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

// User Types
export interface User {
  userId: string;
  name?: string;
  bio?: string;
  following: number;
  follower: number;
  totalChat: number;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserRequest {
  name?: string;
  bio?: string;
}

// Persona Types
export interface Persona {
  personalId: string;
  userId: string;
  name?: string;
  gender?: string;
  prompt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePersonaRequest {
  name: string;
  gender?: string;
  prompt: string;
}

export interface UpdatePersonaRequest {
  name?: string;
  gender?: string;
  prompt?: string;
}

// Tag Types
export interface Tag {
  tagId: string;
  name: string;
}

export interface CreateTagRequest {
  name: string;
}

// Background Flow Types
export interface BackgroundFlow {
  flowId: string;
  writerId: string;
  version: number;
  createdAt: string;
  steps: BackgroundStep[];
}

export interface BackgroundStep {
  stepId: string;
  backgroundId: string;
  orderKey: number;
  isOpen?: boolean;
}

export interface CreateBackgroundFlowRequest {
  steps: {
    backgroundId: string;
    orderKey: number;
  }[];
}

// Open Background Types
export interface OpenBackground {
  openId: string;
  userId: string;
  backgroundId: string;
  writerId?: string;
  flowId?: string;
  openedAt: string;
}

export interface UnlockBackgroundRequest {
  backgroundId: string;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginResponse {
  user: User;
}

// Query Parameters
export interface CharacterListQuery {
  page?: number;
  limit?: number;
  search?: string;
  tags?: string[];
}

export interface BackgroundListQuery {
  page?: number;
  limit?: number;
  search?: string;
  tags?: string[];
  writerId?: string;
}

export interface TagListQuery {
  type?: "character" | "background";
}

export interface StoryListQuery {
  page?: number;
  limit?: number;
  characterId?: string;
  backgroundId?: string;
  writerId?: string;
  basic?: boolean;
}
