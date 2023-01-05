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
