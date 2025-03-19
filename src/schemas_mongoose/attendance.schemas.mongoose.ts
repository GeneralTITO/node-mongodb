import mongoose, { Schema, Document } from 'mongoose';

// Enum UrgencyLevel
export enum UrgencyLevel {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Emergency = 'Emergency',
}

interface IAttendances extends Document {
  patientsId: mongoose.Types.ObjectId;
  employeeId: mongoose.Types.ObjectId;
  urgencyLevel: UrgencyLevel;
  observations?: string;
}

const attendanceSchema = new Schema<IAttendances>({
  patientsId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  urgencyLevel: { type: String, enum: Object.values(UrgencyLevel), required: true },
  observations: { type: String, default: null },
});

const Attendances = mongoose.model<IAttendances>('Attendances', attendanceSchema);

export default Attendances;