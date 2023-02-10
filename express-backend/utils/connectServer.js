const mongoose = require("mongoose");
const { app } = require("../server");
// Connect to MongoDB Database

const connectServer = () => {
  mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(() => {
      app.listen(PORT, () => {
        console.log(`App is running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { connectServer };
