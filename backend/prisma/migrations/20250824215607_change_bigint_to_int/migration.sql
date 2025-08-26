/*
  Warnings:

  - You are about to alter the column `총대화량` on the `users` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `팔로워` on the `users` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `팔로잉` on the `users` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "총대화량" SET DATA TYPE INTEGER,
ALTER COLUMN "팔로워" SET DATA TYPE INTEGER,
ALTER COLUMN "팔로잉" SET DATA TYPE INTEGER;
