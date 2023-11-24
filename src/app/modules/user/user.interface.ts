import { Model } from "mongoose";


export type FullNameType = {
    firstName: string;
    lastName: string;
  };
export type AddressType = {
    street: string;
    city: string;
    country: string;
  };
export type OrderType = {
    productName: string;
    price: number;
    quantity: number;
  };
export type UserType = {
    userId: number;
    username: string;
    password: string;
    fullName: FullNameType;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: Array<string>;
    address: AddressType;
    order?: Array<OrderType>;
  };

  export interface UserModel extends Model<UserType>{
    userExistMethods(userId:number):Promise<UserType |null>
  }
  // export interface UserModel extends Model<UserType>{
  //   isUserExits(userId:number):Promise<UserType | null>
  // }
 
