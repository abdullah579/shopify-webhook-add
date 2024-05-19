/*
  Warnings:

  - You are about to drop the column `customerId` on the `CustomerPoint` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CustomerPoint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerFirstName" TEXT DEFAULT 'First',
    "customerLastName" TEXT DEFAULT 'Last',
    "points" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_CustomerPoint" ("customerFirstName", "customerLastName", "id", "points") SELECT "customerFirstName", "customerLastName", "id", "points" FROM "CustomerPoint";
DROP TABLE "CustomerPoint";
ALTER TABLE "new_CustomerPoint" RENAME TO "CustomerPoint";
PRAGMA foreign_key_check("CustomerPoint");
PRAGMA foreign_keys=ON;
