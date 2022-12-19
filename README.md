## Developing an App that tracks inventory.

### Stack
- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB

### Notes: How to Register a user?
- First, check if the user already exists in our database. If they do, then trigger the error handler
- If not, then create a user with the data from the req.body object using the User model. Afterwards, add that user to the database.