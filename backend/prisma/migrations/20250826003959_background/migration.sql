/*
  Warnings:

  - You are about to alter the column `unlock_chat_count` on the `backgrounds` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "public"."backgrounds" ALTER COLUMN "unlock_chat_count" SET DATA TYPE INTEGER;
