import mongoose, { Schema, Document } from 'mongoose';

interface IAppointments extends Document {
  patientId: mongoose.Types.ObjectId;
  employeeId: mongoose.Types.ObjectId;
  appointmentDate: Date;
  diagnosis?: string;
  notes?: string;
  prescriptions: mongoose.Types.ObjectId[];  // Referência para Prescriptions
}

const appointmentSchema = new Schema<IAppointments>({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appointmentDate: { type: Date, required: true },
  diagnosis: { type: String, default: null },
  notes: { type: String, default: null },
  prescriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prescriptions' }],
});

const Appointments = mongoose.model<IAppointments>('Appointments', appointmentSchema);

export default Appointments;