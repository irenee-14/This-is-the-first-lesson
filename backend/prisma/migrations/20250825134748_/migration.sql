/*
  Warnings:

  - The primary key for the `background_flows` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `flowId` on the `background_flows` table. All the data in the column will be lost.
  - You are about to drop the column `writerId` on the `background_flows` table. All the data in the column will be lost.
  - The primary key for the `background_steps` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `backgroundId` on the `background_steps` table. All the data in the column will be lost.
  - You are about to drop the column `flowId` on the `background_steps` table. All the data in the column will be lost.
  - You are about to drop the column `orderKey` on the `background_steps` table. All the data in the column will be lost.
  - You are about to drop the column `stepId` on the `background_steps` table. All the data in the column will be lost.
  - The primary key for the `background_tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `backgroundId` on the `background_tags` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `background_tags` table. All the data in the column will be lost.
  - The primary key for the `backgrounds` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `backgroundId` on the `backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundImg` on the `backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `introDescription` on the `backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `introTitle` on the `backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `unlockChatCount` on the `backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `writerId` on the `backgrounds` table. All the data in the column will be lost.
  - The primary key for the `character_tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `characterId` on the `character_tags` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `character_tags` table. All the data in the column will be lost.
  - The primary key for the `characters` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `characterId` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `characterImg` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `writerId` on the `characters` table. All the data in the column will be lost.
  - The primary key for the `chats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `backgroundId` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `characterId` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `chatCount` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `chatId` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `personaId` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `storyId` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `chats` table. All the data in the column will be lost.
  - The primary key for the `memories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `characterId` on the `memories` table. All the data in the column will be lost.
  - You are about to drop the column `maxPieceCount` on the `memories` table. All the data in the column will be lost.
  - You are about to drop the column `memoryId` on the `memories` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `memories` table. All the data in the column will be lost.
  - The primary key for the `memory_pieces` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `characterId` on the `memory_pieces` table. All the data in the column will be lost.
  - You are about to drop the column `chatId` on the `memory_pieces` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `memory_pieces` table. All the data in the column will be lost.
  - You are about to drop the column `endMessageId` on the `memory_pieces` table. All the data in the column will be lost.
  - You are about to drop the column `memoryId` on the `memory_pieces` table. All the data in the column will be lost.
  - You are about to drop the column `pieceId` on the `memory_pieces` table. All the data in the column will be lost.
  - You are about to drop the column `startMessageId` on the `memory_pieces` table. All the data in the column will be lost.
  - The primary key for the `messages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `backgroundId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `characterId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `chatId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `messages` table. All the data in the column will be lost.
  - The primary key for the `open_backgrounds` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `backgroundId` on the `open_backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `flowId` on the `open_backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `openId` on the `open_backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `openedAt` on the `open_backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `open_backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `writerId` on the `open_backgrounds` table. All the data in the column will be lost.
  - The primary key for the `personas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `personaId` on the `personas` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `personas` table. All the data in the column will be lost.
  - The primary key for the `stories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `backgroundId` on the `stories` table. All the data in the column will be lost.
  - You are about to drop the column `characterId` on the `stories` table. All the data in the column will be lost.
  - You are about to drop the column `characterPrompt` on the `stories` table. All the data in the column will be lost.
  - You are about to drop the column `storyId` on the `stories` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `stories` table. All the data in the column will be lost.
  - The primary key for the `tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tagId` on the `tags` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `totalChat` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[memory_id]` on the table `memory_pieces` will be added. If there are existing duplicate values, this will fail.
  - The required column `flow_id` was added to the `background_flows` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `writer_id` to the `background_flows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `background_id` to the `background_steps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flow_id` to the `background_steps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_key` to the `background_steps` table without a default value. This is not possible if the table is not empty.
  - The required column `step_id` was added to the `background_steps` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `background_id` to the `background_tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag_id` to the `background_tags` table without a default value. This is not possible if the table is not empty.
  - The required column `background_id` was added to the `backgrounds` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `intro_description` to the `backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intro_title` to the `backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `writer_id` to the `backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `character_id` to the `character_tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag_id` to the `character_tags` table without a default value. This is not possible if the table is not empty.
  - The required column `character_id` was added to the `characters` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `writer_id` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `background_id` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `character_id` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chat_count` to the `chats` table without a default value. This is not possible if the table is not empty.
  - The required column `chat_id` was added to the `chats` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `owner_id` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `persona_id` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `story_id` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `character_id` to the `memories` table without a default value. This is not possible if the table is not empty.
  - The required column `memory_id` was added to the `memories` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `character_id` to the `memory_pieces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chat_id` to the `memory_pieces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endMessage_id` to the `memory_pieces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memory_id` to the `memory_pieces` table without a default value. This is not possible if the table is not empty.
  - The required column `piece_id` was added to the `memory_pieces` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `startMessage_id` to the `memory_pieces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `background_id` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `character_id` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chat_id` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `background_id` to the `open_backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flow_id` to the `open_backgrounds` table without a default value. This is not possible if the table is not empty.
  - The required column `open_id` was added to the `open_backgrounds` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `user_id` to the `open_backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `writer_id` to the `open_backgrounds` table without a default value. This is not possible if the table is not empty.
  - The required column `persona_id` was added to the `personas` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `user_id` to the `personas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `background_id` to the `stories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `character_id` to the `stories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `character_prompt` to the `stories` table without a default value. This is not possible if the table is not empty.
  - The required column `story_id` was added to the `stories` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `user_id` to the `stories` table without a default value. This is not possible if the table is not empty.
  - The required column `tag_id` was added to the `tags` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `user_id` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "public"."background_flows" DROP CONSTRAINT "background_flows_writerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."background_steps" DROP CONSTRAINT "background_steps_backgroundId_fkey";

-- DropForeignKey
ALTER TABLE "public"."background_steps" DROP CONSTRAINT "background_steps_flowId_fkey";

-- DropForeignKey
ALTER TABLE "public"."background_tags" DROP CONSTRAINT "background_tags_backgroundId_fkey";

-- DropForeignKey
ALTER TABLE "public"."background_tags" DROP CONSTRAINT "background_tags_tagId_fkey";

-- DropForeignKey
ALTER TABLE "public"."backgrounds" DROP CONSTRAINT "backgrounds_writerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."character_tags" DROP CONSTRAINT "character_tags_characterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."character_tags" DROP CONSTRAINT "character_tags_tagId_fkey";

-- DropForeignKey
ALTER TABLE "public"."characters" DROP CONSTRAINT "characters_writerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."chats" DROP CONSTRAINT "chats_backgroundId_fkey";

-- DropForeignKey
ALTER TABLE "public"."chats" DROP CONSTRAINT "chats_characterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."chats" DROP CONSTRAINT "chats_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."chats" DROP CONSTRAINT "chats_personaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."chats" DROP CONSTRAINT "chats_storyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."memories" DROP CONSTRAINT "memories_characterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."memories" DROP CONSTRAINT "memories_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."memory_pieces" DROP CONSTRAINT "memory_pieces_characterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."memory_pieces" DROP CONSTRAINT "memory_pieces_chatId_fkey";

-- DropForeignKey
ALTER TABLE "public"."memory_pieces" DROP CONSTRAINT "memory_pieces_memoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_backgroundId_fkey";

-- DropForeignKey
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_characterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_chatId_fkey";

-- DropForeignKey
ALTER TABLE "public"."open_backgrounds" DROP CONSTRAINT "open_backgrounds_backgroundId_fkey";

-- DropForeignKey
ALTER TABLE "public"."open_backgrounds" DROP CONSTRAINT "open_backgrounds_flowId_fkey";

-- DropForeignKey
ALTER TABLE "public"."open_backgrounds" DROP CONSTRAINT "open_backgrounds_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."open_backgrounds" DROP CONSTRAINT "open_backgrounds_writerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."personas" DROP CONSTRAINT "personas_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."stories" DROP CONSTRAINT "stories_backgroundId_fkey";

-- DropForeignKey
ALTER TABLE "public"."stories" DROP CONSTRAINT "stories_characterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."stories" DROP CONSTRAINT "stories_userId_fkey";

-- DropIndex
DROP INDEX "public"."background_tags_backgroundId_idx";

-- DropIndex
DROP INDEX "public"."background_tags_tagId_idx";

-- DropIndex
DROP INDEX "public"."backgrounds_writerId_idx";

-- DropIndex
DROP INDEX "public"."character_tags_characterId_idx";

-- DropIndex
DROP INDEX "public"."character_tags_tagId_idx";

-- DropIndex
DROP INDEX "public"."characters_writerId_idx";

-- DropIndex
DROP INDEX "public"."memory_pieces_memoryId_key";

-- AlterTable
ALTER TABLE "public"."background_flows" DROP CONSTRAINT "background_flows_pkey",
DROP COLUMN "flowId",
DROP COLUMN "writerId",
ADD COLUMN     "flow_id" TEXT NOT NULL,
ADD COLUMN     "writer_id" TEXT NOT NULL,
ADD CONSTRAINT "background_flows_pkey" PRIMARY KEY ("flow_id");

-- AlterTable
ALTER TABLE "public"."background_steps" DROP CONSTRAINT "background_steps_pkey",
DROP COLUMN "backgroundId",
DROP COLUMN "flowId",
DROP COLUMN "orderKey",
DROP COLUMN "stepId",
ADD COLUMN     "background_id" TEXT NOT NULL,
ADD COLUMN     "flow_id" TEXT NOT NULL,
ADD COLUMN     "order_key" INTEGER NOT NULL,
ADD COLUMN     "step_id" TEXT NOT NULL,
ADD CONSTRAINT "background_steps_pkey" PRIMARY KEY ("step_id");

-- AlterTable
ALTER TABLE "public"."background_tags" DROP CONSTRAINT "background_tags_pkey",
DROP COLUMN "backgroundId",
DROP COLUMN "tagId",
ADD COLUMN     "background_id" TEXT NOT NULL,
ADD COLUMN     "tag_id" TEXT NOT NULL,
ADD CONSTRAINT "background_tags_pkey" PRIMARY KEY ("tag_id", "background_id");

-- AlterTable
ALTER TABLE "public"."backgrounds" DROP CONSTRAINT "backgrounds_pkey",
DROP COLUMN "backgroundId",
DROP COLUMN "backgroundImg",
DROP COLUMN "introDescription",
DROP COLUMN "introTitle",
DROP COLUMN "unlockChatCount",
DROP COLUMN "writerId",
ADD COLUMN     "background_id" TEXT NOT NULL,
ADD COLUMN     "background_img" VARCHAR(255) DEFAULT 'IMAGE',
ADD COLUMN     "intro_description" TEXT NOT NULL,
ADD COLUMN     "intro_title" VARCHAR(255) NOT NULL,
ADD COLUMN     "unlock_chat_count" BIGINT NOT NULL DEFAULT 100,
ADD COLUMN     "writer_id" TEXT NOT NULL,
ADD CONSTRAINT "backgrounds_pkey" PRIMARY KEY ("background_id");

-- AlterTable
ALTER TABLE "public"."character_tags" DROP CONSTRAINT "character_tags_pkey",
DROP COLUMN "characterId",
DROP COLUMN "tagId",
ADD COLUMN     "character_id" TEXT NOT NULL,
ADD COLUMN     "tag_id" TEXT NOT NULL,
ADD CONSTRAINT "character_tags_pkey" PRIMARY KEY ("tag_id", "character_id");

-- AlterTable
ALTER TABLE "public"."characters" DROP CONSTRAINT "characters_pkey",
DROP COLUMN "characterId",
DROP COLUMN "characterImg",
DROP COLUMN "writerId",
ADD COLUMN     "character_id" TEXT NOT NULL,
ADD COLUMN     "character_img" VARCHAR(255) DEFAULT 'IMAGE',
ADD COLUMN     "writer_id" TEXT NOT NULL,
ADD CONSTRAINT "characters_pkey" PRIMARY KEY ("character_id");

-- AlterTable
ALTER TABLE "public"."chats" DROP CONSTRAINT "chats_pkey",
DROP COLUMN "backgroundId",
DROP COLUMN "characterId",
DROP COLUMN "chatCount",
DROP COLUMN "chatId",
DROP COLUMN "createdAt",
DROP COLUMN "ownerId",
DROP COLUMN "personaId",
DROP COLUMN "storyId",
DROP COLUMN "updatedAt",
ADD COLUMN     "background_id" TEXT NOT NULL,
ADD COLUMN     "character_id" TEXT NOT NULL,
ADD COLUMN     "chat_count" BIGINT NOT NULL,
ADD COLUMN     "chat_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "owner_id" TEXT NOT NULL,
ADD COLUMN     "persona_id" TEXT NOT NULL,
ADD COLUMN     "story_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "chats_pkey" PRIMARY KEY ("chat_id");

-- AlterTable
ALTER TABLE "public"."memories" DROP CONSTRAINT "memories_pkey",
DROP COLUMN "characterId",
DROP COLUMN "maxPieceCount",
DROP COLUMN "memoryId",
DROP COLUMN "userId",
ADD COLUMN     "character_id" TEXT NOT NULL,
ADD COLUMN     "max_piece_count" INTEGER NOT NULL DEFAULT 30,
ADD COLUMN     "memory_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT,
ADD CONSTRAINT "memories_pkey" PRIMARY KEY ("memory_id");

-- AlterTable
ALTER TABLE "public"."memory_pieces" DROP CONSTRAINT "memory_pieces_pkey",
DROP COLUMN "characterId",
DROP COLUMN "chatId",
DROP COLUMN "createdAt",
DROP COLUMN "endMessageId",
DROP COLUMN "memoryId",
DROP COLUMN "pieceId",
DROP COLUMN "startMessageId",
ADD COLUMN     "character_id" TEXT NOT NULL,
ADD COLUMN     "chat_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endMessage_id" TEXT NOT NULL,
ADD COLUMN     "memory_id" TEXT NOT NULL,
ADD COLUMN     "piece_id" TEXT NOT NULL,
ADD COLUMN     "startMessage_id" TEXT NOT NULL,
ADD CONSTRAINT "memory_pieces_pkey" PRIMARY KEY ("piece_id");

-- AlterTable
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_pkey",
DROP COLUMN "backgroundId",
DROP COLUMN "characterId",
DROP COLUMN "chatId",
DROP COLUMN "createdAt",
ADD COLUMN     "background_id" TEXT NOT NULL,
ADD COLUMN     "character_id" TEXT NOT NULL,
ADD COLUMN     "chat_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("chat_id", "seq");

-- AlterTable
ALTER TABLE "public"."open_backgrounds" DROP CONSTRAINT "open_backgrounds_pkey",
DROP COLUMN "backgroundId",
DROP COLUMN "flowId",
DROP COLUMN "openId",
DROP COLUMN "openedAt",
DROP COLUMN "userId",
DROP COLUMN "writerId",
ADD COLUMN     "background_id" TEXT NOT NULL,
ADD COLUMN     "flow_id" TEXT NOT NULL,
ADD COLUMN     "open_id" TEXT NOT NULL,
ADD COLUMN     "opened_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD COLUMN     "writer_id" TEXT NOT NULL,
ADD CONSTRAINT "open_backgrounds_pkey" PRIMARY KEY ("open_id");

-- AlterTable
ALTER TABLE "public"."personas" DROP CONSTRAINT "personas_pkey",
DROP COLUMN "personaId",
DROP COLUMN "userId",
ADD COLUMN     "persona_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "personas_pkey" PRIMARY KEY ("persona_id");

-- AlterTable
ALTER TABLE "public"."stories" DROP CONSTRAINT "stories_pkey",
DROP COLUMN "backgroundId",
DROP COLUMN "characterId",
DROP COLUMN "characterPrompt",
DROP COLUMN "storyId",
DROP COLUMN "userId",
ADD COLUMN     "background_id" TEXT NOT NULL,
ADD COLUMN     "character_id" TEXT NOT NULL,
ADD COLUMN     "character_prompt" TEXT NOT NULL,
ADD COLUMN     "story_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "stories_pkey" PRIMARY KEY ("story_id");

-- AlterTable
ALTER TABLE "public"."tags" DROP CONSTRAINT "tags_pkey",
DROP COLUMN "tagId",
ADD COLUMN     "tag_id" TEXT NOT NULL,
ADD CONSTRAINT "tags_pkey" PRIMARY KEY ("tag_id");

-- AlterTable
ALTER TABLE "public"."users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "totalChat",
DROP COLUMN "userId",
ADD COLUMN     "total_chat" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("user_id");

-- CreateIndex
CREATE INDEX "background_tags_tag_id_idx" ON "public"."background_tags"("tag_id");

-- CreateIndex
CREATE INDEX "background_tags_background_id_idx" ON "public"."background_tags"("background_id");

-- CreateIndex
CREATE INDEX "backgrounds_writer_id_idx" ON "public"."backgrounds"("writer_id");

-- CreateIndex
CREATE INDEX "character_tags_tag_id_idx" ON "public"."character_tags"("tag_id");

-- CreateIndex
CREATE INDEX "character_tags_character_id_idx" ON "public"."character_tags"("character_id");

-- CreateIndex
CREATE INDEX "characters_writer_id_idx" ON "public"."characters"("writer_id");

-- CreateIndex
CREATE UNIQUE INDEX "memory_pieces_memory_id_key" ON "public"."memory_pieces"("memory_id");

-- AddForeignKey
ALTER TABLE "public"."character_tags" ADD CONSTRAINT "character_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."character_tags" ADD CONSTRAINT "character_tags_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("character_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_tags" ADD CONSTRAINT "background_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_tags" ADD CONSTRAINT "background_tags_background_id_fkey" FOREIGN KEY ("background_id") REFERENCES "public"."backgrounds"("background_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."characters" ADD CONSTRAINT "characters_writer_id_fkey" FOREIGN KEY ("writer_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."backgrounds" ADD CONSTRAINT "backgrounds_writer_id_fkey" FOREIGN KEY ("writer_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."open_backgrounds" ADD CONSTRAINT "open_backgrounds_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."open_backgrounds" ADD CONSTRAINT "open_backgrounds_background_id_fkey" FOREIGN KEY ("background_id") REFERENCES "public"."backgrounds"("background_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."open_backgrounds" ADD CONSTRAINT "open_backgrounds_writer_id_fkey" FOREIGN KEY ("writer_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."open_backgrounds" ADD CONSTRAINT "open_backgrounds_flow_id_fkey" FOREIGN KEY ("flow_id") REFERENCES "public"."background_flows"("flow_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_flows" ADD CONSTRAINT "background_flows_writer_id_fkey" FOREIGN KEY ("writer_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_steps" ADD CONSTRAINT "background_steps_flow_id_fkey" FOREIGN KEY ("flow_id") REFERENCES "public"."background_flows"("flow_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_steps" ADD CONSTRAINT "background_steps_background_id_fkey" FOREIGN KEY ("background_id") REFERENCES "public"."backgrounds"("background_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."personas" ADD CONSTRAINT "personas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stories" ADD CONSTRAINT "stories_background_id_fkey" FOREIGN KEY ("background_id") REFERENCES "public"."backgrounds"("background_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stories" ADD CONSTRAINT "stories_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("character_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stories" ADD CONSTRAINT "stories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_background_id_fkey" FOREIGN KEY ("background_id") REFERENCES "public"."backgrounds"("background_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("character_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "public"."personas"("persona_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("story_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memories" ADD CONSTRAINT "memories_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("character_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memories" ADD CONSTRAINT "memories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memory_pieces" ADD CONSTRAINT "memory_pieces_memory_id_fkey" FOREIGN KEY ("memory_id") REFERENCES "public"."memories"("memory_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memory_pieces" ADD CONSTRAINT "memory_pieces_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("character_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memory_pieces" ADD CONSTRAINT "memory_pieces_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("chat_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_background_id_fkey" FOREIGN KEY ("background_id") REFERENCES "public"."backgrounds"("background_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("character_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("chat_id") ON DELETE CASCADE ON UPDATE CASCADE;
