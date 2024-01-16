/*
  Warnings:

  - You are about to drop the `LoanPlan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "LoanPlan";

-- CreateTable
CREATE TABLE "LoadPlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "qty" INTEGER NOT NULL,
    "stackable" BOOLEAN NOT NULL,
    "tiltable" BOOLEAN NOT NULL,

    CONSTRAINT "LoadPlan_pkey" PRIMARY KEY ("id")
);
