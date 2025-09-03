/*
  Warnings:

  - You are about to drop the column `tags` on the `stories` table. All the data in the column will be lost.
  - Added the required column `persona_gender` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `persona_name` to the `chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `persona_traits` to the `chats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."chats" ADD COLUMN     "persona_gender" VARCHAR(50) NOT NULL,
ADD COLUMN     "persona_name" VARCHAR(255) NOT NULL,
ADD COLUMN     "persona_traits" VARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE "public"."stories" DROP COLUMN "tags";
