import { AttendanceCreate, AttendanceReturn } from "../interfaces";
import { AppError } from "../errors";
import { Attendance as AttendanceModel } from "../schemasMongoose";
import { User as UserModel } from "../schemasMongoose";

const create = async (
  payload: AttendanceCreate,
  idStaff: string,
  idUser: string,
  role: string
): Promise<AttendanceReturn> => {
  if (role !== "Staff") {
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

  const attendanceData = {
    patientsId: idUser,
    employeeId: idStaff,
    urgencyLevel: payload.urgencyLevel,
    observations: payload.observations,
  };

  const attendance = await AttendanceModel.create(attendanceData);

  return attendance.toObject() as AttendanceReturn;
};

const read = async (): Promise<AttendanceReturn[]> => {
  const attendances = await AttendanceModel.find();
  return attendances.map(attendance => attendance.toObject() as AttendanceReturn);
};

const readOne = async (attendanceId: string): Promise<AttendanceReturn> => {
  const attendance = await AttendanceModel.findById(attendanceId);
  if (!attendance) {
    throw new AppError("Attendance not found", 404);
  }
  return attendance.toObject() as AttendanceReturn;
};

const getUserAttendances = async (userId: string): Promise<AttendanceReturn[]> => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const attendances = await AttendanceModel.find({
    $or: [{ patientsId: userId }, { employeeId: userId }],
  });

  return attendances.map(attendance => attendance.toObject() as AttendanceReturn);
};

const destroy = async (attendanceId: string): Promise<void> => {
  const result = await AttendanceModel.findByIdAndDelete(attendanceId);
  
  if (!result) {
    throw new AppError("Attendance not found", 404);
  }
};

export default { create, read, destroy, readOne, getUserAttendances };