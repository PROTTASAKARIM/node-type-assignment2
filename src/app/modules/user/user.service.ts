import { UserType } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB= async (userData: UserType)=>{
    
    const result = await User.create(userData);
    return result;
}

export const UserServices={
    createUserIntoDB
}