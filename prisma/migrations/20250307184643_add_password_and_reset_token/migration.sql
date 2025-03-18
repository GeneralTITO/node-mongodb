-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Doctor', 'Staff', 'Patient');

-- CreateEnum
CREATE TYPE "UrgencyLevel" AS ENUM ('Low', 'Medium', 'High', 'Emergency');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "password" TEXT NOT NULL,
    "resetToken" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "appointment_date" TIMESTAMP(3) NOT NULL,
    "diagnosis" TEXT,
    "notes" TEXT,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prescriptions" (
    "id" SERIAL NOT NULL,
    "appointment_id" INTEGER NOT NULL,
    "medication_name" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "instructions" TEXT,

    CONSTRAINT "prescriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendances" (
    "id" SERIAL NOT NULL,
    "patients_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "urgency_level" "UrgencyLevel" NOT NULL,
    "observations" TEXT,

    CONSTRAINT "attendances_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescriptions" ADD CONSTRAINT "prescriptions_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_patients_id_fkey" FOREIGN KEY ("patients_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
