export interface Background {
  backgroundId: string;
  backgroundName: string;
  writerId: string;
  writerName: string;
  description: string;
  tags: string[];
  introTitle?: string;
  introDescription?: string;
  unlockChatCount?: number;
  backgroundImg?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BackgroundStep {
  backgroundId: string;
  backgroundName: string;
  tags: string[];
  backgroundImg: string;
  isOpened: boolean;
}

export interface BackgroundFlow {
  flowId: string;
  version: number;
  steps: BackgroundStep[];
}

export interface BackgroundListResponse {
  success: boolean;
  data: {
    backgrounds?: Background[];
    flows?: BackgroundFlow[];
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface BackgroundDetailResponse {
  success: boolean;
  data: Background; // 백엔드가 background 객체를 직접 반환
}
