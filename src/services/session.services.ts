import { compare } from "bcryptjs";
import { AppError } from "../errors";
import { SessionCreate, SessionReturn } from "../interfaces/session.interfaces";
import { prisma } from "../prismaClient";
import { User } from "../interfaces";
import jwt from "jsonwebtoken";

const create = async ({
  email,
  password,
}: SessionCreate): Promise<SessionReturn> => {
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const foundUser: any = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!foundUser) {
    throw new AppError("Invalid credentials email", 401);
  }

  const samePwd: boolean = await compare(password, foundUser.password);

  if (!samePwd) {
    throw new AppError("Invalid credentials password", 401);
  }

  const secretKey = process.env.SECRET_KEY as jwt.Secret | jwt.PrivateKey;
  if (!secretKey) {
    throw new AppError(
      "Server configuration error: SECRET_KEY is missing",
      500
    );
  }

  const userid = foundUser.id;
  const role = foundUser.role.toString();
  const expiresIn: any = process.env.EXPIRES_IN || "1d";
  const jwtOptions: any = { subject: userid.toString(), expiresIn: expiresIn };

  const token = jwt.sign({ id: userid, role: role }, secretKey, jwtOptions);

  return { token:token, role:role, idUser: userid };
};

export default { create };
