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
If there is any type error in given input for example if we give email as "jhon" the our route will give type validation error.
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
I have done type validation  by using zod.

