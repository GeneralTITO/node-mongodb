import mongoose from "mongoose";
import { AppError } from "../errors";
import { AttendanceCreate } from "../interfaces";
import { Attendances, User } from "../schemas_mongoose";
const create = async (
  payload: AttendanceCreate,
  idStaff: string,
  idUser: string,
  role: string
): Promise<any> => {
  if (role !== "Staff") {
    throw new AppError("Insufficient permissions", 403);
  }
    if (!mongoose.Types.ObjectId.isValid(idStaff)) {
      throw new AppError("Invalid user ID", 400);
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

  const attendanceData = {
    patientsId: userId,
    employeeId: staffId,
    urgencyLevel: payload.urgencyLevel,
    observations: payload.observations || null,
  };

  const attendance = new Attendances(attendanceData);
  await attendance.save();

  return attendance;
};

const read = async (): Promise<any[]> => {
  return await Attendances.find();
};

const readOne = async (attendanceId: string): Promise<any> => {
  const attendance = await Attendances.findById(attendanceId);
  return attendance;
};

const getUserAttendances = async (userId: string): Promise<any[]> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const attendances = await Attendances.find({
    $or: [{ patientsId: userId }, { employeeId: userId }],
  });

  return attendances;
};

const destroy = async (attendanceId: string): Promise<void> => {
  const attendance = await Attendances.findByIdAndDelete(attendanceId);

  if (!attendance) {
    throw new AppError("Attendance not found", 404);
  }
};

export default { create, read, destroy, readOne, getUserAttendances };