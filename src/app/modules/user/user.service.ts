import { UserType } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: UserType) => {
  console.log('userData', userData);

  if (await User.userExistMethods(userData.userId)) {
    throw new Error('User already exists!');
  }
  const result = await User.create(userData);
  return result;
};
const findUserByUserId = async (userId: number) => {
  const result = await User.aggregate([{ $match: { userId } }]);
  return result;
};
const findUserByUserIdWithSelectedValues = async (userId: number) => {
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

export const UserServices = {
  createUserIntoDB,
  findUserByUserId,
  findUserByUserIdWithSelectedValues,
  findUsersWithSelectedValues,
};
