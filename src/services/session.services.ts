import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../errors";
import { SessionCreate, SessionReturn, Role } from "../interfaces";
import { User as UserModel } from "../schemasMongoose";

const create = async ({ email, password }: SessionCreate): Promise<SessionReturn> => {
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const foundUser = await UserModel.findOne({ email });

  if (!foundUser) {
    throw new AppError("Invalid credentials email", 401);
  }

  const samePwd = await compare(password, foundUser.password);

  if (!samePwd) {
    throw new AppError("Invalid credentials password", 401);
  }

  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new AppError("Server configuration error: SECRET_KEY is missing", 500);
  }

  const userid = foundUser._id;
  const role = foundUser.role as Role;
  const expiresIn = process.env.EXPIRES_IN || "1d" as any;
  const jwtOptions: jwt.SignOptions = { subject: userid.toString(), expiresIn: expiresIn};

  const token = jwt.sign({ id: userid, role }, secretKey, jwtOptions);

  return { token, role, idUser: userid };
};

export default { create };