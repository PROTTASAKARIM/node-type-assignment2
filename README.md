# Live Link of Project (https://lv2-assignment2.vercel.app/)

## POST a user in https://lv2-assignment2.vercel.app/api/users link 
Here is a sample input that can be used in Request Body
```
{
    
    "userId": 4,
    "username": "john_doe4",
    "password": "password123",
    "fullName": {
        "firstName": "John",
        "lastName": "Doe"
    },
    "age": 25,
    "email": "john1.doe@example.com",
    "isActive": true,
    "hobbies": ["Reading", "Traveling"],
    "address": {
        "street": "123 Main Street",
        "city": "Cityville",
        "country": "Countryland"
    },
       "orders": [
        {
            "productName": "Sample Product",
            "price": 29.99,
            "quantity": 2
        },
        {
            "productName": "Sample Product",
            "price": 29.99,
            "quantity": 2
        }
        
    ]
   
}

```

Here user userId and username should be unique. If there is any user before has same userId and username then it show an error 
```
{
    "success": false,
    "message": "User Creation Problem. Give Correct Input",
    "err": {}
}
```
If there is any type error in given input for example if we give email as "jhon" the our route will give type validation error.I have done type validation  by using zod.
```
{
    "success": false,
    "message": "User Creation Problem. Give Correct Input",
    "err": {
        "issues": [
            {
                "validation": "email",
                "code": "invalid_string",
                "message": "Invalid email",
                "path": [
                    "email"
                ]
            }
        ],
        "name": "ZodError"
    }
}
```
## Get All Users https://lv2-assignment2.vercel.app/api/users 
We can see all the users in the that we have successfully created containing username, fullName, age, email, address fields.

## Get a user With Given userId in this link https://lv2-assignment2.vercel.app/api/users/:userId 
Here in :userId we have to give the value useId for which we want to see the result. 
If the user is not present it will show Error massage.
```
{
    "success": false,
    "message": "Users not found",
    "err": {
        "code": 404,
        "description": "User not found!"
    }
}
```
## Update a user with userId by using PUT method in https://lv2-assignment2.vercel.app/api/users/:userId 
Here in :userId we have to give the value useId for which we want to update. To update the user will have to give full information of the user in the request body. If the user is not present it will show Error massage.

## Delete a user with userId by using Delete method in https://lv2-assignment2.vercel.app/api/users/:userId 
Here in :userId we have to give the value useId for which we want to Delete. If the user is not present it will show Error massage.

## Update orders of a user with userId by using PUT method in https://lv2-assignment2.vercel.app/api/users/:userId/orders
Here in :userId we have to give the value useId for which we want to update the orders. To update the orders will have to give the order information in the request body. If the user is not present it will show Error massage.

sample input
```
 {
            "productName": "Sample Product2",
            "price": 29.99,
            "quantity": 2
        }
```
## Get orders of a user with userId by using Get method in https://lv2-assignment2.vercel.app/api/users/:userId/orders
Here in :userId we have to give the value useId for which we want to see the orders.If the user is not present it will show Error massage.
## Get orders Total of a user with userId by using Get method in https://lv2-assignment2.vercel.app/api/users/:userId/orders/total-price
Here in :userId we have to give the value useId for which we want to see the orders total Calculated Price.If the user is not present it will show Error massage.

# Run Project Locally
Clone get repository and run npm install. So all the dependencies will be install.
Then To build with 
```
npm run build
```
TO run the server give this command
```
npm run start:dev
```
After starting the server. We can run our project locally on http://localhost:5000/ and we can access the routes
## POST a user in http://localhost:5000/api/users 
## Get All Users http://localhost:5000/api/users 
## Get a user With Given userId in this link http://localhost:5000/api/users/:userId 
## Update a user with userId by using PUT method in http://localhost:5000/api/users/:userId 
## Delete a user with userId by using Delete method in http://localhost:5000/api/users/:userId 
## Update orders of a user with userId by using PUT method in http://localhost:5000/api/users/:userId/orders
## Get orders of a user with userId by using Get method in http://localhost:5000/api/users/:userId/orders
## Get orders Total of a user with userId by using Get method in http://localhost:5000/api/users/:userId/orders/total-price

