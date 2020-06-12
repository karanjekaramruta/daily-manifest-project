const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(

{
  
    firstName: { type: String, default:"" },
    lastName: { type: String, default:"" },
    dateOfBirth: { type: Date,default:"" },
    address: { type: String, default:"" },
    hobbies: { type: String, default:"" },
    occupation: { type: String, default:"" },
    profilePicture: {
      type: String,
      default: "images/default.png",
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      // this match will disqualify all the emails with accidental empty spaces, missing dots in front of (.)com and the ones with no domain at all
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    goals:[{type:mongoose.Schema.Types.ObjectId, ref:"Goal"}]
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
