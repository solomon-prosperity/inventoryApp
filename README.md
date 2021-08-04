# Inventory Management App

##  Overview 

This App is intended to serve as an inventory management application for a store. The codes here powers
the backend functionality of the App. 

**Note: You can find the official postman documentation [HERE](https://documenter.getpostman.com/view/16946617/TzshGkDP)**

### What's possible?

1. Users can register an account through the signup route 
2. Only registered Users can:
    - sign into their account
    - update their details including adding a profile picture
    - delete their account
    - another user cannot update or delete another user's account
    - create a product and store details of the product on our database 
    - get all the products peculiar to his account (that is the ones they posted)
    - get only a single product from their products 
    - update and delete their products from the database 
    - Another user cannot update, get, or delete another user's product details 


## FOLDERS

### CONFIG
In this folder there's a **config.js** file where we set up our  cloud database (Mongo Atlas) using
its mongoose driver


###  Controllers

1. User Controllers

    - signUp: Allows users to create an account with an email which must be unique for each user a user 
            can choose to provide a profile picture or avatar during registration or provide one while 
            updating their details.

    - SignIn: Checks the login credentials (email and password) of the user with 
              the ones in our database and bounces off the user if they don't match, but if they do, it allows access for the user and generates a jwt token with which the user can access other protected routes. this token is stored as cookies. 

    - updateInfo: Allows users to update their info in the database. Here we use the user id we fetch via
                  the middleware **( req.user._id)** to ascertain if the logged in user is really the one trying to
                  update their info and not some malicious user who somehow got another user's id 

    - changePassword: Allow users to change their password, here user auntentication is also done as with updateInfo

    - deleteAccount: Allow users to delete their accounts from the database, here user auntentication is also 
                     done as with updateInfo

    - signOut: Deletes the cookies where the token is stored and so the user can no longer use that token to 
               access protected routes


2. Product controllers

    - createProduct: Only registered users can create a product. while saving the product details we attach the
                    logged in user's id to the product details. We get this id from **req.user._id** from the
                    middleware

    -  updateProduct: **req.user._id** grabs the logged in user's ID anytime the user accesses a protected route,
                      this is possible from the middleware, we then use this id together with the product id 
                      from **req.params.id** to query the database which allows us to update a particular product 
                      posted by a particular user

    - deleteProduct: **req.user._id** grabs the logged in user's ID anytime the user accesses a protected route,
                      this is possible from the middleware, we then use this id together with the product id 
                      from **req.params.id** to query the database which allows us to delete a particular product 
                      posted by a particular user
 
    - getUserProducts: **req.user._id** grabs the logged in user's ID anytime the user accesses a protected route,
                      this is possible from the middleware, we then use this id to query the products stored in 
                      database checking if there's a match with the userid attached to the products during creation
                      if there's a match we return all products posted by a particular user

    - getSingleProducts: **req.user._id** grabs the logged in user's ID anytime the user accesses a protected route,
                      this is possible from the middleware, we then use this id together with the product id 
                      from **req.params.id** to query the database which allows us to get a particular product posted
                      by a particular user



### Middlewares

- authenticateUser: verifies the token in the cookies, if not authentic, it denies access to the protected route
                    if authentic it allows access and stores the user id in **req.user**. the user id is the payload
                    with which the token was generated.

- express.json(): App level middleware to parse json data

- express.static(): App level middleware to make our image upload folders readable by users

- express.Router(): Router level middleware for routing.


### Models

- Product: Schema for the product data
- User:    Schema for user data

### Routes

1. User Routes
     - signUp : http://localhost:5000/api/v1/user/signup
          - request type: **POST**
            - Description: allow Users to create an account with Firstname, lastName, email, password, avatar,
                    businessName and phoneNo

     - signIn:  http://localhost:5000/api/v1/user/signin
          - request type: **POST**
            - Description: allow Users to log into their account with email and password

    - signOut:  http://localhost:5000/api/v1/user/signout
         - request type: **GET**
           - Description: allow Users to logout of their account 

    - updateInfo:  http://localhost:5000/api/v1/user/updateinfo/:id
         - request type: **PUT**
           - Description: allow Users to update their account info, upload a profile photo (avatar), 
                            **:id** is to be replaced with the User's account **ID**
    
    - changePassword: http://localhost:5000/api/v1/user/changepassword/:id
         - request type: **PUT**
           - Description: allow Users to change their account password by providing their oldPassword
                          and a newPassword, **:id** is to be replaced with the User's account **ID**

    - deleteAccount:  http://localhost:5000/api/v1/user/deleteaccount/:id
         - request type: **DELETE**
           - Description: allow Users to delete their account details from the database, 
                            **:id** is to be replaced with the User's account **ID**

2. Product Routes
    - createProduct : http://localhost:5000//api/user/products/
         - request type: **POST**
           - Description: allow Users to create a product with name, desc, price, noInStock, productImage,
                            and category. This product is stored in the specific user's account that posted it.

    - getUserProducts : http://localhost:5000//api/user/products/userproducts
         - request type: **GET**
           - Description: allow Users to fetch all their products from the database. 

    - getSingleProduct:  http://localhost:5000//api/user/products/:id
         - request type: **GET**
           - Description: allow Users to fetch a specific product from all their products in the database, 
                            **:id** is to be replaced with the Product's **ID**

    - updateProduct:  http://localhost:5000//api/user/products/:id
          - request type: **PUT**
            - Description: allow Users to update their product details in the database, and also change the 
                            product image. **:id** is to be replaced with the Product's **ID**

    - deleteProduct:  http://localhost:5000//api/user/products/:id
          - request type: **DELETE**
            - Description: allow Users to delete their product details from the database, and also change.
                            **:id** is to be    replaced with the Product's **ID**


### Uploads

1.  productImages: all product images uploaded by Users will live here

2.  userImages: all profile pictures (avatar) uploaded by users will live here


### Validations

1. Uservalidation: validates user's form field input against our Schema specifications during account 
                   registration and signin

2. productValidation: validates user's form field input against our Schema specifications during product creation


## Technologies Utilized

   - **Nodejs**
   - **Expressjs**
   - **Multer**
   - **Mongoose**
   - **MongoDB (Atlas)**

## Testing

 **POSTMAN:** User and Product details for account creation and product creation respectively can be entered
            using the **Form-Data** field of postman. Data from the **Form-Data** field is parsed by **Multer**


## Dependecies


- **bcrypt:** encrypts user's passwords
- **cookie-parser:** stores user's token
- **dotenv:** for environment variables
- **express:** server setup, middlewares e.t.c
- **joi:** data validation
- **jsonwebtoken:** generates token
- **mongoose:** MongoDB driver
- **multer:** image upload and form data parser


## Contributors

1. **Eravwuvieke Prosper Ilouoghene (Team Lead)**
2. **Ndu Shadrach**
3. **Ikechukwu Enuosa**





    




                    







