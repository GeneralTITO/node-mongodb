import { Attendances } from "@prisma/client";
import { AttendanceCreate } from "../interfaces";
import { prisma } from "../prismaClient";
import { AppError } from "../errors";

const create = async (
  payload: AttendanceCreate,
  idStaff: string,
  idUser: string,
  role: string
): Promise<Attendances> => {
  if (role !== "Staff") {
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

  const attendanceData: any = {
    patientsId: numberIdUser,
    employeeId: numberIdStaff,
    urgencyLevel: payload.urgencyLevel,
    observations: payload.observations,
  };

  const attendance = await prisma.attendances.create({
    data: attendanceData,
  });

  return attendance;
};

const read = async (): Promise<Attendances[]> => {
  return await prisma.attendances.findMany();
};

const readOne = async (attendanceId: number): Promise<any> => {
  const attendance = await prisma.attendances.findUnique({
    where: { id: attendanceId },
  });
  return attendance;
};
const getUserAttendances = async (userId: number): Promise<Attendances[]> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const attendances = await prisma.attendances.findMany({
    where: {
      OR: [{ patientsId: userId }, { employeeId: userId }],
    },
    // include: {
    //   patient: {
    //     select: {
    //       id: true,
    //       firstName: true,
    //       lastName: true,
    //       email: true,
    //       role: true,
    //     },
    //   },
    //   employee: {
    //     select: {
    //       id: true,
    //       firstName: true,
    //       lastName: true,
    //       email: true,
    //       role: true,
    //     },
    //   },
    // },
  });

  return attendances;
};

const destroy = async (attendanceId: number): Promise<void> => {
  await prisma.attendances.delete({
    where: { id: attendanceId },
  });
};

export default { create, read, destroy, readOne, getUserAttendances };
