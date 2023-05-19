const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    content: { type: String, required: true },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: String,
    userAvatar: String,
  },
  {
    timestamps: true,
  }
);

const cafeSchema = new Schema(
  {
    title: { type: String, required: true },
    reviews: [reviewSchema],
    features: [String],
  },
  {
    timestamps: true,
  }
);

const Cafe = mongoose.model("Cafe", cafeSchema);

module.exports = Cafe;
