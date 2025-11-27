import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    content: {
      type: String,
      trim: true,
    },
    featuredImage: {
      type: String,
    },
    status: {
      type: "String",
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
