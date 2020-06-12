const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
<<<<<<< HEAD

{
    firstName:{type: String},
    lastName:{type:String},
    dateOfBirth:{type:Date},
    address:{type:String} ,
    hobbies:{type:String},
    occupation :{type:String},
=======
  {
    firstName: { type: String },
    lastname: { type: String },
    dateOfBirth: { type: Date },
    address: { type: String },
    hobbies: { type: String },
    occupation: { type: String },
>>>>>>> 80126b5772747c732f04fe92b71a3dc1357f1851
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
