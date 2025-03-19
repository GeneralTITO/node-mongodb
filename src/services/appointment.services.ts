import { AppointmentCreate } from "../interfaces";
import { AppError } from "../errors";
import { Appointments, User } from "../schemas_mongoose";
import { redisClient } from "../mongodbClient";
import mongoose from "mongoose";
 

const create = async (
  payload: AppointmentCreate,
  idStaff: string,
  idUser: string,
  role: string
): Promise<any> => {
  if (role !== "Doctor") {
    throw new AppError("Insufficient permissions", 403);
  }

  if (!mongoose.Types.ObjectId.isValid(idStaff)) {
    throw new AppError("Invalid staff ID", 400);
  }
  if (!mongoose.Types.ObjectId.isValid(idUser)) {
    throw new AppError("Invalid user ID", 400);
  }

  const staffId = idStaff;
  const userId = idUser;

  const employeeExists = await User.findById(staffId);
  if (!employeeExists) {
    throw new AppError("Employee not found", 404);
  }

  const patientExists = await User.findById(userId);
  if (!patientExists) {
    throw new AppError("Patient not found", 404);
  }

  const appointmentData = {
    patientId: userId,
    employeeId: staffId,
    appointmentDate:
      typeof payload.appointmentDate === "string"
        ? new Date(payload.appointmentDate)
        : payload.appointmentDate,
    diagnosis: payload.diagnosis,
    notes: payload.notes,
  };

  const appointment = new Appointments(appointmentData);
  await appointment.save();

  return appointment;
};

const read = async (): Promise<any[]> => {
  try {
    const cachedData = await redisClient.get("appointments");

    if (cachedData) {
      console.log("Cache hit");
      return JSON.parse(cachedData);
    }

    const appointments = await Appointments.find();
    console.log("Cache miss");

    await redisClient.set(
      "appointments",
      JSON.stringify(appointments),
      "EX",
      3600
    );

    return appointments;
  } catch (err) {
    console.error("Error fetching appointments:", err);
    return await Appointments.find();
  }
};

const readOne = async (appointmentId: string): Promise<any> => {
  const appointment = await Appointments.findById(appointmentId);
  return appointment;
};

const getUserAppointments = async (userId: string): Promise<any[]> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const appointments = await Appointments.find({
    $or: [{ patientId: userId }, { employeeId: userId }],
  })
    .populate("prescriptions") 
    .sort({ appointmentDate: -1 }); 

  return appointments;
};

const destroy = async (appointmentId: string): Promise<void> => {
  const appointment = await Appointments.findByIdAndDelete(appointmentId);

  if (!appointment) {
    throw new AppError("Appointment not found", 404);
  }
};

export default { create, read, destroy, readOne, getUserAppointments };
