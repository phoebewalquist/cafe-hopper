const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imgSchema = new Schema({
    image: [
          {
              type: String,
              validate: {
                  validator: function (value) {
                      const urlPattern = /(http|https):\/\/(\w+:{0,1}\w*#)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%#!\-/]))?/;
                      const urlRegExp = new RegExp(urlPattern);
                      return value.match(urlRegExp);
              },
                  message: props => `${props.value} is not a valid URL`
              }
          }
    ],
  },
  {
    timestamps: true,
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
    image: imgSchema,

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
 
    // image: String
    //feautures: String ?
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cafe", cafeSchema);
