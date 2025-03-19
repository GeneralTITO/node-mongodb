import { Request, Response } from "express";
import { presciptionServices } from "../services";

const create = async (req: Request, res: Response): Promise<void> => {
  const appointmentID = req.params.idAppointment;
  const role: string = res.locals.decoded.role;
  const prescription = await presciptionServices.create(
    req.body,
    appointmentID,
    role
  );
  res.status(201).json(prescription);
};

const read = async (req: Request, res: Response): Promise<void> => {
  const appointmentID: string = req.params.idAppointment;
  const prescriptions = await presciptionServices.read(appointmentID);
  res.status(200).json(prescriptions);
};

const destroy = async (req: Request, res: Response): Promise<void> => {
  const prescriptionId = res.locals.foundEntity.id;
  await presciptionServices.destroy(prescriptionId);
  res.status(204).send();
};

export default { create, read, destroy };
