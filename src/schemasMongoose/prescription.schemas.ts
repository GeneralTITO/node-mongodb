import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const Role = ['Doctor', 'Staff', 'Patient'];
const UrgencyLevel = ['Low', 'Medium', 'High', 'Emergency'];


const PrescriptionSchema = new Schema({
  appointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment', required: true },
  medicationName: { type: String, required: true },
  dosage: { type: String, required: true },
  instructions: { type: String, required: true },
});