import mongoose from "mongoose";
import { AppError } from "../errors";
import { PrescriptionCreate } from "../interfaces";
import { User, Appointments, Prescriptions } from "../schemas_mongoose"; 

const create = async (
  payload: PrescriptionCreate,
  idAppointment: string,
  role: string
): Promise<any> => {

  if (role !== "Doctor") {
    throw new AppError("Insufficient permissions", 403);
  }
    if (!mongoose.Types.ObjectId.isValid(idAppointment)) {
      throw new AppError("Invalid user ID", 400);
    }
  const appointmentId = idAppointment;

  const appointmentExists = await Appointments.findById(appointmentId);

  if (!appointmentExists) {
    throw new AppError("Appointment not found", 404);
  }

  const prescriptionData = {
    appointmentId: appointmentId,
    medicationName: payload.medicationName,
    dosage: payload.dosage,
    instructions: payload.instructions || null,
  };

  const prescription = new Prescriptions(prescriptionData);
  await prescription.save();

  return prescription;
};

const read = async (idAppointment: string): Promise<any[]> => {
  const appointmentExists = await Appointments.findById(idAppointment);
  if (!appointmentExists) {
    throw new AppError("Appointment not found", 404);
  }

  const prescriptions = await Prescriptions.find({
    appointmentId: idAppointment,
  });

  return prescriptions;
};

const destroy = async (prescriptionId: string): Promise<void> => {
  const prescription = await Prescriptions.findByIdAndDelete(prescriptionId);

  if (!prescription) {
    throw new AppError("Prescription not found", 404);
  }

  return;
};

export default { create, read, destroy };