const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imgSchema = new Schema({
  image: {
    data: String,
    contentType: String,
  },
});

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
      imgSchema,
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
    //title change to name if err
    // image: String
    //feautures: String ?
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cafe", cafeSchema);
