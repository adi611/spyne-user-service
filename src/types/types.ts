import mongoose from "mongoose";

export type TUser = {
    name: String;
    email: String;
    mobile: String;
    password: String;
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
  };