/*
  Warnings:

  - Changed the type of `userId` on the `ConversationParticipant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ConversationParticipant" DROP CONSTRAINT "ConversationParticipant_userId_fkey";

-- AlterTable
ALTER TABLE "ConversationParticipant" DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "ConversationParticipant" ADD CONSTRAINT "ConversationParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
