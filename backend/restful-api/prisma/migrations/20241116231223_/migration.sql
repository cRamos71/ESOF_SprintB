-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "approval_badge" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Manager" ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "message" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Partner" ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "birth_date" DROP NOT NULL;
