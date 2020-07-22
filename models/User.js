const mongoose = require("mongoose");
const db = mongoose.connection;

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  {
    collection: "testmg",
  }
);

module.exports = db.useDb("SE").model("User", UserSchema);
