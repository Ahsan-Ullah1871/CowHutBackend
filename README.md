# Introduction

Welcome to the Online Cow Selling Backend for Eid Ul Adha! This assignment focuses on building a robust backend system for an Online Cow Selling platform in preparation for the festive occasion of Eid Ul Adha.

The primary objective of this assignment is to implement a range of essential features that will ensure a smooth and efficient user experience. These features include error handling, CRUD operations, pagination and filtering, transactions (including a simple transaction without a payment gateway), and the ability to add additional routes as necessary. By accomplishing these tasks, we aim to create a reliable and user-friendly platform that facilitates the buying and selling of cows during this special time.

These docs describe how to use the [CowHut](https://cow-hut-sand.vercel.app/) API. We hope you enjoy these docs, and please don't hesitate to [file an issue](https://github.com/Programming-Hero-Web-Course4/l2a3-cow-hut-backend-assignment-Ahsan-Ullah1871/issues) if you see anything missing.

## Use Cases

1. **User Registration:**

   - User can request for signup.
   - User enters their personal information such as name, phone number ,and password etc.
   - Backend validates the information ,unique phone number and creates a new user account.

2. **Cow Listing Creation:**

   - Seller type enters details about the cow, such as name, breed, age, price, label and location etc.
   - Backend validates the information and creates a new cow listing.
   - The newly created cow listing is now available for potential buyers to punches.

3. **Cow Listing Update:**

   - Seller can edits the information of the cow, such as updating the price or location.
   - Backend validates the changes and updates the cow listing.
   - The updated information is now reflected on the cow response.

4. **Cow Listing Deletion:**

   - Seller can selects the cow to delete.
   - Backend confirms the deletion and removes the cow listing from the platform.
   - The cow listing is no longer available for viewing by response.

5. **Cow Search and Filter:**

   - Buyer enters search criteria, such as breed or price range, in the search bar.
   - Backend performs a search and displays a list of relevant cow listings.
   - Buyer can further filter the results based on additional criteria.
   - The platform presents the filtered cow listings to the buyer for review.

6. **Transaction Initiation:**

   - Buyer selects a cow listing they are interested in start a order request
   - Backend initiates the transaction process.
   - Backend will validate buyer budget and cow price

7. **Transaction Completion:**
   - Budget will decrease from buyer side as per cow price
   - Seller income will increase as per cow price.
   - Backend updates the status of the cow label to "sold out".
   - Finally order will create successfully

### Live Link:

```http
   https://cow-hut-sand.vercel.app/
```

<!-- [Download postman file from here](./Cow%20Hut.postman_collection.json) -->

<br/>

### Admin

- <h3>Signup new admin</h3>

  ```http
  POST /api/v1/admins/create-admin
  ```

  **Body:**
  The request body should be a JSON object with the following properties:

  | properties    | Type         | Description                       |
  | ------------- | ------------ | --------------------------------- |
  | `phoneNumber` | `string`     | The phone number of the admin.    |
  | `role`        | `IUser_role` | The role of the admin is "admin". |
  | `password`    | `string`     | The password of the admin.        |
  | `name`        | `object`     | The name of the admin.            |
  | `address`     | `string`     | The address of the admin.         |

  ```json

  // request body
  {
  "password":"abrakadabra",
  "role": "admin",
     "name":{
        "firstName": "Mr. Babull",
        "lastName": "Bro"
     },
  "phoneNumber":"01711111111",
  "address": "Chattogram",
   }

  //Responses
  {
     "statusCode":200,
     "success": true,
     "message": "",
     "data": {},
  }

  ```

- <h3>login admin</h3>

  ```http
  POST /api/v1/admins/login
  ```

  **Body:**
  The request body should be a JSON object with the following properties:

  | properties    | Type     | Description                    |
  | ------------- | -------- | ------------------------------ |
  | `phoneNumber` | `string` | The phone number of the admin. |
  | `password`    | `string` | The password of the admin.     |

  ```json

  // request body
  {
  "password":"abrakadabra",
  "phoneNumber":"01711111111",
  }

  //Responses
  {
     "statusCode":200,
     "success": true,
     "message": "",
     "data": {
      "accessToken":""
     },
  }

  ```

- <h3>refresh token</h3>

  ```http
  POST /api/v1/admins/refresh-token
  ```

  **Body:**
  The request cookies properties:

  | properties     | Type     | Description                               |
  | -------------- | -------- | ----------------------------------------- |
  | `refreshToken` | `string` | The refresh token which saved in cookies. |

  ```json
  //Responses
  {
    "statusCode": 200,
    "success": true,
    "message": "",
    "data": {
      "accessToken": ""
    }
  }
  ```

### Auth

- <h3>Signup new user</h3>

  ```http
  POST /api/v1/auth/signup
  ```

  **Body:**
  The request body should be a JSON object with the following properties:

  | properties    | Type         | Description                                |
  | ------------- | ------------ | ------------------------------------------ |
  | `phoneNumber` | `string`     | The phone number of the user.              |
  | `role`        | `IUser_role` | The role of the user. [(see here)](#Types) |
  | `password`    | `string`     | The password of the user.                  |
  | `name`        | `object`     | The name of the user.                      |
  | `address`     | `string`     | The address of the user.                   |
  | `budget`      | `number`     | (Optional) The budget of the user.         |
  | `income`      | `number`     | (Optional) The income of the user.         |

  ```json

  // request body
  {
  "password":"abrakadabra",
  "role": "seller",
     "name":{
        "firstName": "Mr. Babull",
        "lastName": "Bro"
     },
  "phoneNumber":"01711111111",
  "address": "Chattogram",
  "budget":0,
  "income":0,
  }

  //Responses
  {
     "statusCode":200,
     "success": true,
     "message": "",
     "data": {},
  }

  ```

- <h3>login user</h3>

  ```http
  POST /api/v1/auth/login
  ```

  **Body:**
  The request body should be a JSON object with the following properties:

  | properties    | Type     | Description                   |
  | ------------- | -------- | ----------------------------- |
  | `phoneNumber` | `string` | The phone number of the user. |
  | `password`    | `string` | The password of the user.     |

  ```json

  // request body
  {
  "password":"abrakadabra",
  "phoneNumber":"01711111111",
  }

  //Responses
  {
     "statusCode":200,
     "success": true,
     "message": "",
     "data": {
      "accessToken":""
     },
  }

  ```

- <h3>refresh token</h3>

  ```http
  POST /api/v1/auth/refresh-token
  ```

  **Body:**
  The request cookies properties:

  | properties     | Type     | Description                               |
  | -------------- | -------- | ----------------------------------------- |
  | `refreshToken` | `string` | The refresh token which saved in cookies. |

  ```json
  //Responses
  {
    "statusCode": 200,
    "success": true,
    "message": "",
    "data": {
      "accessToken": ""
    }
  }
  ```

### User

- <h3>All users</h3>

  ```http
  GET /api/v1/users
  ```

  **Headers:**
  | Parameter | Type | Description |
  | ------------- | ------------ | ----------------------------------|
  | `authorization` | `string` | accessToken which get after login |

  **Params:**
  The request params properties:

  | Parameter     | Type         | Description                                           |
  | ------------- | ------------ | ----------------------------------------------------- |
  | `phoneNumber` | `string`     | (Optional) The phone number of the user.              |
  | `role`        | `IUser_role` | (Optional) The role of the user. [(see here)](#Types) |
  | `address`     | `string`     | (Optional) The password of the user.                  |
  | `searchTerm`  | `string`     | (Optional) Search key.                                |

  ```http
  //Responses
  {
     "statusCode":200,
     "success": true,
     "message": "",
     "data": [{},{}],
  }

  ```

- <h3>User Details</h3>

  ```http
  GET /api/v1/users/{ user_id }

  <!--example  -->
  GET /api/v1/users/648f0f9e196c06e2afaea12d

  ```

  **Headers:**
  | Parameter | Type | Description |
  | ------------- | ------------ | ----------------------------------|
  | `authorization` | `string` | accessToken which get after login |

  **Params:**
  The request params properties:

  | Parameter | Type     | Description           |
  | --------- | -------- | --------------------- |
  | `user_id` | `string` | The \_id of the user. |

  ```http
  //Responses
  {
     "statusCode":200,
     "success": true,
     "message": "",
     "data": {},
  }

  ```

- <h3>Update user</h3>

  ```http
  PATCH /api/v1/users/{ user_id }

  <!--example  -->
  PATCH /api/v1/users/648f0f9e196c06e2afaea12d
  ```

  **Headers:**
  | Parameter | Type | Description |
  | ------------- | ------------ | ----------------------------------|
  | `authorization` | `string` | accessToken which get after login |

  **Params:**
  The request params properties:

  | Parameter | Type     | Description           |
  | --------- | -------- | --------------------- |
  | `user_id` | `string` | The \_id of the user. |

  **Body:**
  The request body should be a JSON object with the following properties:

  | properties    | Type         | Description                                           |
  | ------------- | ------------ | ----------------------------------------------------- |
  | `phoneNumber` | `string`     | (Optional) The phone number of the user.              |
  | `role`        | `IUser_role` | (Optional) The role of the user. [(see here)](#Types) |
  | `password`    | `string`     | (Optional) The password of the user.                  |
  | `name`        | `object`     | (Optional) The name of the user.                      |
  | `address`     | `string`     | (Optional) The address of the user.                   |
  | `budget`      | `number`     | (Optional) The budget of the user.                    |
  | `income`      | `number`     | (Optional) The income of the user.                    |

  ```http
  //Responses
  {
     "statusCode":200,
     "success": true,
     "message": "",
     "data": {},
  }

  ```

- <h3>Delete user</h3>

  ```http
  Delete /api/v1/users/{ user_id }

  <!--example  -->
  DELETE /api/v1/users/648f0f7b196c06e2afaea128
  ```

  **Headers:**
  | Parameter | Type | Description |
  | ------------- | ------------ | ----------------------------------|
  | `authorization` | `string` | accessToken which get after login |

  **Params:**
  The request params properties:

  | Parameter | Type     | Description           |
  | --------- | -------- | --------------------- |
  | `user_id` | `string` | The \_id of the user. |

  ```http
  //Responses
  {
     "statusCode":200,
     "success": true,
     "message": "",
     "data": {},
  }

  ```

### Cow

- <h3>Create cow</h3>

  ```http
  POST /api/v1/cows
  ```

  **Headers:**
  | Parameter | Type | Description |
  | ------------- | ------------ | ----------------------------------|
  | `authorization` | `string` | accessToken which get after login |

  **Body:**
  The request body should be a JSON object with the following properties:

  | Property   | Type             | Description                                             |
  | ---------- | ---------------- | ------------------------------------------------------- |
  | `name`     | `string`         | The name of the cow.                                    |
  | `age`      | `number`         | The age of the cow in years.                            |
  | `price`    | `number`         | The price of the cow.                                   |
  | `location` | `ILocations`     | The location of the cow. [(see here)](#Types)           |
  | `breed`    | `string`         | The breed of the cow.                                   |
  | `weight`   | `number`         | The weight of the cow.                                  |
  | `label`    | `ICowLabel`      | The label associated with the cow. [(see here)](#Types) |
  | `category` | `ICowCategories` | The category of the cow. [(see here)](#Types)           |
  | `seller`   | `string`         | The identifier of the seller of the cow.                |

  ```json

  // request body example
  {
  "name": "Bella",
  "age": 4,
  "price": 5000,
  "location": "Dhaka",
  "breed": "Brahman",
  "weight": 400,
  "label": "for sale",
  "category": "Beef",
  "seller": "609c17fc1281bb001f523456"
  }

  //Responses
  {
     "statusCode":200,
     "success": true,
     "message": "",
     "data": {},
  }

  ```

- <h3>All cows</h3>

  ```http
  GET /api/v1/cows

  <!--example  -->
  GET /api/v1/cows/?minPrice=2000&maxPrice=40000
  GET api/v1/cows?pag=1&limit=10
  GET api/v1/cows?sortBy=price&sortOrder=asc
  GET api/v1/cows?minPrice=20000&maxPrice=70000
  GET api/v1/cows?location=Chattogram
  GET api/v1/cows?searchTerm=Cha
  ```

  **Headers:**
  | Parameter | Type | Description |
  | ------------- | ------------ | ----------------------------------|
  | `authorization` | `string` | accessToken which get after login |

  **Params (filter):**

  | Filter Parameters | Type   | Description                         |
  | ----------------- | ------ | ----------------------------------- |
  | `minPrice`        | number | (Optional) Min. price.              |
  | `maxPrice`        | number | (Optional)Max. price.               |
  | `location`        | string | (Optional) The location of the cow. |
  | `searchTerm`      | string | (Optional) search key.              |

  **Params (pagination):**
  | Pagination Parameters | Type | Description |
  | --------------------- | ------ | ----------------------- |
  | `page` | number | (Optional) page number. |
  | `limit` | number | (Optional) limit. |
  | `sortBy` | string | (Optional) sort by |
  | `sortOrder` | string | (Optional) sort order |

  ```http
  //Responses
  {
     "statusCode":200,
     "success": true,
     "message": "",
     "data": [{},{}],
  }

  ```

- <h3>Cow details</h3>

  ```http
  GET /api/v1/cows/{ cow_id }

  <!--example  -->
  GET /api/v1/cows/648f11ae84bf0b12abe9ccda
  ```

  **Headers:**
  | Parameter | Type | Description |
  | ------------- | ------------ | ----------------------------------|
  | `authorization` | `string` | accessToken which get after login |

  **Params:**
  The request params properties:
  | Parameter | Type | Description |
  | --------- | -------- | -------------------- |
  | `cow_id` | `string` | The \_id of the cow. |

  ```http
  //Responses
  {
     "statusCode":200,
     "success": true,
     "message": "",
     "data":{},
  }

  ```

- <h3>Update cow</h3>

  ```http
  PATCH /api/v1/cows/{ cow_id }

  <!--example  -->
  PATCH /api/v1/cows/648f11ae84bf0b12abe9ccda
  ```

  **Headers:**
  | Parameter | Type | Description |
  | ------------- | ------------ | ----------------------------------|
  | `authorization` | `string` | accessToken which get after login |

  **Params:**
  The request params properties:
  | Parameter | Type | Description |
  | --------- | -------- | -------------------- |
  | `cow_id` | `string` | The \_id of the cow. |

  **Body:**
  The request body should be a JSON object with the following properties:

  | Property   | Type             | Description                                                        |
  | ---------- | ---------------- | ------------------------------------------------------------------ |
  | `name`     | `string`         | (optional) The name of the cow.                                    |
  | `age`      | `number`         | (optional) The age of the cow in years.                            |
  | `price`    | `number`         | (optional) The price of the cow.                                   |
  | `location` | `ILocations`     | (optional) The location of the cow. [(see here)](#Types)           |
  | `breed`    | `string`         | (optional) The breed of the cow.                                   |
  | `weight`   | `number`         | (optional) The weight of the cow.                                  |
  | `label`    | `ICowLabel`      | (optional) The label associated with the cow. [(see here)](#Types) |
  | `category` | `ICowCategories` | (optional) The category of the cow. [(see here)](#Types)           |
  | `seller`   | `string`         | (optional) The identifier of the seller of the cow.                |

  ```http
  //Responses
  {
     "statusCode":200,
     "success": true,
     "message": "",
     "data": {},
  }

  ```

- <h3>Delete cow</h3>

  ```http
  DELETE /api/v1/cows/ { cow_id }

  <!--example  -->
  DELETE /api/v1/cows/648f11a084bf0b12abe9ccd7
  ```

  **Headers:**
  | Parameter | Type | Description |
  | ------------- | ------------ | ----------------------------------|
  | `authorization` | `string` | accessToken which get after login |

  **Params:**
  The request params properties:
  | Parameter | Type | Description |
  | --------- | -------- | -------------------- |
  | `cow_id` | `string` | The \_id of the cow. |

  ```http
  //Responses
  {
     "statusCode":200,
     "success": true,
     "message": "",
     "data": {},
  }

  ```

### Order

- <h3>Create order</h3>

  ```http
  POST /api/v1/orders
  ```

  **Headers:**
  | Parameter | Type | Description |
  | ------------- | ------------ | ----------------------------------|
  | `authorization` | `string` | accessToken which get after login |

  **Params:**
  The request body should be a JSON object with the following properties:

  | Property | Type     | Description          |
  | -------- | -------- | -------------------- |
  | `cow`    | `string` | The id of the cow.   |
  | `buyer`  | `number` | The id of the buyer. |

  ```json

  // request body example
  {
  "cow":"648f11a084bf0b12abe9ccd7",
  "buyer":"648f0f73196c06e2afaea125",
  }

  //Responses
  {
     "statusCode":200,
     "success": true,
     "message": "",
     "data": {},
  }

  ```

- <h3>All Orders</h3>

  ```http
  POST /api/v1/orders
  ```

  **Headers:**
  | Parameter | Type | Description |
  | ------------- | ------------ | ----------------------------------|
  | `authorization` | `string` | accessToken which get after login |

  ```
  //Responses
  {
  "statusCode":200,
  "success": true,
  "message": "",
  "data": [{},{}]
  }

  ```

- <h3>Order details</h3>

  ```http
  GET /api/v1/orders/{ order_id }

  <!--example  -->
  GET /api/v1/orders/648f11ae84bf0b12abe9ccda
  ```

  **Headers:**
  | Parameter | Type | Description |
  | ------------- | ------------ | ----------------------------------|
  | `authorization` | `string` | accessToken which get after login |

  **Params:**
  The request params properties:
  | Parameter | Type | Description |
  | --------- | -------- | -------------------- |
  | `order_id`| `string` | The \_id of the order. |

  ```http
  //Responses
  {
     "statusCode":200,
     "success": true,
     "message": "",
     "data":{},
  }

  ```

### Types

- IUser_role

  ```
  type IUser_role = 'seller' | 'buyer' | "admin"

  ```

- ILocations

  ```
  type ILocations =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh'

  ```

- ICowCategories & ICowLabel

  ```
  type ICowCategories = 'Dairy' | 'Beef' | 'DualPurpose'
  type ICowLabel = 'for sale' | 'sold out'
  ```
