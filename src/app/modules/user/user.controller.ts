import { Request, Response } from "express";
import { UserServices } from "./user.service";
// import userValidationSchema from "./user.validation";

const createUser = async (req: Request, res: Response) => {
    try {
      const userData = req.body;
      console.log(userData)
    //   const zodParsedData = userValidationSchema.parse(userData);
  
      const result = await UserServices.createUserIntoDB(userData);
  
      res.status(200).json({
        success: true,
        message: 'User is created succesfully',
        data: result,
      });
    } catch (err) {
     console.log(err)
    }
  };

  export const UserControllers={
    createUser
  }