import mongoose, { Schema, Document } from 'mongoose';

// Enum Role
export enum Role {
  Doctor = 'Doctor',
  Staff = 'Staff',
  Patient = 'Patient',
}
interface IUser extends Document {
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
  }
const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), required: true },
    phone: { type: String, default: null },
    email: { type: String, unique: true, required: true },
    address: { type: String, default: null },
    password: { type: String, required: true },
    resetToken: { type: String, default: null },
  });
  
  const User = mongoose.model<IUser>('User', userSchema);
  
  export default User;