import { Prescriptions } from "@prisma/client";
import { prisma } from "../prismaClient";
import { PrescriptionCreate } from "../interfaces";
import { AppError } from "../errors";

const create = async (
  payload: PrescriptionCreate,
  idAppointment: string,
  role: string
): Promise<Prescriptions> => {

  if (role !== "Doctor") {
    throw new AppError("Insufficient permissions", 403);
  }
  
  const appointmentId = Number(idAppointment);

  const appointmentExists = await prisma.appointments.findUnique({
    where: { id: appointmentId },
  });

  if (!appointmentExists) {
    throw new AppError("Appointment not found", 404);
  }

  const prescriptionData = {
    appointmentId: appointmentId,
    medicationName: payload.medicationName,
    dosage: payload.dosage,
    instructions: payload.instructions || null,
  };

  const prescription = await prisma.prescriptions.create({
    data: prescriptionData,
  });

  return prescription;
};

const read = async (idAppointment: string): Promise<Prescriptions[]> => {
  const appointmentId = Number(idAppointment);

  const appointmentExists = prisma.appointments.findUnique({
    where: { id: appointmentId },
  });
  if (!appointmentExists) {
    throw new AppError("Appoitment not found", 404);
  }

  return await prisma.prescriptions.findMany({
    where: {
      appointmentId: appointmentId,
    },
  });
};

const destroy = async (prescriptionId: number): Promise<void> => {
  await prisma.prescriptions.delete({
    where: { id: prescriptionId },
  });
};

export default { create, read, destroy };
