/*
  Warnings:

  - You are about to drop the column `createdUserId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `updatedUserId` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "createdUserId",
DROP COLUMN "updatedUserId";
