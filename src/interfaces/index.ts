import { Document, Types } from 'mongoose';

// Tipos de enumeração
export enum Role {
  Doctor = 'Doctor',
  Staff = 'Staff',
  Patient = 'Patient'
}

export enum UrgencyLevel {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Emergency = 'Emergency'
}

// Interface para User
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  role: Role;
  phone?: string;
  email: string;
  address?: string;
  password: string;
  resetToken?: string;
  appointmentsPatient: Types.ObjectId[] | IAppointment[];
  appointmentsEmployee: Types.ObjectId[] | IAppointment[];
  attendancesPatient: Types.ObjectId[] | IAttendance[];
  attendancesEmployee: Types.ObjectId[] | IAttendance[];
}

// Interface para Session
export interface ISession extends Document {
  email: string;
  password: string;
}
export interface SessionCreate {
  email: string;
  password: string;
}

export interface SessionReturn {
  token: string;
  role: Role;
  idUser: Types.ObjectId;
}
// Interface para Appointment
export interface IAppointment extends Document {
  patientId: Types.ObjectId | IUser;
  employeeId: Types.ObjectId | IUser;
  appointmentDate: Date;
  diagnosis?: string;
  notes?: string;
}

// Interface para Prescription
export interface IPrescription extends Document {
  appointmentId: Types.ObjectId | IAppointment;
  medicationName: string;
  dosage: string;
  instructions: string;
}

// Interface para Attendance
export interface IAttendance extends Document {
  patientsId: Types.ObjectId | IUser;
  employeeId: Types.ObjectId | IUser;
  urgencyLevel: UrgencyLevel;
  observations?: string;
}

// Interfaces para operações CRUD
export interface UserCreate {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string;
  gender: string;
  role: Role;
  phone?: string;
  email: string;
  address?: string;
  password: string;
  resetToken?: string;
}

export interface UserUpdate {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date | string;
  gender?: string;
  role?: Role;
  phone?: string;
  email?: string;
  address?: string;
  password?: string;
  resetToken?: string;
}

export interface UserReturn {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  role: Role;
  phone?: string;
  email: string;
  address?: string;
  resetToken?: string;
  appointmentsPatient?: Types.ObjectId[];
  appointmentsEmployee?: Types.ObjectId[];
  attendancesPatient?: Types.ObjectId[];
  attendancesEmployee?: Types.ObjectId[];
}

// Interfaces para as outras operações CRUD
export interface AppointmentCreate {
  patientId: Types.ObjectId;
  employeeId: Types.ObjectId;
  appointmentDate: Date | string;
  diagnosis?: string;
  notes?: string;
}

export interface AppointmentUpdate {
  appointmentDate?: Date | string;
  diagnosis?: string;
  notes?: string;
}

export interface AppointmentReturn {
  _id: Types.ObjectId;
  patientId: Types.ObjectId;
  employeeId: Types.ObjectId;
  appointmentDate: Date;
  diagnosis?: string;
  notes?: string;
}

export interface PrescriptionCreate {
  appointmentId: Types.ObjectId;
  medicationName: string;
  dosage: string;
  instructions: string;
}

export interface PrescriptionUpdate {
  medicationName?: string;
  dosage?: string;
  instructions?: string;
}

export interface PrescriptionReturn {
  _id: Types.ObjectId;
  appointmentId: Types.ObjectId;
  medicationName: string;
  dosage: string;
  instructions: string;
}

export interface AttendanceCreate {
  patientsId: Types.ObjectId;
  employeeId: Types.ObjectId;
  urgencyLevel: UrgencyLevel;
  observations?: string;
}

export interface AttendanceUpdate {
  urgencyLevel?: UrgencyLevel;
  observations?: string;
}

export interface AttendanceReturn {
  _id: Types.ObjectId;
  patientsId: Types.ObjectId;
  employeeId: Types.ObjectId;
  urgencyLevel: UrgencyLevel;
  observations?: string;
}