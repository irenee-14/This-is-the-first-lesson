-- CreateTable
CREATE TABLE "public"."users" (
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "bio" TEXT,
    "following" INTEGER NOT NULL DEFAULT 0,
    "follower" INTEGER NOT NULL DEFAULT 0,
    "totalChat" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."personas" (
    "personalId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "gender" TEXT,
    "prompt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "personas_pkey" PRIMARY KEY ("personalId")
);

-- CreateTable
CREATE TABLE "public"."tags" (
    "tagId" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("tagId")
);

-- CreateTable
CREATE TABLE "public"."characters" (
    "characterId" TEXT NOT NULL,
    "writerId" TEXT NOT NULL,
    "name" TEXT,
    "characterImg" TEXT,
    "traits" TEXT,
    "personality" TEXT,
    "dialogueStyle" TEXT,
    "gender" TEXT,
    "description" TEXT,
    "writerNote" TEXT,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("characterId")
);

-- CreateTable
CREATE TABLE "public"."character_tags" (
    "tagId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,

    CONSTRAINT "character_tags_pkey" PRIMARY KEY ("tagId","characterId")
);

-- CreateTable
CREATE TABLE "public"."backgrounds" (
    "backgroundId" TEXT NOT NULL,
    "writerId" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "prompt" TEXT,
    "tags" TEXT[],
    "introTitle" TEXT,
    "introDescription" TEXT,
    "unlockChatCount" INTEGER,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "backgrounds_pkey" PRIMARY KEY ("backgroundId")
);

-- CreateTable
CREATE TABLE "public"."background_tags" (
    "tagId" TEXT NOT NULL,
    "backgroundId" TEXT NOT NULL,

    CONSTRAINT "background_tags_pkey" PRIMARY KEY ("tagId","backgroundId")
);

-- CreateTable
CREATE TABLE "public"."background_flows" (
    "flowId" TEXT NOT NULL,
    "writerId" TEXT NOT NULL,
    "version" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "background_flows_pkey" PRIMARY KEY ("flowId")
);

-- CreateTable
CREATE TABLE "public"."background_steps" (
    "stepId" TEXT NOT NULL,
    "flowId" TEXT NOT NULL,
    "backgroundId" TEXT NOT NULL,
    "orderKey" INTEGER,

    CONSTRAINT "background_steps_pkey" PRIMARY KEY ("stepId")
);

-- CreateTable
CREATE TABLE "public"."open_backgrounds" (
    "openId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "backgroundId" TEXT NOT NULL,
    "writerId" TEXT,
    "flowId" TEXT,
    "openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "open_backgrounds_pkey" PRIMARY KEY ("openId")
);

-- CreateTable
CREATE TABLE "public"."stories" (
    "storyId" TEXT NOT NULL,
    "backgroundId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT,
    "characterPrompt" TEXT,
    "basic" BOOLEAN NOT NULL DEFAULT false,
    "opening" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stories_pkey" PRIMARY KEY ("storyId")
);

-- CreateTable
CREATE TABLE "public"."chats" (
    "chatId" TEXT NOT NULL,
    "backgroundId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "personalId" TEXT NOT NULL,
    "chatCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("chatId")
);

-- CreateTable
CREATE TABLE "public"."memories" (
    "memoryId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "userId" TEXT,
    "maxPieceCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "memories_pkey" PRIMARY KEY ("memoryId")
);

-- CreateTable
CREATE TABLE "public"."memory_pieces" (
    "pieceId" TEXT NOT NULL,
    "memoryId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "chatId" TEXT,
    "startMessageId" TEXT,
    "endMessageId" TEXT,
    "summary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "memory_pieces_pkey" PRIMARY KEY ("pieceId")
);

-- CreateTable
CREATE TABLE "public"."messages" (
    "messagesId" TEXT NOT NULL,
    "backgroundId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "chatId" TEXT,
    "seq" INTEGER,
    "role" TEXT,
    "contents" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("messagesId")
);

-- CreateIndex
CREATE UNIQUE INDEX "personas_userId_key" ON "public"."personas"("userId");

-- AddForeignKey
ALTER TABLE "public"."personas" ADD CONSTRAINT "personas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."characters" ADD CONSTRAINT "characters_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "public"."users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."character_tags" ADD CONSTRAINT "character_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."tags"("tagId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."character_tags" ADD CONSTRAINT "character_tags_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."characters"("characterId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."backgrounds" ADD CONSTRAINT "backgrounds_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "public"."users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_tags" ADD CONSTRAINT "background_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."tags"("tagId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_tags" ADD CONSTRAINT "background_tags_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "public"."backgrounds"("backgroundId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_flows" ADD CONSTRAINT "background_flows_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "public"."users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_steps" ADD CONSTRAINT "background_steps_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "public"."background_flows"("flowId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_steps" ADD CONSTRAINT "background_steps_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "public"."backgrounds"("backgroundId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."open_backgrounds" ADD CONSTRAINT "open_backgrounds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."open_backgrounds" ADD CONSTRAINT "open_backgrounds_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "public"."backgrounds"("backgroundId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."open_backgrounds" ADD CONSTRAINT "open_backgrounds_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "public"."background_flows"("flowId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stories" ADD CONSTRAINT "stories_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "public"."backgrounds"("backgroundId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stories" ADD CONSTRAINT "stories_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."characters"("characterId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stories" ADD CONSTRAINT "stories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "public"."backgrounds"("backgroundId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."characters"("characterId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "public"."stories"("storyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "public"."personas"("personalId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memories" ADD CONSTRAINT "memories_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."characters"("characterId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memories" ADD CONSTRAINT "memories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memory_pieces" ADD CONSTRAINT "memory_pieces_memoryId_fkey" FOREIGN KEY ("memoryId") REFERENCES "public"."memories"("memoryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memory_pieces" ADD CONSTRAINT "memory_pieces_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."characters"("characterId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memory_pieces" ADD CONSTRAINT "memory_pieces_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."chats"("chatId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "public"."backgrounds"("backgroundId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."characters"("characterId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."chats"("chatId") ON DELETE SET NULL ON UPDATE CASCADE;
