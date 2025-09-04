-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('male', 'female', 'undisclosed');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('character', 'persona');

-- CreateTable
CREATE TABLE "public"."tags" (
    "name" VARCHAR(30) NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("tag_id")
);

-- CreateTable
CREATE TABLE "public"."character_tags" (
    "character_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "character_tags_pkey" PRIMARY KEY ("tag_id","character_id")
);

-- CreateTable
CREATE TABLE "public"."background_tags" (
    "background_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "background_tags_pkey" PRIMARY KEY ("tag_id","background_id")
);

-- CreateTable
CREATE TABLE "public"."characters" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "dialogueStyle" TEXT NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "personality" TEXT NOT NULL,
    "traits" TEXT NOT NULL,
    "writerNote" TEXT,
    "character_id" TEXT NOT NULL,
    "character_img" VARCHAR(255) DEFAULT 'IMAGE',
    "writer_id" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "characters_pkey" PRIMARY KEY ("character_id")
);

-- CreateTable
CREATE TABLE "public"."backgrounds" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "prompt" TEXT NOT NULL,
    "tags" TEXT[],
    "basic" BOOLEAN NOT NULL,
    "background_id" TEXT NOT NULL,
    "background_img" VARCHAR(255) DEFAULT 'IMAGE',
    "intro_description" TEXT NOT NULL,
    "intro_title" VARCHAR(255) NOT NULL,
    "unlock_chat_count" INTEGER NOT NULL DEFAULT 100,
    "writer_id" TEXT NOT NULL,

    CONSTRAINT "backgrounds_pkey" PRIMARY KEY ("background_id")
);

-- CreateTable
CREATE TABLE "public"."open_backgrounds" (
    "background_id" TEXT NOT NULL,
    "flow_id" TEXT NOT NULL,
    "open_id" TEXT NOT NULL,
    "opened_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "writer_id" TEXT NOT NULL,

    CONSTRAINT "open_backgrounds_pkey" PRIMARY KEY ("open_id")
);

-- CreateTable
CREATE TABLE "public"."background_flows" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL,
    "flow_id" TEXT NOT NULL,
    "writer_id" TEXT NOT NULL,

    CONSTRAINT "background_flows_pkey" PRIMARY KEY ("flow_id")
);

-- CreateTable
CREATE TABLE "public"."background_steps" (
    "background_id" TEXT NOT NULL,
    "flow_id" TEXT NOT NULL,
    "order_key" INTEGER NOT NULL,
    "step_id" TEXT NOT NULL,

    CONSTRAINT "background_steps_pkey" PRIMARY KEY ("step_id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bio" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "follower" INTEGER NOT NULL DEFAULT 0,
    "following" INTEGER NOT NULL DEFAULT 0,
    "name" VARCHAR(30) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "total_chat" INTEGER NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."personas" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "prompt" TEXT NOT NULL,
    "persona_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "personas_pkey" PRIMARY KEY ("persona_id")
);

-- CreateTable
CREATE TABLE "public"."stories" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "basic" BOOLEAN NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "opening" TEXT NOT NULL,
    "background_id" TEXT NOT NULL,
    "character_id" TEXT NOT NULL,
    "character_prompt" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "story_img" VARCHAR(255) NOT NULL DEFAULT 'IMAGE',
    "user_id" TEXT NOT NULL,

    CONSTRAINT "stories_pkey" PRIMARY KEY ("story_id")
);

-- CreateTable
CREATE TABLE "public"."chats" (
    "background_id" TEXT NOT NULL,
    "character_id" TEXT NOT NULL,
    "chat_count" BIGINT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_id" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "persona_gender" VARCHAR(50) NOT NULL,
    "persona_name" VARCHAR(255) NOT NULL,
    "persona_traits" VARCHAR(1000) NOT NULL,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("chat_id")
);

-- CreateTable
CREATE TABLE "public"."memories" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "character_id" TEXT NOT NULL,
    "max_piece_count" INTEGER NOT NULL DEFAULT 30,
    "memory_id" TEXT NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "memories_pkey" PRIMARY KEY ("memory_id")
);

