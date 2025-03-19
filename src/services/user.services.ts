import { hashSync } from "bcryptjs";
import { 
  IUser, 
  UserCreate, 
  UserReturn, 
  UserUpdate 
} from "../interfaces";
// Corrigindo a importação do modelo User
import { User as UserModel } from "../schemasMongoose";

const create = async (payload: UserCreate): Promise<UserReturn> => {
  let formattedPayload = { ...payload };

  if (typeof payload.dateOfBirth === "string") {
    formattedPayload.dateOfBirth = new Date(payload.dateOfBirth);
  }

  if (formattedPayload.password) {
    formattedPayload.password = hashSync(formattedPayload.password, 10);
  }

  const user = await UserModel.create(formattedPayload);
  
  // Converte o documento Mongoose para objeto JavaScript
  const userObject = user.toObject();
  
  // Remove o campo password do objeto retornado
  const { password, ...userReturn } = userObject;
  
  return userReturn as UserReturn;
};

const read = async (): Promise<UserReturn[]> => {
  const users = await UserModel.find().select('-password');
  
  return users.map(user => user.toObject() as UserReturn);
};

const readOne = async (userId: string): Promise<UserReturn> => {
  const user = await UserModel.findById(userId).select('-password');
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return user.toObject() as UserReturn;
};

const update = async (
  payload: UserUpdate,
  idUser: string
): Promise<UserReturn> => {
  let formattedPayload = { ...payload };

  if (typeof payload.dateOfBirth === "string") {
    formattedPayload.dateOfBirth = new Date(payload.dateOfBirth);
  }

  if (formattedPayload.password) {
    formattedPayload.password = hashSync(formattedPayload.password, 10);
  }
  
  const userUpdated = await UserModel.findByIdAndUpdate(
    idUser,
    formattedPayload,
    { new: true }
  ).select('-password');
  
  if (!userUpdated) {
    throw new Error('User not found');
  }
  
  return userUpdated.toObject() as UserReturn;
};

const destroy = async (userId: string): Promise<void> => {
  const result = await UserModel.findByIdAndDelete(userId);
  
  if (!result) {
    throw new Error('User not found');
  }
};

const searchByName = async (name: string): Promise<UserReturn[]> => {
  const users = await UserModel.find({
    $or: [
      { firstName: { $regex: name, $options: 'i' } },
      { lastName: { $regex: name, $options: 'i' } }
    ]
  }).select('-password');
  
  return users.map(user => user.toObject() as UserReturn);
};

export default { create, read, destroy, readOne, update, searchByName };