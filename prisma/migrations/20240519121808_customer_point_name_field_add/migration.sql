-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CustomerPoint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" BIGINT NOT NULL,
    "customerFirstName" TEXT NOT NULL DEFAULT 'First',
    "customerLastName" TEXT NOT NULL DEFAULT 'Last',
    "points" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_CustomerPoint" ("customerId", "id", "points") SELECT "customerId", "id", "points" FROM "CustomerPoint";
DROP TABLE "CustomerPoint";
ALTER TABLE "new_CustomerPoint" RENAME TO "CustomerPoint";
CREATE UNIQUE INDEX "CustomerPoint_customerId_key" ON "CustomerPoint"("customerId");
PRAGMA foreign_key_check("CustomerPoint");
PRAGMA foreign_keys=ON;
