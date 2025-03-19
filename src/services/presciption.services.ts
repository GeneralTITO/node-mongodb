import { PrescriptionCreate, PrescriptionReturn } from "../interfaces";
import { AppError } from "../errors";
import { Prescription as PrescriptionModel } from "../schemasMongoose";
import { Appointment as AppointmentModel } from "../schemasMongoose";

const create = async (
  payload: PrescriptionCreate,
  idAppointment: string,
  role: string
): Promise<PrescriptionReturn> => {

  if (role !== "Doctor") {
    throw new AppError("Insufficient permissions", 403);
  }

  const appointmentExists = await AppointmentModel.findById(idAppointment);

  if (!appointmentExists) {
    throw new AppError("Appointment not found", 404);
  }

  const prescriptionData = {
    appointmentId: idAppointment,
    medicationName: payload.medicationName,
    dosage: payload.dosage,
    instructions: payload.instructions || null,
  };

  const prescription = await PrescriptionModel.create(prescriptionData);

  return prescription.toObject() as PrescriptionReturn;
};

const read = async (idAppointment: string): Promise<PrescriptionReturn[]> => {
  const appointmentExists = await AppointmentModel.findById(idAppointment);
  if (!appointmentExists) {
    throw new AppError("Appointment not found", 404);
  }

  const prescriptions = await PrescriptionModel.find({ appointmentId: idAppointment });

  return prescriptions.map(prescription => prescription.toObject() as PrescriptionReturn);
};

const destroy = async (prescriptionId: string): Promise<void> => {
  const result = await PrescriptionModel.findByIdAndDelete(prescriptionId);
  
  if (!result) {
    throw new AppError("Prescription not found", 404);
  }
};

export default { create, read, destroy };