import { appointmentIdExists } from "./appointmentIdExists";
import { attendanceIdExists } from "./attendanceIdExists";
import { handleError } from "./handleError.middleware";
import { idExists } from "./idExists.middleware";
import { isOwner } from "./isOwner.middleware";
import { isPatient } from "./isPatient.middleware";
import { isStaffOrDoctor } from "./isStaffOrDoctormiddleware";
import { presciptionIdExists } from "./presciptionIdExists";
import { uniqueEmail } from "./uniqueEmail.middleware";
import { validateBody } from "./validateBody.middleware";
import { verifyToken } from "./verifyToken.middleware";
export default {
  handleError,
  idExists,
  isStaffOrDoctor,
  uniqueEmail,
  validateBody,
  appointmentIdExists,
  attendanceIdExists,
  verifyToken,
  presciptionIdExists,
  isPatient,
  isOwner,
};
