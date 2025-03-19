import { AppointmentCreate, AppointmentReturn } from "../interfaces";
import { AppError } from "../errors";
import { Appointment as AppointmentModel } from "../schemasMongoose";
import { User as UserModel } from "../schemasMongoose";
import { redisClient } from "../prismaClient";


const create = async (
  payload: AppointmentCreate,
  idStaff: string,
  idUser: string,
  role: string
): Promise<AppointmentReturn> => {
  if (role !== "Doctor") {
    throw new AppError("Insufficient permissions", 403);
  }

  if (!idStaff || !idUser) {
    throw new AppError(
      "Both patient and employee must be provided with valid IDs",
      400
    );
  }

  const employeeExists = await UserModel.findById(idStaff);
  if (!employeeExists) {
    throw new AppError("Employee not found", 404);
  }

  const patientExists = await UserModel.findById(idUser);
  if (!patientExists) {
    throw new AppError("Patient not found", 404);
  }

  const appointmentData = {
    patientId: idUser,
    employeeId: idStaff,
    appointmentDate:
      typeof payload.appointmentDate === "string"
        ? new Date(payload.appointmentDate)
        : payload.appointmentDate,
    diagnosis: payload.diagnosis,
    notes: payload.notes,
  };

  const appointment = await AppointmentModel.create(appointmentData);

  return appointment.toObject() as AppointmentReturn;
};

const read = async (): Promise<AppointmentReturn[]> => {
  try {
    const cachedData = await redisClient.get("appointments");
    
    if (cachedData) {
      console.log("Cache hit");
      return JSON.parse(cachedData);
    }
    
    const appointments = await AppointmentModel.find();
    console.log("Cache miss");
    await redisClient.set("appointments", JSON.stringify(appointments), "EX", 3600);
    
    return appointments.map(appointment => appointment.toObject() as AppointmentReturn);
  } catch (err) {
    console.error("Erro ao buscar appointments:", err);
    const appointments = await AppointmentModel.find();
    return appointments.map(appointment => appointment.toObject() as AppointmentReturn);
  }
};

const readOne = async (appointmentId: string): Promise<AppointmentReturn> => {
  const appointment = await AppointmentModel.findById(appointmentId);
  if (!appointment) {
    throw new AppError("Appointment not found", 404);
  }
  return appointment.toObject() as AppointmentReturn;
};

const getUserAppointments = async (userId: string): Promise<AppointmentReturn[]> => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const appointments = await AppointmentModel.find({
    $or: [{ patientId: userId }, { employeeId: userId }],
  }).populate('prescriptions').sort({ appointmentDate: -1 });

  return appointments.map(appointment => appointment.toObject() as AppointmentReturn);
};

const destroy = async (appointmentId: string): Promise<void> => {
  const result = await AppointmentModel.findByIdAndDelete(appointmentId);
  
  if (!result) {
    throw new AppError("Appointment not found", 404);
  }
};

export default { create, read, destroy, readOne, getUserAppointments };