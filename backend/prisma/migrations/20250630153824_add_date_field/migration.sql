/*
  Warnings:

  - Added the required column `date` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "date" TEXT NOT NULL DEFAULT '2025-07-01';
