const { default: mongoose } = require("mongoose");

const itemsSchema = new mongoose.Schema({
  itemsname: {
    type: String,
    required: true,
  },
  image: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
   subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategoryTbl",
    },

});

const itemsModel = mongoose.model("itemsTbl", itemsSchema);

module.exports = itemsModel;