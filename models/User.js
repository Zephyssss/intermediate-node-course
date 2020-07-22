const mongoose = require("mongoose");
const db = mongoose.connection;

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    collection: "testmg",
  }
);

module.exports = db.useDb("SE").model("User", UserSchema);
