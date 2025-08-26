/*
  Warnings:

  - You are about to drop the column `version` on the `background_flows` table. All the data in the column will be lost.
  - You are about to drop the column `writerId` on the `background_flows` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundId` on the `background_steps` table. All the data in the column will be lost.
  - You are about to drop the column `flowId` on the `background_steps` table. All the data in the column will be lost.
  - You are about to drop the column `orderKey` on the `background_steps` table. All the data in the column will be lost.
  - The primary key for the `background_tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `backgroundId` on the `background_tags` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `background_tags` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `introDescription` on the `backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `introTitle` on the `backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `prompt` on the `backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `unlockChatCount` on the `backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `writerId` on the `backgrounds` table. All the data in the column will be lost.
  - The primary key for the `character_tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `characterId` on the `character_tags` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `character_tags` table. All the data in the column will be lost.
  - You are about to drop the column `characterImg` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `dialogueStyle` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `personality` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `traits` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `writerId` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `writerNote` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundId` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `characterId` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `chatCount` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `personalId` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `storyId` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `characterId` on the `memories` table. All the data in the column will be lost.
  - You are about to drop the column `maxPieceCount` on the `memories` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `memories` table. All the data in the column will be lost.
  - You are about to drop the column `characterId` on the `memory_pieces` table. All the data in the column will be lost.
  - You are about to drop the column `chatId` on the `memory_pieces` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `memory_pieces` table. All the data in the column will be lost.
  - You are about to drop the column `endMessageId` on the `memory_pieces` table. All the data in the column will be lost.
  - You are about to drop the column `memoryId` on the `memory_pieces` table. All the data in the column will be lost.
  - You are about to drop the column `startMessageId` on the `memory_pieces` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `memory_pieces` table. All the data in the column will be lost.
  - The primary key for the `messages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `backgroundId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `characterId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `chatId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `contents` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `messagesId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `seq` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundId` on the `open_backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `flowId` on the `open_backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `openedAt` on the `open_backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `open_backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `writerId` on the `open_backgrounds` table. All the data in the column will be lost.
  - The primary key for the `personas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `gender` on the `personas` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `personas` table. All the data in the column will be lost.
  - You are about to drop the column `personalId` on the `personas` table. All the data in the column will be lost.
  - You are about to drop the column `prompt` on the `personas` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `personas` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundId` on the `stories` table. All the data in the column will be lost.
  - You are about to drop the column `basic` on the `stories` table. All the data in the column will be lost.
  - You are about to drop the column `characterId` on the `stories` table. All the data in the column will be lost.
  - You are about to drop the column `characterPrompt` on the `stories` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `stories` table. All the data in the column will be lost.
  - You are about to drop the column `opening` on the `stories` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `stories` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `tags` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `follower` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `following` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `totalChat` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[이름]` on the table `characters` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[메모리 id]` on the table `memory_pieces` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[태그 이름]` on the table `tags` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[이름]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[이메일]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `버전` to the `background_flows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `작가 id` to the `background_flows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `배경 id` to the `background_steps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `순서` to the `background_steps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `플로우` to the `background_steps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `배경 id` to the `background_tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `태그 id` to the `background_tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `도입부 서술` to the `backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `도입부 제목` to the `backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `배경 설정` to the `backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `배경 소개` to the `backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `배경 이름` to the `backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `작가 id` to the `backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `캐릭터 id` to the `character_tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `태그 id` to the `character_tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `말투` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `성별` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `소개` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `외모 및 성격` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `이름` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `작가 id` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `특징` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `대화 소유자` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `배경id` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `수정 일자` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `작품 id` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `채팅 수` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `캐릭터id` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `페르소나id` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `캐릭터` to the `memories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `끝 메세지 id` to the `memory_pieces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `메모리 id` to the `memory_pieces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `시작 메세지 id` to the `memory_pieces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `채팅id` to the `memory_pieces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `캐릭터 id` to the `memory_pieces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `내용` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `대화ID` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `발신자 역할` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `배경 id` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `캐릭터 id` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `배경 id` to the `open_backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `배경 플로우 id` to the `open_backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `유저id` to the `open_backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `작가 id` to the `open_backgrounds` table without a default value. This is not possible if the table is not empty.
  - The required column `personaId` was added to the `personas` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `설명 프롬프트` to the `personas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `성별` to the `personas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `유저id` to the `personas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `이름` to the `personas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `기본 작품여부` to the `stories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `배경` to the `stories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `시작 상황` to the `stories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `작품이름` to the `stories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `제작자id` to the `stories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `캐릭터` to the `stories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `캐릭터 소개` to the `stories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `태그 이름` to the `tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `비밀번호` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `이름` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `이메일` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('male', 'female', 'undisclosed');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('character', 'persona');

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
ALTER TABLE "public"."chats" DROP CONSTRAINT "chats_personalId_fkey";

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
ALTER TABLE "public"."personas" DROP CONSTRAINT "personas_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."stories" DROP CONSTRAINT "stories_backgroundId_fkey";

-- DropForeignKey
ALTER TABLE "public"."stories" DROP CONSTRAINT "stories_characterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."stories" DROP CONSTRAINT "stories_userId_fkey";

-- DropIndex
DROP INDEX "public"."personas_userId_key";

-- DropIndex
DROP INDEX "public"."users_email_key";

-- AlterTable
ALTER TABLE "public"."background_flows" DROP COLUMN "version",
DROP COLUMN "writerId",
ADD COLUMN     "버전" INTEGER NOT NULL,
ADD COLUMN     "작가 id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."background_steps" DROP COLUMN "backgroundId",
DROP COLUMN "flowId",
DROP COLUMN "orderKey",
ADD COLUMN     "배경 id" TEXT NOT NULL,
ADD COLUMN     "순서" INTEGER NOT NULL,
ADD COLUMN     "플로우" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."background_tags" DROP CONSTRAINT "background_tags_pkey",
DROP COLUMN "backgroundId",
DROP COLUMN "tagId",
ADD COLUMN     "배경 id" TEXT NOT NULL,
ADD COLUMN     "태그 id" TEXT NOT NULL,
ADD CONSTRAINT "background_tags_pkey" PRIMARY KEY ("태그 id", "배경 id");

-- AlterTable
ALTER TABLE "public"."backgrounds" DROP COLUMN "avatarUrl",
DROP COLUMN "description",
DROP COLUMN "introDescription",
DROP COLUMN "introTitle",
DROP COLUMN "name",
DROP COLUMN "prompt",
DROP COLUMN "tags",
DROP COLUMN "unlockChatCount",
DROP COLUMN "writerId",
ADD COLUMN     "도입부 서술" TEXT NOT NULL,
ADD COLUMN     "도입부 제목" VARCHAR(255) NOT NULL,
ADD COLUMN     "배경 설정" TEXT NOT NULL,
ADD COLUMN     "배경 소개" TEXT NOT NULL,
ADD COLUMN     "배경 이름" VARCHAR(255) NOT NULL,
ADD COLUMN     "사진" VARCHAR(255) DEFAULT 'IMAGE',
ADD COLUMN     "작가 id" TEXT NOT NULL,
ADD COLUMN     "태그" TEXT[],
ADD COLUMN     "해금 조건(채팅수)" BIGINT NOT NULL DEFAULT 100;

-- AlterTable
ALTER TABLE "public"."character_tags" DROP CONSTRAINT "character_tags_pkey",
DROP COLUMN "characterId",
DROP COLUMN "tagId",
ADD COLUMN     "캐릭터 id" TEXT NOT NULL,
ADD COLUMN     "태그 id" TEXT NOT NULL,
ADD CONSTRAINT "character_tags_pkey" PRIMARY KEY ("태그 id", "캐릭터 id");

-- AlterTable
ALTER TABLE "public"."characters" DROP COLUMN "characterImg",
DROP COLUMN "description",
DROP COLUMN "dialogueStyle",
DROP COLUMN "gender",
DROP COLUMN "name",
DROP COLUMN "personality",
DROP COLUMN "tags",
DROP COLUMN "traits",
DROP COLUMN "writerId",
DROP COLUMN "writerNote",
ADD COLUMN     "말투" TEXT NOT NULL,
ADD COLUMN     "성별" "public"."Gender" NOT NULL,
ADD COLUMN     "소개" TEXT NOT NULL,
ADD COLUMN     "외모 및 성격" TEXT NOT NULL,
ADD COLUMN     "이름" VARCHAR(30) NOT NULL,
ADD COLUMN     "이미지" VARCHAR(255) DEFAULT 'IMAGE',
ADD COLUMN     "작가 id" TEXT NOT NULL,
ADD COLUMN     "작가의 말" TEXT,
ADD COLUMN     "특징" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."chats" DROP COLUMN "backgroundId",
DROP COLUMN "characterId",
DROP COLUMN "chatCount",
DROP COLUMN "createdAt",
DROP COLUMN "ownerId",
DROP COLUMN "personalId",
DROP COLUMN "storyId",
DROP COLUMN "updatedAt",
ADD COLUMN     "대화 소유자" TEXT NOT NULL,
ADD COLUMN     "배경id" TEXT NOT NULL,
ADD COLUMN     "생성일자" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "수정 일자" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "작품 id" TEXT NOT NULL,
ADD COLUMN     "채팅 수" BIGINT NOT NULL,
ADD COLUMN     "캐릭터id" TEXT NOT NULL,
ADD COLUMN     "페르소나id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."memories" DROP COLUMN "characterId",
DROP COLUMN "maxPieceCount",
DROP COLUMN "userId",
ADD COLUMN     "유저 id" TEXT,
ADD COLUMN     "최대 저장 개수" INTEGER NOT NULL DEFAULT 30,
ADD COLUMN     "캐릭터" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."memory_pieces" DROP COLUMN "characterId",
DROP COLUMN "chatId",
DROP COLUMN "createdAt",
DROP COLUMN "endMessageId",
DROP COLUMN "memoryId",
DROP COLUMN "startMessageId",
DROP COLUMN "summary",
ADD COLUMN     "끝 메세지 id" TEXT NOT NULL,
ADD COLUMN     "메모리 id" TEXT NOT NULL,
ADD COLUMN     "생성 시간" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "시작 메세지 id" TEXT NOT NULL,
ADD COLUMN     "채팅id" TEXT NOT NULL,
ADD COLUMN     "캐릭터 id" TEXT NOT NULL,
ADD COLUMN     "한줄요약" VARCHAR(1000);

-- AlterTable
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_pkey",
DROP COLUMN "backgroundId",
DROP COLUMN "characterId",
DROP COLUMN "chatId",
DROP COLUMN "contents",
DROP COLUMN "createdAt",
DROP COLUMN "messagesId",
DROP COLUMN "role",
DROP COLUMN "seq",
ADD COLUMN     "내용" TEXT NOT NULL,
ADD COLUMN     "대화ID" TEXT NOT NULL,
ADD COLUMN     "메세지 순서" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "발신자 역할" "public"."Role" NOT NULL,
ADD COLUMN     "배경 id" TEXT NOT NULL,
ADD COLUMN     "생성일자" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "캐릭터 id" TEXT NOT NULL,
ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("대화ID", "메세지 순서");

-- AlterTable
ALTER TABLE "public"."open_backgrounds" DROP COLUMN "backgroundId",
DROP COLUMN "flowId",
DROP COLUMN "openedAt",
DROP COLUMN "userId",
DROP COLUMN "writerId",
ADD COLUMN     "배경 id" TEXT NOT NULL,
ADD COLUMN     "배경 플로우 id" TEXT NOT NULL,
ADD COLUMN     "오픈된 시간" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "유저id" TEXT NOT NULL,
ADD COLUMN     "작가 id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."personas" DROP CONSTRAINT "personas_pkey",
DROP COLUMN "gender",
DROP COLUMN "name",
DROP COLUMN "personalId",
DROP COLUMN "prompt",
DROP COLUMN "userId",
ADD COLUMN     "personaId" TEXT NOT NULL,
ADD COLUMN     "설명 프롬프트" TEXT NOT NULL,
ADD COLUMN     "성별" "public"."Gender" NOT NULL,
ADD COLUMN     "유저id" TEXT NOT NULL,
ADD COLUMN     "이름" VARCHAR(30) NOT NULL,
ADD CONSTRAINT "personas_pkey" PRIMARY KEY ("personaId");

-- AlterTable
ALTER TABLE "public"."stories" DROP COLUMN "backgroundId",
DROP COLUMN "basic",
DROP COLUMN "characterId",
DROP COLUMN "characterPrompt",
DROP COLUMN "name",
DROP COLUMN "opening",
DROP COLUMN "userId",
ADD COLUMN     "기본 작품여부" BOOLEAN NOT NULL,
ADD COLUMN     "배경" TEXT NOT NULL,
ADD COLUMN     "시작 상황" TEXT NOT NULL,
ADD COLUMN     "작품이름" VARCHAR(255) NOT NULL,
ADD COLUMN     "제작자id" TEXT NOT NULL,
ADD COLUMN     "캐릭터" TEXT NOT NULL,
ADD COLUMN     "캐릭터 소개" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."tags" DROP COLUMN "name",
ADD COLUMN     "태그 이름" VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "bio",
DROP COLUMN "email",
DROP COLUMN "follower",
DROP COLUMN "following",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "totalChat",
ADD COLUMN     "비밀번호" VARCHAR(255) NOT NULL,
ADD COLUMN     "소개말" VARCHAR(255),
ADD COLUMN     "이름" VARCHAR(30) NOT NULL,
ADD COLUMN     "이메일" VARCHAR(255) NOT NULL,
ADD COLUMN     "총대화량" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "팔로워" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "팔로잉" BIGINT NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "background_tags_태그 id_idx" ON "public"."background_tags"("태그 id");

-- CreateIndex
CREATE INDEX "background_tags_배경 id_idx" ON "public"."background_tags"("배경 id");

-- CreateIndex
CREATE INDEX "backgrounds_작가 id_idx" ON "public"."backgrounds"("작가 id");

-- CreateIndex
CREATE INDEX "character_tags_태그 id_idx" ON "public"."character_tags"("태그 id");

-- CreateIndex
CREATE INDEX "character_tags_캐릭터 id_idx" ON "public"."character_tags"("캐릭터 id");

-- CreateIndex
CREATE UNIQUE INDEX "characters_이름_key" ON "public"."characters"("이름");

-- CreateIndex
CREATE INDEX "characters_작가 id_idx" ON "public"."characters"("작가 id");

-- CreateIndex
CREATE UNIQUE INDEX "memory_pieces_메모리 id_key" ON "public"."memory_pieces"("메모리 id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_태그 이름_key" ON "public"."tags"("태그 이름");

-- CreateIndex
CREATE UNIQUE INDEX "users_이름_key" ON "public"."users"("이름");

-- CreateIndex
CREATE UNIQUE INDEX "users_이메일_key" ON "public"."users"("이메일");

-- AddForeignKey
ALTER TABLE "public"."character_tags" ADD CONSTRAINT "character_tags_태그 id_fkey" FOREIGN KEY ("태그 id") REFERENCES "public"."tags"("tagId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."character_tags" ADD CONSTRAINT "character_tags_캐릭터 id_fkey" FOREIGN KEY ("캐릭터 id") REFERENCES "public"."characters"("characterId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_tags" ADD CONSTRAINT "background_tags_태그 id_fkey" FOREIGN KEY ("태그 id") REFERENCES "public"."tags"("tagId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_tags" ADD CONSTRAINT "background_tags_배경 id_fkey" FOREIGN KEY ("배경 id") REFERENCES "public"."backgrounds"("backgroundId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."characters" ADD CONSTRAINT "characters_작가 id_fkey" FOREIGN KEY ("작가 id") REFERENCES "public"."users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."backgrounds" ADD CONSTRAINT "backgrounds_작가 id_fkey" FOREIGN KEY ("작가 id") REFERENCES "public"."users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."open_backgrounds" ADD CONSTRAINT "open_backgrounds_유저id_fkey" FOREIGN KEY ("유저id") REFERENCES "public"."users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."open_backgrounds" ADD CONSTRAINT "open_backgrounds_배경 id_fkey" FOREIGN KEY ("배경 id") REFERENCES "public"."backgrounds"("backgroundId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."open_backgrounds" ADD CONSTRAINT "open_backgrounds_작가 id_fkey" FOREIGN KEY ("작가 id") REFERENCES "public"."users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."open_backgrounds" ADD CONSTRAINT "open_backgrounds_배경 플로우 id_fkey" FOREIGN KEY ("배경 플로우 id") REFERENCES "public"."background_flows"("flowId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_flows" ADD CONSTRAINT "background_flows_작가 id_fkey" FOREIGN KEY ("작가 id") REFERENCES "public"."users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_steps" ADD CONSTRAINT "background_steps_플로우_fkey" FOREIGN KEY ("플로우") REFERENCES "public"."background_flows"("flowId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_steps" ADD CONSTRAINT "background_steps_배경 id_fkey" FOREIGN KEY ("배경 id") REFERENCES "public"."backgrounds"("backgroundId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."personas" ADD CONSTRAINT "personas_유저id_fkey" FOREIGN KEY ("유저id") REFERENCES "public"."users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stories" ADD CONSTRAINT "stories_배경_fkey" FOREIGN KEY ("배경") REFERENCES "public"."backgrounds"("backgroundId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stories" ADD CONSTRAINT "stories_캐릭터_fkey" FOREIGN KEY ("캐릭터") REFERENCES "public"."characters"("characterId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stories" ADD CONSTRAINT "stories_제작자id_fkey" FOREIGN KEY ("제작자id") REFERENCES "public"."users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_배경id_fkey" FOREIGN KEY ("배경id") REFERENCES "public"."backgrounds"("backgroundId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_캐릭터id_fkey" FOREIGN KEY ("캐릭터id") REFERENCES "public"."characters"("characterId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_페르소나id_fkey" FOREIGN KEY ("페르소나id") REFERENCES "public"."personas"("personaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_작품 id_fkey" FOREIGN KEY ("작품 id") REFERENCES "public"."stories"("storyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_대화 소유자_fkey" FOREIGN KEY ("대화 소유자") REFERENCES "public"."users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memories" ADD CONSTRAINT "memories_캐릭터_fkey" FOREIGN KEY ("캐릭터") REFERENCES "public"."characters"("characterId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memories" ADD CONSTRAINT "memories_유저 id_fkey" FOREIGN KEY ("유저 id") REFERENCES "public"."users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memory_pieces" ADD CONSTRAINT "memory_pieces_메모리 id_fkey" FOREIGN KEY ("메모리 id") REFERENCES "public"."memories"("memoryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memory_pieces" ADD CONSTRAINT "memory_pieces_캐릭터 id_fkey" FOREIGN KEY ("캐릭터 id") REFERENCES "public"."characters"("characterId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memory_pieces" ADD CONSTRAINT "memory_pieces_채팅id_fkey" FOREIGN KEY ("채팅id") REFERENCES "public"."chats"("chatId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_배경 id_fkey" FOREIGN KEY ("배경 id") REFERENCES "public"."backgrounds"("backgroundId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_캐릭터 id_fkey" FOREIGN KEY ("캐릭터 id") REFERENCES "public"."characters"("characterId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_대화ID_fkey" FOREIGN KEY ("대화ID") REFERENCES "public"."chats"("chatId") ON DELETE CASCADE ON UPDATE CASCADE;
