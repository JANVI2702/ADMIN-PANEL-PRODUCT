const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    image: String,
    name: String,
    price: Number,
    description: String,
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategoryTbl",
    },
    itemsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "itemsTbl",
    },
  },
  {
    timestamps: true,
  }
);

const product = mongoose.model("product", productSchema);

module.exports = product;
