/*
  Warnings:

  - A unique constraint covering the columns `[opportunity_id,skills_id]` on the table `Opportunity_Skills` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Opportunity_Skills_opportunity_id_skills_id_key" ON "Opportunity_Skills"("opportunity_id", "skills_id");
