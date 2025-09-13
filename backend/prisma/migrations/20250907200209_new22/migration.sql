/*
  Warnings:

  - You are about to drop the column `fileCid` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `species` on the `Project` table. All the data in the column will be lost.
  - Added the required column `date_planted` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Type" AS ENUM ('MANGROVE', 'SEAGRASS', 'SALTMARSH', 'TIDALWETLAND');

-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "fileCid",
DROP COLUMN "species",
ADD COLUMN     "credits" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "date_planted" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fileCids" TEXT[],
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "type" "public"."Type" NOT NULL;
