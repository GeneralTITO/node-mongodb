import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const Role = ['Doctor', 'Staff', 'Patient'];
const UrgencyLevel = ['Low', 'Medium', 'High', 'Emergency'];

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  role: { type: String, enum: Object.values(Role), required: true },
  phone: { type: String },
  email: { type: String, unique: true, required: true },
  address: { type: String },
  password: { type: String, required: true },
  resetToken: { type: String },
  appointmentsPatient: [{ type: Schema.Types.ObjectId, ref: 'Appointments' }],
  appointmentsEmployee: [{ type: Schema.Types.ObjectId, ref: 'Appointments' }],
  attendancesPatient: [{ type: Schema.Types.ObjectId, ref: 'Attendances' }],
  attendancesEmployee: [{ type: Schema.Types.ObjectId, ref: 'Attendances' }]
});
UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
    delete ret.resetToken;
    return ret;
  }
});

const SessionSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const AppointmentSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  employeeId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  appointmentDate: { type: Date, required: true },
  diagnosis: { type: String },
  notes: { type: String },
});

const PrescriptionSchema = new Schema({
  appointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment', required: true },
  medicationName: { type: String, required: true },
  dosage: { type: String, required: true },
  instructions: { type: String, required: true },
});

const AttendanceSchema = new Schema({
  patientsId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  employeeId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  urgencyLevel: { type: String, enum: UrgencyLevel, required: true },
  observations: { type: String },
});

const User = model('User', UserSchema);
const Session = model('Session', SessionSchema);
const Appointment = model('Appointment', AppointmentSchema);
const Prescription = model('Prescription', PrescriptionSchema);
const Attendance = model('Attendance', AttendanceSchema);

export { User, Session, Appointment, Prescription, Attendance };
