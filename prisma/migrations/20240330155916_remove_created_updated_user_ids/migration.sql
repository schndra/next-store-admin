/*
  Warnings:

  - You are about to drop the column `createdUserId` on the `Size` table. All the data in the column will be lost.
  - You are about to drop the column `updatedUserId` on the `Size` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Size" DROP CONSTRAINT "Size_createdUserId_fkey";

-- DropForeignKey
ALTER TABLE "Size" DROP CONSTRAINT "Size_updatedUserId_fkey";

-- AlterTable
ALTER TABLE "Size" DROP COLUMN "createdUserId",
DROP COLUMN "updatedUserId";
