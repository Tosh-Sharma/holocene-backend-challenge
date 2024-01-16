-- CreateTable
CREATE TABLE "LoanPlan" (
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

    CONSTRAINT "LoanPlan_pkey" PRIMARY KEY ("id")
);
