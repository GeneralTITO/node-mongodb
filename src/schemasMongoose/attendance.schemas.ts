import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const UrgencyLevel = ['Low', 'Medium', 'High', 'Emergency'];


const AttendanceSchema = new Schema({
  patientsId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  employeeId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  urgencyLevel: { type: String, enum: UrgencyLevel, required: true },
  observations: { type: String },
});