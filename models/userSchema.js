const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
    role: {
      type: String,
      default: "user",
    },
    phone: Number,
    otp:Number
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("user", userSchema);

module.exports = user;
