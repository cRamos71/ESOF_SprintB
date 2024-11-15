-- CreateTable
CREATE TABLE "Users" (
    "user_id" SERIAL NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Student" (
    "student_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "address" TEXT,
    "disponibility" TEXT,
    "interests" TEXT,
    "last_access" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "Manager" (
    "manager_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "last_access" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("manager_id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "notification_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "manager_id" INTEGER NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "Skills" (
    "skills_id" SERIAL NOT NULL,
    "full_description" TEXT NOT NULL,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("skills_id")
);

-- CreateTable
CREATE TABLE "Student_Skills" (
    "student_skills_id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "skills_id" INTEGER NOT NULL,

    CONSTRAINT "Student_Skills_pkey" PRIMARY KEY ("student_skills_id")
);

-- CreateTable
CREATE TABLE "Company" (
    "company_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "dimension" TEXT,
    "collaborators" INTEGER,
    "field" TEXT,
    "location" TEXT,
    "telephone" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "description" TEXT,
    "approval_badge" BOOLEAN NOT NULL,
    "last_access" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "partner_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telephone" TEXT,
    "last_access" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("partner_id")
);

-- CreateTable
CREATE TABLE "Consent" (
    "consent_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rgpd_consent" BOOLEAN NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Consent_pkey" PRIMARY KEY ("consent_id")
);

-- CreateTable
CREATE TABLE "Partner_Degree" (
    "partner_degree_id" SERIAL NOT NULL,
    "partner_id" INTEGER NOT NULL,
    "degree_name" TEXT NOT NULL,
    "university_name" TEXT NOT NULL,

    CONSTRAINT "Partner_Degree_pkey" PRIMARY KEY ("partner_degree_id")
);

-- CreateTable
CREATE TABLE "Work_Opportunities" (
    "opportunity_id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "work_schedule" TEXT NOT NULL,
    "contract_type" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Work_Opportunities_pkey" PRIMARY KEY ("opportunity_id")
);

-- CreateTable
CREATE TABLE "Opportunity_Skills" (
    "opportunity_skills_id" SERIAL NOT NULL,
    "opportunity_id" INTEGER NOT NULL,
    "skills_id" INTEGER NOT NULL,

    CONSTRAINT "Opportunity_Skills_pkey" PRIMARY KEY ("opportunity_skills_id")
);

-- CreateTable
CREATE TABLE "Candidature" (
    "candidature_id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "opportunity_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candidature_pkey" PRIMARY KEY ("candidature_id")
);

-- CreateTable
CREATE TABLE "Association_Partner" (
    "association_id" SERIAL NOT NULL,
    "partner_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,

    CONSTRAINT "Association_Partner_pkey" PRIMARY KEY ("association_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_user_id_key" ON "Student"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_user_id_key" ON "Manager"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_email_key" ON "Manager"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_user_id_key" ON "Company"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Partner_user_id_key" ON "Partner"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Partner_email_key" ON "Partner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Consent_user_id_key" ON "Consent"("user_id");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Manager"("manager_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student_Skills" ADD CONSTRAINT "Student_Skills_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student_Skills" ADD CONSTRAINT "Student_Skills_skills_id_fkey" FOREIGN KEY ("skills_id") REFERENCES "Skills"("skills_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consent" ADD CONSTRAINT "Consent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partner_Degree" ADD CONSTRAINT "Partner_Degree_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "Partner"("partner_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work_Opportunities" ADD CONSTRAINT "Work_Opportunities_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opportunity_Skills" ADD CONSTRAINT "Opportunity_Skills_opportunity_id_fkey" FOREIGN KEY ("opportunity_id") REFERENCES "Work_Opportunities"("opportunity_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opportunity_Skills" ADD CONSTRAINT "Opportunity_Skills_skills_id_fkey" FOREIGN KEY ("skills_id") REFERENCES "Skills"("skills_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidature" ADD CONSTRAINT "Candidature_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidature" ADD CONSTRAINT "Candidature_opportunity_id_fkey" FOREIGN KEY ("opportunity_id") REFERENCES "Work_Opportunities"("opportunity_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Association_Partner" ADD CONSTRAINT "Association_Partner_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "Partner"("partner_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Association_Partner" ADD CONSTRAINT "Association_Partner_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;
