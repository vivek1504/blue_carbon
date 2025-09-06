-- CreateTable
CREATE TABLE "public"."NGO" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "wallet" TEXT,

    CONSTRAINT "NGO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" SERIAL NOT NULL,
    "ngoId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "hectares" DOUBLE PRECISION NOT NULL,
    "species" TEXT NOT NULL,
    "fileCid" TEXT NOT NULL,
    "metadataHash" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "txHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NGO_email_key" ON "public"."NGO"("email");

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_ngoId_fkey" FOREIGN KEY ("ngoId") REFERENCES "public"."NGO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
