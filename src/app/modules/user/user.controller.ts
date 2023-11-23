import { Request, Response } from "express";
import { UserServices } from "./user.service";
import userValidationSchema from "./user.validation";


const createUser = async (req: Request, res: Response) => {
    try {
      const {userData} = req.body;
    
      const zodParsedData = userValidationSchema.parse(userData);
    //   const findDuplicateUser =await UserServices.findUserByUserId(userData.user);
    //  console.log("findDuplicateUser",findDuplicateUser)
      const result = await UserServices.createUserIntoDB(zodParsedData);
  
      res.status(200).json({
        success: true,
        message: 'User is created successfully',
        data: result,
      });
    } catch (err) {
   
     res.status(404).json({
      success: false,
      message: 'User Already Exists',
     err:err
    });
    }
  };


  export const UserControllers={
    createUser
  }