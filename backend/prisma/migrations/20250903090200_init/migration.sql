/*
  Warnings:

  - You are about to drop the column `hectares` on the `Project` table. All the data in the column will be lost.
  - Added the required column `area` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "hectares",
ADD COLUMN     "area" DOUBLE PRECISION NOT NULL;
