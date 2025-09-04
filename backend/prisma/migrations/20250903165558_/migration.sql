/*
  Warnings:

  - Added the required column `basic` to the `backgrounds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."backgrounds" ADD COLUMN     "basic" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "public"."stories" ADD COLUMN     "story_img" VARCHAR(255) NOT NULL DEFAULT 'IMAGE';
