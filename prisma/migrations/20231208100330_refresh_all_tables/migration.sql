/*
  Warnings:

  - Added the required column `descricao` to the `Transferencia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transferencia" ADD COLUMN     "descricao" TEXT NOT NULL;
