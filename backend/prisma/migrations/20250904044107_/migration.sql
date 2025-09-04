/*
  Warnings:

  - You are about to drop the column `persona_id` on the `chats` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."chats" DROP CONSTRAINT "chats_persona_id_fkey";

-- AlterTable
ALTER TABLE "public"."chats" DROP COLUMN "persona_id";
