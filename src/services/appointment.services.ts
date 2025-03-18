import { Appointments } from "@prisma/client";
import { AppointmentCreate } from "../interfaces";
import { prisma, redisClient } from "../prismaClient";
import { AppError } from "../errors";
import { promisify } from "util";

const create = async (
  payload: AppointmentCreate,
  idStaff: string,
  idUser: string,
  role: string
): Promise<Appointments> => {
  if (role !== "Doctor") {
    throw new AppError("Insufficient permissions", 403);
  }

  if (!idStaff || !idUser) {
    throw new AppError(
      "Both patient and employee must be provided with valid IDs",
      400
    );
  }

  const numberIdStaff = Number(idStaff);
  const numberIdUser = Number(idUser);

  const employeeExists = await prisma.user.findUnique({
    where: { id: numberIdStaff },
  });
  if (!employeeExists) {
    throw new AppError("Employee not found", 404);
  }

  const patientExists = await prisma.user.findUnique({
    where: { id: numberIdUser },
  });
  if (!patientExists) {
    throw new AppError("Patient not found", 404);
  }

  const appointmentData: any = {
    patientId: numberIdUser,
    employeeId: numberIdStaff,
    appointmentDate:
      typeof payload.appointmentDate === "string"
        ? new Date(payload.appointmentDate)
        : payload.appointmentDate,
    diagnosis: payload.diagnosis,
    notes: payload.notes,
  };

  const appointment = await prisma.appointments.create({
    data: appointmentData,
  });

  return appointment;
};

const read = async (): Promise<Appointments[]> => {


  try {
    const cachedData = await redisClient.get("appointments");
    
    if (cachedData) {
      console.log("Cache hit");
      return JSON.parse(cachedData);
    }
    
    const appointments = await prisma.appointments.findMany();
    console.log("Cache miss");
    await redisClient.set("appointments", JSON.stringify(appointments), "EX", 3600);
    
    return appointments;
  } catch (err) {
    console.error("Erro ao buscar appointments:", err);
    return await prisma.appointments.findMany();
  }
};

const readOne = async (appointmentId: number): Promise<any> => {
  const appointment = await prisma.appointments.findUnique({
    where: { id: appointmentId },
  });
  return appointment;
};

const getUserAppointments = async (userId: number): Promise<Appointments[]> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const appointments = await prisma.appointments.findMany({
    where: {
      OR: [{ patientId: userId }, { employeeId: userId }],
    },
    include: {
      prescriptions: true,
    },
    orderBy: {
      appointmentDate: "desc",
    },
  });

  return appointments;
};

const destroy = async (appointmentId: number): Promise<void> => {
  await prisma.appointments.delete({
    where: { id: appointmentId },
  });
};

export default { create, read, destroy, readOne, getUserAppointments };
