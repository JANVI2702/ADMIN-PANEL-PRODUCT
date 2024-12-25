const { default: mongoose } = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  subcategoryname: {
    type: String,
    required: true,
  },
  image: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const subcategoryModel = mongoose.model("subCategoryTbl", subcategorySchema);

module.exports = subcategoryModel;
