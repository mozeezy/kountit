## Kountit: an application that allows businesses to track their inventory.

### Stack
- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB

### Notes: How to Register a user?
- First, check if the user already exists in our database. If they do, then trigger the error handler
- If not, then create a user with the data from the req.body object using the User model. Afterwards, add that user to the database.

### Notes: How To Login a user?
- To login, we have to check if the user already exists in our database.
- If the user exists, then we have to check if the entered password matches the hashed password stored in the database.
- If both of these conditions are true, then login is successful and a cookie is generated.

### Notes: How to Logout a user?
- Logging out is simple: just clear the cookie.

### Notes: How to create a user profile?
- We have to get the data for that specific user from our database.
- How? We have to use a middleware function that authorizes the user via a cookie.
- If a cookie exists, it means that the user is logged in. So in that instance, we send the data as a response to the frontend (except the password of course)

### Notes: How to change password?
- To change the password, the user must be logged in first. 
- We can use the authMiddleware authorize function to see if a user is logged in.
- Once the user is logged in, we need to check if the old password entered in the form matches the password in the database.
- If that is true, then we can update the old password in the database with the new password.
- The form to change password is going to look like this:

| Old Password | blah blah |
| New Password | blah blah blah |

### Notes: How to forget/reset password?
- When the user request the forgot password action, a POST request is fired and reset token is created and stored in the database.
- That token is then sent to the user's email as a link.
- Once the user clicks the link, another request is sent to a route that compares the token in the URI (i.e. from the req.params object) to the token that is stored in the database.
- If there's a match, then update the password with the new password.

## Routes pertaining to products

### Notes: How to create a product?
- According to the product model, each product has nine properties (refer to productModel.js for the schema).
- To create a product, the user must be logged in. This route is protected by the authorize function in the authMiddleware.js file. This ensures that the user is logged in before accessing this route.
- Once the user is logged in they can send a POST request with all the properties for the product schema.
- That product is then created and added to the MongoDB database.

### Notes: How to fetch all products?
- To fetch all products, we must ensure that user is logged in. Once again, this route is protected by the authorize function which ensures that the user is logged in before they can view the products they have created.
- From there, it's a simple GET request to the MongoDB database with the user id.
- This route then sends json data as the response which can then be used by the front-end to display the data.


### Notes: How to fetch a single product?
- After the user is logged in, we can fetch the product id from the req.params object.
- From there, we have to authenticate whether the user associated with that product and the user accessing that data are the same user. Remember, this route is protected by the authorize function which means that we can access the req.user object from this route.
- We also have to authenticate whether the product exist in our database.
- If the above 2 are true, we can make a GET request to the database and then send json data about that product as part of the response object.

### Notes: How to delete a product?
- Exactly the same fetching the single product, but instead it's a DELETE request.
