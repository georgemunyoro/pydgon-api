-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "uuid" UUID NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable

CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "senderId" UUID NOT NULL,
    "recepientId" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT FALSE,
    "replyToId" UUID NOT NULL,
    "embeddedFile" TEXT,
    "timeSent" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "conversationId" INTEGER,
    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable

CREATE TABLE "Conversation" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable

CREATE TABLE "ConversationParticipant" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "ConversationParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex

CREATE UNIQUE INDEX "User_uuid_key" ON "User" ("uuid");

-- CreateIndex

CREATE UNIQUE INDEX "User_email_key" ON "User" ("email");

-- CreateIndex

CREATE UNIQUE INDEX "Message_id_key" ON "Message" ("id");

-- CreateIndex

CREATE UNIQUE INDEX "Message_uuid_key" ON "Message" ("uuid");

-- CreateIndex

CREATE UNIQUE INDEX "Conversation_id_key" ON "Conversation" ("id");

-- CreateIndex

CREATE UNIQUE INDEX "Conversation_uuid_key" ON "Conversation" ("uuid");

-- CreateIndex

CREATE UNIQUE INDEX "ConversationParticipant_id_key" ON "ConversationParticipant" ("id");

-- CreateIndex

CREATE UNIQUE INDEX "ConversationParticipant_uuid_key" ON "ConversationParticipant" ("uuid");

-- AddForeignKey

ALTER TABLE "Message"
    ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("uuid") ON DELETE RESTRICT ON
    UPDATE
        CASCADE;

-- AddForeignKey

ALTER TABLE "Message"
    ADD CONSTRAINT "Message_recepientId_fkey" FOREIGN KEY ("recepientId") REFERENCES "User" ("uuid") ON DELETE RESTRICT ON
    UPDATE
        CASCADE;

-- AddForeignKey

ALTER TABLE "Message"
    ADD CONSTRAINT "Message_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "Message" ("uuid") ON DELETE RESTRICT ON
    UPDATE
        CASCADE;

-- AddForeignKey

ALTER TABLE "Message"
    ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation" ("id") ON DELETE SET NULL ON
    UPDATE
        CASCADE;

-- AddForeignKey

ALTER TABLE "ConversationParticipant"
    ADD CONSTRAINT "ConversationParticipant_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation" ("id") ON DELETE RESTRICT ON
    UPDATE
        CASCADE;

-- AddForeignKey

ALTER TABLE "ConversationParticipant"
    ADD CONSTRAINT "ConversationParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON
    UPDATE
        CASCADE;

