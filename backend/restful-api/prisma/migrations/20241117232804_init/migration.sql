/*
  Warnings:

  - Added the required column `urgency` to the `Work_Opportunities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Work_Opportunities" ADD COLUMN     "urgency" TEXT NOT NULL,
ALTER COLUMN "type" DROP NOT NULL;
