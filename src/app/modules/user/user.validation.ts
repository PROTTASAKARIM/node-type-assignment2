import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).min(1).max(20),
});
const addressValidationSchema = z.object({
  street: z.string().min(1).max(40),
  city: z.string().min(1).max(20),
  country: z.string().min(1).max(20),
});
const orderValidationSchema = z.object({
  productName: z.string().min(1).max(40),
  price: z.number(),
  quantity: z.number(),
});
const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string().max(20),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.string().array(),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema).optional(),
});

export default userValidationSchema;
