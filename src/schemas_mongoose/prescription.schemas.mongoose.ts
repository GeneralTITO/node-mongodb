import mongoose, { Schema, Document } from 'mongoose';

interface IPrescriptions extends Document {
  appointmentId: mongoose.Types.ObjectId;
  medicationName: string;
  dosage: string;
  instructions?: string;
}

const prescriptionSchema = new Schema<IPrescriptions>({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointments', required: true },
  medicationName: { type: String, required: true },
  dosage: { type: String, required: true },
  instructions: { type: String, default: null },
});

const Prescriptions = mongoose.model<IPrescriptions>('Prescriptions', prescriptionSchema);

export default Prescriptions;