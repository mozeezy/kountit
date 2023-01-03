## Developing an App that tracks inventory.

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


Currently implementing: User profile creation.