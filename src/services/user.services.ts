import { hashSync } from "bcryptjs";
import { User } from "../schemas_mongoose"; 
import { UserCreate, UserReturn, UserUpdate } from "../interfaces";
import {
  ArrayUserReturnSchema,
  UserReturnSchema,
} from "../schemas_zod/user.schemas";
import mongoose from "mongoose";
import { AppError } from "../errors";

const create = async (payload: UserCreate): Promise<UserReturn> => {
  let formattedPayload = { ...payload };

  if (typeof payload.dateOfBirth === "string") {
    formattedPayload.dateOfBirth = new Date(payload.dateOfBirth);
  }

  if (formattedPayload.password) {
    formattedPayload.password = hashSync(formattedPayload.password, 10);
  }

  const user = new User(formattedPayload);
  await user.save(); 

  return UserReturnSchema.parse(user);
};

const read = async (): Promise<UserReturn[]> => {
  const users = await User.find(); 

  return ArrayUserReturnSchema.parse(users);
};

const readOne = async (userId: string): Promise<UserReturn> => {

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new AppError("Invalid user ID", 400);
    }
  const user = await User.findById(userId); 
  
  if (!user) {
    throw new Error("User not found"); 
  }
  return UserReturnSchema.parse(user);
};

const update = async (
  payload: UserUpdate,
  idUser: string
): Promise<UserReturn> => {
  let formattedPayload = { ...payload };
  if (!mongoose.Types.ObjectId.isValid(idUser)) {
    throw new AppError("Invalid user ID", 400);
  }

  if (typeof payload.dateOfBirth === "string") {
    formattedPayload.dateOfBirth = new Date(payload.dateOfBirth);
  }

  const passwordString: any = formattedPayload.password;

  if (formattedPayload.password) {
    formattedPayload.password = hashSync(passwordString, 10);
  }

  const userUpdated = await User.findByIdAndUpdate(idUser, formattedPayload, {
    new: true, 
  });

  if (!userUpdated) {
    throw new Error("User not found"); 
  }

  return UserReturnSchema.parse(userUpdated);
};

const destroy = async (userId: string): Promise<void> => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError("Invalid user ID", 400);
  }
  
  const user = await User.findByIdAndDelete(userId); 

  if (!user) {
    throw new Error("User not found"); 
  }
};

const searchByName = async (name: string): Promise<UserReturn[]> => {
  const users = await User.find({
    $or: [
      { firstName: { $regex: name, $options: "i" } }, 
      { lastName: { $regex: name, $options: "i" } },
    ],
  });

  return ArrayUserReturnSchema.parse(users);
};

export default { create, read, destroy, readOne, update, searchByName };
