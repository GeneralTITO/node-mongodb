import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const Role = ['Doctor', 'Staff', 'Patient'];


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