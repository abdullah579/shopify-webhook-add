-- CreateTable
CREATE TABLE "CustomerPoint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" BIGINT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0
);
