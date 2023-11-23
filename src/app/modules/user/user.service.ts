import { UserType } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB= async (userData: UserType)=>{
    console.log("userData",userData)
 
    if (await User.userExistMethods(userData.userId)) {
        throw new Error('User already exists!');
      }
    const result = await User.create(userData);
    return result;
}
const findUserByUserId= async (userId: number)=>{
    const result = await User.aggregate([{ $match: { userId } }]);
    return result;
}

export const UserServices={
createUserIntoDB,
findUserByUserId
}