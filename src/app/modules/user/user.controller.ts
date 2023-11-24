import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const  userData  = req.body;

    const zodParsedData = userValidationSchema.parse(userData);
    const result = await UserServices.createUserIntoDB(zodParsedData);
    if (result) {
      try {
        const showResult =
          await UserServices.findUserByUserIdWithSelectedValues(
            zodParsedData.userId,
          );
        res.status(200).json({
          success: true,
          message: 'User is created successfully',
          data: showResult,
        });
      } catch (err) {
        res.status(404).json({
          success: false,
          message: 'User Creation Problem',
          err: err,
        });
      }
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User Creation Problem. Give Correct Input',
      err: err,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.findUsersWithSelectedValues();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Users not found',
      err: err,
    });
  }
};
const getUserByUserId = async (req: Request, res: Response) => {
  const userId=parseFloat(req.params.userId);
  try {
    const result = await UserServices.findUserByUserId(userId);
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Users not found',
      err: {
        code:404,
        description:"User not found!"
      },
    });
  }
};
const getUserOrdersByUserId = async (req: Request, res: Response) => {
  const userId=parseFloat(req.params.userId);
  try {
    const result = await UserServices.findUserOrdersByUserId(userId);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Users not found',
      err: {
        code:404,
        description:"User not found!"
      },
    });
  }
};
const getUserOrdersTotalPriceByUserId = async (req: Request, res: Response) => {
  const userId=parseFloat(req.params.userId);
  try {
    const result = await UserServices.findUserOrdersByUserIdTotalPrice(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Users not found',
      err: {
        code:404,
        description:"User not found!"
      },
    });
  }
};

const updateUserByUserId = async (req: Request, res: Response) => {
  const userId=parseFloat(req.params.userId);
  const updatedData= req.body
  try {
    const result = await UserServices.updateUserByUserId(userId,updatedData);
    if (result) {
      try {
        const showResult =
          await UserServices.findUserByUserIdWithSelectedValues(
          userId
          );
        res.status(200).json({
          success: true,
          message: 'User is updated successfully',
          data: showResult,
        });
      } catch (err) {
        res.status(404).json({
          success: false,
          message: 'User updated Problem',
          err: err,
        });
      }
    }

  
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Users not found',
      err: {
        code:404,
        description:"User not found!"
      },
    });
  }
};
const updateUserOrdersByUserId = async (req: Request, res: Response) => {
  const userId=parseFloat(req.params.userId);
  const order= req.body
  try {
    const result = await UserServices.updateOrdersByUserId(userId,order);
    if(result.acknowledged){
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    }else{
      res.status(404).json({
        success: false,
        message: 'Order update problem!',
      });
    }

  
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Users not found',
      err: {
        code:404,
        description:"User not found!"
      },
    });
  }
};

const deleteUserByUserId = async (req: Request, res: Response) => {
  const userId=parseFloat(req.params.userId);
  try {
    const result = await UserServices.deleteUserByUserId(userId);
  if(result.acknowledged){
    res.status(200).json({
      success: true,
      message: 'User is deleted successfully',
      data: null,
    });
  }else{
    res.status(404).json({
      success: false,
      message: 'User delete Problem',
    });
  }

  
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Users not found',
      err: {
        code:404,
        description:"User not found!"
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUser,
  getUserByUserId,
  updateUserByUserId,
  updateUserOrdersByUserId,
  getUserOrdersByUserId,
  getUserOrdersTotalPriceByUserId,
  deleteUserByUserId
};