-- CreateTable
CREATE TABLE "public"."memory_pieces" (
    "summary" VARCHAR(1000),
    "character_id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endMessage_id" TEXT NOT NULL,
    "memory_id" TEXT NOT NULL,
    "piece_id" TEXT NOT NULL,
    "startMessage_id" TEXT NOT NULL,

    CONSTRAINT "memory_pieces_pkey" PRIMARY KEY ("piece_id")
);

-- CreateTable
CREATE TABLE "public"."messages" (
    "contents" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "seq" INTEGER NOT NULL DEFAULT 0,
    "background_id" TEXT NOT NULL,
    "character_id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("chat_id","seq")
);

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "public"."tags"("name");

-- CreateIndex
CREATE INDEX "character_tags_tag_id_idx" ON "public"."character_tags"("tag_id");

-- CreateIndex
CREATE INDEX "character_tags_character_id_idx" ON "public"."character_tags"("character_id");

-- CreateIndex
CREATE INDEX "background_tags_tag_id_idx" ON "public"."background_tags"("tag_id");

-- CreateIndex
CREATE INDEX "background_tags_background_id_idx" ON "public"."background_tags"("background_id");

-- CreateIndex
CREATE UNIQUE INDEX "characters_name_key" ON "public"."characters"("name");

-- CreateIndex
CREATE INDEX "characters_writer_id_idx" ON "public"."characters"("writer_id");

-- CreateIndex
CREATE INDEX "backgrounds_writer_id_idx" ON "public"."backgrounds"("writer_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "public"."users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "memory_pieces_memory_id_key" ON "public"."memory_pieces"("memory_id");

-- AddForeignKey
ALTER TABLE "public"."character_tags" ADD CONSTRAINT "character_tags_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("character_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."character_tags" ADD CONSTRAINT "character_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_tags" ADD CONSTRAINT "background_tags_background_id_fkey" FOREIGN KEY ("background_id") REFERENCES "public"."backgrounds"("background_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_tags" ADD CONSTRAINT "background_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."characters" ADD CONSTRAINT "characters_writer_id_fkey" FOREIGN KEY ("writer_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."backgrounds" ADD CONSTRAINT "backgrounds_writer_id_fkey" FOREIGN KEY ("writer_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."open_backgrounds" ADD CONSTRAINT "open_backgrounds_background_id_fkey" FOREIGN KEY ("background_id") REFERENCES "public"."backgrounds"("background_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."open_backgrounds" ADD CONSTRAINT "open_backgrounds_flow_id_fkey" FOREIGN KEY ("flow_id") REFERENCES "public"."background_flows"("flow_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."open_backgrounds" ADD CONSTRAINT "open_backgrounds_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."open_backgrounds" ADD CONSTRAINT "open_backgrounds_writer_id_fkey" FOREIGN KEY ("writer_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_flows" ADD CONSTRAINT "background_flows_writer_id_fkey" FOREIGN KEY ("writer_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_steps" ADD CONSTRAINT "background_steps_background_id_fkey" FOREIGN KEY ("background_id") REFERENCES "public"."backgrounds"("background_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."background_steps" ADD CONSTRAINT "background_steps_flow_id_fkey" FOREIGN KEY ("flow_id") REFERENCES "public"."background_flows"("flow_id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("story_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memories" ADD CONSTRAINT "memories_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("character_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memories" ADD CONSTRAINT "memories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memory_pieces" ADD CONSTRAINT "memory_pieces_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("character_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memory_pieces" ADD CONSTRAINT "memory_pieces_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("chat_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memory_pieces" ADD CONSTRAINT "memory_pieces_memory_id_fkey" FOREIGN KEY ("memory_id") REFERENCES "public"."memories"("memory_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_background_id_fkey" FOREIGN KEY ("background_id") REFERENCES "public"."backgrounds"("background_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("character_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("chat_id") ON DELETE CASCADE ON UPDATE CASCADE;
