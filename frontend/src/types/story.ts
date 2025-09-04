export type Flow = {
  id: string;
  title: string;
  characterName: string;
  backgroundName: string;
  imgUrl: string;
  tags: string[];
  description: string;
  dDay: number[] | null;
  isOpen: boolean;
};

export type Story = {
  storyId: string;
  name: string;
  characterId: string;
  characterName: string;
  backgroundId: string;
  backgroundName: string;
  writerId: string;
  basic: boolean;
  img: string;
  characterPrompt: string;
  opening: string;
  createdAt: string;
  updatedAt: string;
};

export type StoryResponse = {
  success: boolean;
  data: Flow | Flow[] | Story | Story[];
};
