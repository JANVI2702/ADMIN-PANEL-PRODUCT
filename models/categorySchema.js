const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryname: {
    type: String,
    required: true,
  },
  image: String,
});

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
