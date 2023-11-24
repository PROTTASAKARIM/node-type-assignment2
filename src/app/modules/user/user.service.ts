import { OrderType, UserType } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: UserType) => {
//   console.log('userData', userData);

  if (await User.userExistMethods(userData.userId)) {
    throw new Error('User already exists!');
  }
  const result = await User.create(userData);
  return result;
};
const updateUserByUserId = async (userId: number,updatedData:UserType) => {
    if (await User.userExistMethods(userId)) {
        const result = await User.updateOne({ userId }, { ...updatedData });
        return result;
      }else{
        throw new Error('User not found');
      }
};
const updateOrdersByUserId = async (userId: number,order:OrderType) => {
    if (await User.userExistMethods(userId)) {
        const user= await User.findOne({userId})
        if(user && user.orders && user.orders.length > 0){
            const result = await User.updateOne({ userId }, { orders:[...user.orders,order] });
            return result;
        }else{
            const result = await User.updateOne({ userId }, { orders:[order] });
            return result; 
        }
      }else{
        throw new Error('User not found');
      }
};
const findUserByUserId = async (userId: number) => {
    if (await User.userExistMethods(userId)) {
        const result = await User.findOne({userId}).select({
          _id: 0,
          userId:1,
          username:1,
          fullName:1,
          age:1,
          email:1,
          isActive: 1,
          hobbies: 1,
          address: 1,
          orders: 1,
        }).exec()
        return result;
      }else{
        throw new Error('User not found');
      }
};
const findUserOrdersByUserId = async (userId: number) => {
    if (await User.userExistMethods(userId)) {
        const result = await User.findOne({userId}).select({
          _id: 0,
          orders: 1,
        }).exec()
        return result;
      }else{
        throw new Error('User not found');
      }
};
const findUserOrdersByUserIdTotalPrice = async (userId: number) => {
    if (await User.userExistMethods(userId)) {
        const result = await User.aggregate([
            { $match: { userId } },
            {
              $project: {
                _id: 0,
                orders: 1,
              },
            },
            {
                $unwind:"$orders"
            },
            {
                $group:{
                    _id:"$_id",
                    totalPrice:{$sum:{$multiply:["$orders.price","$orders.quantity"]}}
                }
            },
            {
                $project: {
                    _id: 0,
                    totalPrice: 1,
                  },
            }
          ]);
          return result;
      }else{
        throw new Error('User not found');
      }
};
const findUserByUserIdWithSelectedValues = async (userId: number) => {
    if (await User.userExistMethods(userId)) {
  const result = await User.aggregate([
    { $match: { userId } },
    {
      $project: {
        _id: 0,
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        isActive: 1,
        hobbies: 1,
        address: 1,
        orders: 1,
      },
    },
  ]);
  return result;
}else{
    throw new Error('User not found');
  }
};
const findUsersWithSelectedValues = async () => {
  const result = await User.find().select({
    _id: 0,
    username:1,
    fullName:1,
    age:1,
    email:1,
    address:1
  }).exec()
  return result;
};

const deleteUserByUserId = async (userId: number) => {
    if (await User.userExistMethods(userId)) {
        const result = await User.deleteOne({ userId });
        return result;
      }else{
        throw new Error('User not found');
      }
};

export const UserServices = {
  createUserIntoDB,
  findUserByUserId,
  findUserByUserIdWithSelectedValues,
  findUsersWithSelectedValues,
  findUserOrdersByUserId,
  updateUserByUserId,
  updateOrdersByUserId,
  findUserOrdersByUserIdTotalPrice,
  deleteUserByUserId
};
