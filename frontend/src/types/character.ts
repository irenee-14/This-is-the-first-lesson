export interface Character {
  characterId: string;
  writerId: string;
  writerName: string;
  name: string;
  characterImg: string;
  traits: string;
  personality: string;
  dialogueStyle: string;
  gender: "male" | "female" | "other";
  description: string;
  writerNote: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CharacterListResponse {
  success: boolean;
  data: {
    characters: Character[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}
