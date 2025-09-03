export type Flow = {
  id: string;
  title: string;
  imgUrl: string;
  tags: string[];
  description: string;
  dDay: number[] | null;
  isOpen: boolean;
};

export type Story = {
  storyId: string;
  characterId: string;
  backgroundId: string;
  writerId: string;
  basic: boolean;
  characterPrompt: string;
  opening: string;
  createdAt: string;
  updatedAt: string;
};

export type StoryResponse = {
  success: boolean;
  data: Flow[] | Story | Story[];
};
