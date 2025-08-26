/*
  Warnings:

  - You are about to drop the column `버전` on the `background_flows` table. All the data in the column will be lost.
  - You are about to drop the column `작가 id` on the `background_flows` table. All the data in the column will be lost.
  - You are about to drop the column `배경 id` on the `background_steps` table. All the data in the column will be lost.
  - You are about to drop the column `순서` on the `background_steps` table. All the data in the column will be lost.
  - You are about to drop the column `플로우` on the `background_steps` table. All the data in the column will be lost.
  - The primary key for the `background_tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `배경 id` on the `background_tags` table. All the data in the column will be lost.
  - You are about to drop the column `태그 id` on the `background_tags` table. All the data in the column will be lost.
  - You are about to drop the column `도입부 서술` on the `backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `도입부 제목` on the `backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `배경 설정` on the `backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `배경 소개` on the `backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `배경 이름` on the `backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `사진` on the `backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `작가 id` on the `backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `태그` on the `backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `해금 조건(채팅수)` on the `backgrounds` table. All the data in the column will be lost.
  - The primary key for the `character_tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `캐릭터 id` on the `character_tags` table. All the data in the column will be lost.
  - You are about to drop the column `태그 id` on the `character_tags` table. All the data in the column will be lost.
  - You are about to drop the column `말투` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `성별` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `소개` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `외모 및 성격` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `이름` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `이미지` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `작가 id` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `작가의 말` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `특징` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `대화 소유자` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `배경id` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `생성일자` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `수정 일자` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `작품 id` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `채팅 수` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `캐릭터id` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `페르소나id` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `유저 id` on the `memories` table. All the data in the column will be lost.
  - You are about to drop the column `최대 저장 개수` on the `memories` table. All the data in the column will be lost.
  - You are about to drop the column `캐릭터` on the `memories` table. All the data in the column will be lost.
  - You are about to drop the column `끝 메세지 id` on the `memory_pieces` table. All the data in the column will be lost.
  - You are about to drop the column `메모리 id` on the `memory_pieces` table. All the data in the column will be lost.
  - You are about to drop the column `생성 시간` on the `memory_pieces` table. All the data in the column will be lost.
  - You are about to drop the column `시작 메세지 id` on the `memory_pieces` table. All the data in the column will be lost.
  - You are about to drop the column `채팅id` on the `memory_pieces` table. All the data in the column will be lost.
  - You are about to drop the column `캐릭터 id` on the `memory_pieces` table. All the data in the column will be lost.
  - You are about to drop the column `한줄요약` on the `memory_pieces` table. All the data in the column will be lost.
  - The primary key for the `messages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `내용` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `대화ID` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `메세지 순서` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `발신자 역할` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `배경 id` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `생성일자` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `캐릭터 id` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `배경 id` on the `open_backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `배경 플로우 id` on the `open_backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `오픈된 시간` on the `open_backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `유저id` on the `open_backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `작가 id` on the `open_backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `설명 프롬프트` on the `personas` table. All the data in the column will be lost.
  - You are about to drop the column `성별` on the `personas` table. All the data in the column will be lost.
  - You are about to drop the column `유저id` on the `personas` table. All the data in the column will be lost.
  - You are about to drop the column `이름` on the `personas` table. All the data in the column will be lost.
  - You are about to drop the column `기본 작품여부` on the `stories` table. All the data in the column will be lost.
  - You are about to drop the column `배경` on the `stories` table. All the data in the column will be lost.
  - You are about to drop the column `시작 상황` on the `stories` table. All the data in the column will be lost.
  - You are about to drop the column `작품이름` on the `stories` table. All the data in the column will be lost.
  - You are about to drop the column `제작자id` on the `stories` table. All the data in the column will be lost.
  - You are about to drop the column `캐릭터` on the `stories` table. All the data in the column will be lost.
  - You are about to drop the column `캐릭터 소개` on the `stories` table. All the data in the column will be lost.
  - You are about to drop the column `태그 이름` on the `tags` table. All the data in the column will be lost.
  - You are about to drop the column `비밀번호` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `소개말` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `이름` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `이메일` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `총대화량` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `팔로워` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `팔로잉` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `characters` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[memoryId]` on the table `memory_pieces` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `tags` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `version` to the `background_flows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `writerId` to the `background_flows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `backgroundId` to the `background_steps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flowId` to the `background_steps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderKey` to the `background_steps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `backgroundId` to the `background_tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagId` to the `background_tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `introDescription` to the `backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `introTitle` to the `backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prompt` to the `backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `writerId` to the `backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characterId` to the `character_tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagId` to the `character_tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dialogueStyle` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personality` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `traits` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `writerId` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `backgroundId` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characterId` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chatCount` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personaId` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storyId` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characterId` to the `memories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characterId` to the `memory_pieces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chatId` to the `memory_pieces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endMessageId` to the `memory_pieces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memoryId` to the `memory_pieces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startMessageId` to the `memory_pieces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `backgroundId` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characterId` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chatId` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contents` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `backgroundId` to the `open_backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flowId` to the `open_backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `open_backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `writerId` to the `open_backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `personas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `personas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prompt` to the `personas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `personas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `backgroundId` to the `stories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `basic` to the `stories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characterId` to the `stories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characterPrompt` to the `stories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `stories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opening` to the `stories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `stories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."background_flows" DROP CONSTRAINT "background_flows_작가 id_fkey";

-- DropForeignKey
ALTER TABLE "public"."background_steps" DROP CONSTRAINT "background_steps_배경 id_fkey";

-- DropForeignKey
ALTER TABLE "public"."background_steps" DROP CONSTRAINT "background_steps_플로우_fkey";

-- DropForeignKey
ALTER TABLE "public"."background_tags" DROP CONSTRAINT "background_tags_배경 id_fkey";

-- DropForeignKey
ALTER TABLE "public"."background_tags" DROP CONSTRAINT "background_tags_태그 id_fkey";

-- DropForeignKey
ALTER TABLE "public"."backgrounds" DROP CONSTRAINT "backgrounds_작가 id_fkey";

-- DropForeignKey
ALTER TABLE "public"."character_tags" DROP CONSTRAINT "character_tags_캐릭터 id_fkey";

-- DropForeignKey
ALTER TABLE "public"."character_tags" DROP CONSTRAINT "character_tags_태그 id_fkey";

-- DropForeignKey
ALTER TABLE "public"."characters" DROP CONSTRAINT "characters_작가 id_fkey";

-- DropForeignKey
ALTER TABLE "public"."chats" DROP CONSTRAINT "chats_대화 소유자_fkey";

-- DropForeignKey
ALTER TABLE "public"."chats" DROP CONSTRAINT "chats_배경id_fkey";

-- DropForeignKey
ALTER TABLE "public"."chats" DROP CONSTRAINT "chats_작품 id_fkey";

-- DropForeignKey
ALTER TABLE "public"."chats" DROP CONSTRAINT "chats_캐릭터id_fkey";

-- DropForeignKey
ALTER TABLE "public"."chats" DROP CONSTRAINT "chats_페르소나id_fkey";

-- DropForeignKey
ALTER TABLE "public"."memories" DROP CONSTRAINT "memories_유저 id_fkey";

-- DropForeignKey
ALTER TABLE "public"."memories" DROP CONSTRAINT "memories_캐릭터_fkey";

-- DropForeignKey
ALTER TABLE "public"."memory_pieces" DROP CONSTRAINT "memory_pieces_메모리 id_fkey";

-- DropForeignKey
ALTER TABLE "public"."memory_pieces" DROP CONSTRAINT "memory_pieces_채팅id_fkey";

-- DropForeignKey
ALTER TABLE "public"."memory_pieces" DROP CONSTRAINT "memory_pieces_캐릭터 id_fkey";

-- DropForeignKey
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_대화ID_fkey";

-- DropForeignKey
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_배경 id_fkey";

-- DropForeignKey
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_캐릭터 id_fkey";

-- DropForeignKey
ALTER TABLE "public"."open_backgrounds" DROP CONSTRAINT "open_backgrounds_배경 id_fkey";

-- DropForeignKey
ALTER TABLE "public"."open_backgrounds" DROP CONSTRAINT "open_backgrounds_배경 플로우 id_fkey";

-- DropForeignKey
ALTER TABLE "public"."open_backgrounds" DROP CONSTRAINT "open_backgrounds_유저id_fkey";

-- DropForeignKey
ALTER TABLE "public"."open_backgrounds" DROP CONSTRAINT "open_backgrounds_작가 id_fkey";

-- DropForeignKey
ALTER TABLE "public"."personas" DROP CONSTRAINT "personas_유저id_fkey";

-- DropForeignKey
ALTER TABLE "public"."stories" DROP CONSTRAINT "stories_배경_fkey";

-- DropForeignKey
ALTER TABLE "public"."stories" DROP CONSTRAINT "stories_제작자id_fkey";

-- DropForeignKey
ALTER TABLE "public"."stories" DROP CONSTRAINT "stories_캐릭터_fkey";

-- DropIndex
DROP INDEX "public"."background_tags_배경 id_idx";

-- DropIndex
DROP INDEX "public"."background_tags_태그 id_idx";

-- DropIndex
DROP INDEX "public"."backgrounds_작가 id_idx";

-- DropIndex
DROP INDEX "public"."character_tags_캐릭터 id_idx";

-- DropIndex
DROP INDEX "public"."character_tags_태그 id_idx";

-- DropIndex
DROP INDEX "public"."characters_이름_key";

-- DropIndex
DROP INDEX "public"."characters_작가 id_idx";

-- DropIndex
DROP INDEX "public"."memory_pieces_메모리 id_key";

-- DropIndex
DROP INDEX "public"."tags_태그 이름_key";

-- DropIndex
DROP INDEX "public"."users_이름_key";

-- DropIndex
DROP INDEX "public"."users_이메일_key";

-- AlterTable
ALTER TABLE "public"."background_flows" DROP COLUMN "버전",
DROP COLUMN "작가 id",
ADD COLUMN     "version" INTEGER NOT NULL,
ADD COLUMN     "writerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."background_steps" DROP COLUMN "배경 id",
DROP COLUMN "순서",
DROP COLUMN "플로우",
ADD COLUMN     "backgroundId" TEXT NOT NULL,
ADD COLUMN     "flowId" TEXT NOT NULL,
ADD COLUMN     "orderKey" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."background_tags" DROP CONSTRAINT "background_tags_pkey",
DROP COLUMN "배경 id",
DROP COLUMN "태그 id",
ADD COLUMN     "backgroundId" TEXT NOT NULL,
ADD COLUMN     "tagId" TEXT NOT NULL,
ADD CONSTRAINT "background_tags_pkey" PRIMARY KEY ("tagId", "backgroundId");

-- AlterTable
ALTER TABLE "public"."backgrounds" DROP COLUMN "도입부 서술",
DROP COLUMN "도입부 제목",
DROP COLUMN "배경 설정",
DROP COLUMN "배경 소개",
DROP COLUMN "배경 이름",
DROP COLUMN "사진",
DROP COLUMN "작가 id",
DROP COLUMN "태그",
DROP COLUMN "해금 조건(채팅수)",
ADD COLUMN     "backgroundImg" VARCHAR(255) DEFAULT 'IMAGE',
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "introDescription" TEXT NOT NULL,
ADD COLUMN     "introTitle" VARCHAR(255) NOT NULL,
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "prompt" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "unlockChatCount" BIGINT NOT NULL DEFAULT 100,
ADD COLUMN     "writerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."character_tags" DROP CONSTRAINT "character_tags_pkey",
DROP COLUMN "캐릭터 id",
DROP COLUMN "태그 id",
ADD COLUMN     "characterId" TEXT NOT NULL,
ADD COLUMN     "tagId" TEXT NOT NULL,
ADD CONSTRAINT "character_tags_pkey" PRIMARY KEY ("tagId", "characterId");

-- AlterTable
ALTER TABLE "public"."characters" DROP COLUMN "말투",
DROP COLUMN "성별",
DROP COLUMN "소개",
DROP COLUMN "외모 및 성격",
DROP COLUMN "이름",
DROP COLUMN "이미지",
DROP COLUMN "작가 id",
DROP COLUMN "작가의 말",
DROP COLUMN "특징",
ADD COLUMN     "characterImg" VARCHAR(255) DEFAULT 'IMAGE',
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "dialogueStyle" TEXT NOT NULL,
ADD COLUMN     "gender" "public"."Gender" NOT NULL,
ADD COLUMN     "name" VARCHAR(30) NOT NULL,
ADD COLUMN     "personality" TEXT NOT NULL,
ADD COLUMN     "traits" TEXT NOT NULL,
ADD COLUMN     "writerId" TEXT NOT NULL,
ADD COLUMN     "writerNote" TEXT;

-- AlterTable
ALTER TABLE "public"."chats" DROP COLUMN "대화 소유자",
DROP COLUMN "배경id",
DROP COLUMN "생성일자",
DROP COLUMN "수정 일자",
DROP COLUMN "작품 id",
DROP COLUMN "채팅 수",
DROP COLUMN "캐릭터id",
DROP COLUMN "페르소나id",
ADD COLUMN     "backgroundId" TEXT NOT NULL,
ADD COLUMN     "characterId" TEXT NOT NULL,
ADD COLUMN     "chatCount" BIGINT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "personaId" TEXT NOT NULL,
ADD COLUMN     "storyId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."memories" DROP COLUMN "유저 id",
DROP COLUMN "최대 저장 개수",
DROP COLUMN "캐릭터",
ADD COLUMN     "characterId" TEXT NOT NULL,
ADD COLUMN     "maxPieceCount" INTEGER NOT NULL DEFAULT 30,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "public"."memory_pieces" DROP COLUMN "끝 메세지 id",
DROP COLUMN "메모리 id",
DROP COLUMN "생성 시간",
DROP COLUMN "시작 메세지 id",
DROP COLUMN "채팅id",
DROP COLUMN "캐릭터 id",
DROP COLUMN "한줄요약",
ADD COLUMN     "characterId" TEXT NOT NULL,
ADD COLUMN     "chatId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endMessageId" TEXT NOT NULL,
ADD COLUMN     "memoryId" TEXT NOT NULL,
ADD COLUMN     "startMessageId" TEXT NOT NULL,
ADD COLUMN     "summary" VARCHAR(1000);

-- AlterTable
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_pkey",
DROP COLUMN "내용",
DROP COLUMN "대화ID",
DROP COLUMN "메세지 순서",
DROP COLUMN "발신자 역할",
DROP COLUMN "배경 id",
DROP COLUMN "생성일자",
DROP COLUMN "캐릭터 id",
ADD COLUMN     "backgroundId" TEXT NOT NULL,
ADD COLUMN     "characterId" TEXT NOT NULL,
ADD COLUMN     "chatId" TEXT NOT NULL,
ADD COLUMN     "contents" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "public"."Role" NOT NULL,
ADD COLUMN     "seq" INTEGER NOT NULL DEFAULT 0,
ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("chatId", "seq");

-- AlterTable
ALTER TABLE "public"."open_backgrounds" DROP COLUMN "배경 id",
DROP COLUMN "배경 플로우 id",
DROP COLUMN "오픈된 시간",
DROP COLUMN "유저id",
DROP COLUMN "작가 id",
ADD COLUMN     "backgroundId" TEXT NOT NULL,
ADD COLUMN     "flowId" TEXT NOT NULL,
ADD COLUMN     "openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "writerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."personas" DROP COLUMN "설명 프롬프트",
DROP COLUMN "성별",
DROP COLUMN "유저id",
DROP COLUMN "이름",
ADD COLUMN     "gender" "public"."Gender" NOT NULL,
ADD COLUMN     "name" VARCHAR(30) NOT NULL,
ADD COLUMN     "prompt" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."stories" DROP COLUMN "기본 작품여부",
DROP COLUMN "배경",
DROP COLUMN "시작 상황",
DROP COLUMN "작품이름",
DROP COLUMN "제작자id",
DROP COLUMN "캐릭터",
DROP COLUMN "캐릭터 소개",
ADD COLUMN     "backgroundId" TEXT NOT NULL,
ADD COLUMN     "basic" BOOLEAN NOT NULL,
ADD COLUMN     "characterId" TEXT NOT NULL,
ADD COLUMN     "characterPrompt" TEXT NOT NULL,
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "opening" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."tags" DROP COLUMN "태그 이름",
ADD COLUMN     "name" VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "비밀번호",
DROP COLUMN "소개말",
DROP COLUMN "이름",
DROP COLUMN "이메일",
DROP COLUMN "총대화량",
DROP COLUMN "팔로워",
DROP COLUMN "팔로잉",
ADD COLUMN     "bio" VARCHAR(255),
ADD COLUMN     "email" VARCHAR(255) NOT NULL,
ADD COLUMN     "follower" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "following" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "name" VARCHAR(30) NOT NULL,
ADD COLUMN     "password" VARCHAR(255) NOT NULL,
ADD COLUMN     "totalChat" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "background_tags_tagId_idx" ON "public"."background_tags"("tagId");

-- CreateIndex
CREATE INDEX "background_tags_backgroundId_idx" ON "public"."background_tags"("backgroundId");

-- CreateIndex
CREATE INDEX "backgrounds_writerId_idx" ON "public"."backgrounds"("writerId");

-- CreateIndex
CREATE INDEX "character_tags_tagId_idx" ON "public"."character_tags"("tagId");

-- CreateIndex
CREATE INDEX "character_tags_characterId_idx" ON "public"."character_tags"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "characters_name_key" ON "public"."characters"("name");

-- CreateIndex
CREATE INDEX "characters_writerId_idx" ON "public"."characters"("writerId");

-- CreateIndex
CREATE UNIQUE INDEX "memory_pieces_memoryId_key" ON "public"."memory_pieces"("memoryId");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "public"."tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "public"."users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."character_tags" ADD CONSTRAINT "character_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."tags"("tagId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."character_tags" ADD CONSTRAINT "character_tags_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."characters"("characterId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_tags" ADD CONSTRAINT "background_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."tags"("tagId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_tags" ADD CONSTRAINT "background_tags_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "public"."backgrounds"("backgroundId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."characters" ADD CONSTRAINT "characters_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "public"."users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."backgrounds" ADD CONSTRAINT "backgrounds_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "public"."users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."open_backgrounds" ADD CONSTRAINT "open_backgrounds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."open_backgrounds" ADD CONSTRAINT "open_backgrounds_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "public"."backgrounds"("backgroundId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."open_backgrounds" ADD CONSTRAINT "open_backgrounds_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "public"."users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."open_backgrounds" ADD CONSTRAINT "open_backgrounds_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "public"."background_flows"("flowId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_flows" ADD CONSTRAINT "background_flows_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "public"."users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_steps" ADD CONSTRAINT "background_steps_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "public"."background_flows"("flowId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_steps" ADD CONSTRAINT "background_steps_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "public"."backgrounds"("backgroundId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."personas" ADD CONSTRAINT "personas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stories" ADD CONSTRAINT "stories_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "public"."backgrounds"("backgroundId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stories" ADD CONSTRAINT "stories_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."characters"("characterId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stories" ADD CONSTRAINT "stories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "public"."backgrounds"("backgroundId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."characters"("characterId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "public"."personas"("personaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "public"."stories"("storyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memories" ADD CONSTRAINT "memories_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."characters"("characterId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memories" ADD CONSTRAINT "memories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memory_pieces" ADD CONSTRAINT "memory_pieces_memoryId_fkey" FOREIGN KEY ("memoryId") REFERENCES "public"."memories"("memoryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memory_pieces" ADD CONSTRAINT "memory_pieces_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."characters"("characterId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memory_pieces" ADD CONSTRAINT "memory_pieces_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."chats"("chatId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "public"."backgrounds"("backgroundId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."characters"("characterId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."chats"("chatId") ON DELETE CASCADE ON UPDATE CASCADE;
