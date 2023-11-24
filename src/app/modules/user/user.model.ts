import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  AddressType,
  FullNameType,
  OrderType,
  UserModel,
  UserType,
} from './user.interface';
import config from '../../config';

const fullNameSchema = new Schema<FullNameType>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const addressSchema = new Schema<AddressType>({
  street: {
    type: String,
    required: [true, 'Street Name is required'],
    trim: true,
    maxlength: [40, 'Street Name can not be more than 20 characters'],
  },
  city: {
    type: String,
    trim: true,
    required: [true, 'City Name is required'],
    maxlength: [20, 'City Name can not be more than 20 characters'],
  },
  country: {
    type: String,
    trim: true,
    required: [true, 'Country Name is required'],
    maxlength: [20, 'Country Name can not be more than 20 characters'],
  },
});
const orderSchema = new Schema<OrderType>({
  productName: {
    type: String,
    trim: true,
    maxlength: [40, 'Product Name can not be more than 40 characters'],
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});
const userSchema = new Schema<UserType, UserModel>({
  userId: {
    type: Number,
    required: [true, 'userId is required'],
    unique: true,
  },
  username: { type: String, required: [true, 'username is required'] },
  password: { type: String, required: [true, 'password is required'] },
  fullName: {
    type: fullNameSchema,
    required: [true, 'First and last name is required'],
  },
  age: { type: Number, required: [true, 'age is required'] },
  email: { type: String, required: [true, 'email is required'], unique: true },
  isActive: { type: Boolean, required: [true, 'Status is required'] },
  hobbies: { type: [String], required: [true, 'Hobbies are required'] },
  address: { type: addressSchema, required: [true, 'Address are required'] },
  order: { type: [orderSchema] },
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
userSchema.pre('updateOne',{ document: true, query: false }, async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // console.log("user Update",user)
  // hashing password and save into DB
  if(user.password){
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

userSchema.post('save', function (doc, next) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { password, ...newDocWithoutPassword } = doc.toObject();
  next();
});

// userSchema.statics.isUserExists = async function (userId: number) {
//   const existingUser = await User.findOne({ userId });
//   return existingUser;
// };
userSchema.statics.userExistMethods = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<UserType, UserModel>('User', userSchema);
