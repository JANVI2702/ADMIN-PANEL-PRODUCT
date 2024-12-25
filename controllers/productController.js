const categoryModel = require("../models/categorySchema");
const product = require("../models/productSchema");
const fs = require("fs");
const subcategoryModel = require("../models/subcategorySchema");
const itemsModel = require("../models/itemsSchema");

module.exports.addproductPage = async (req, res) => {
  let categories = await categoryModel.find();
  let subcategories = await subcategoryModel.find();
  let items = await itemsModel.find()
  return res.render("./pages/add_product", { categories, subcategories, items });
};

module.exports.addproduct = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    console.log(req.body);
    await product.create(req.body);
    return res.redirect("/product/view_product");
  } catch (error) {
    console.log(error);
    return res.redirect(res.get("Referrer") || "/");
  }
};

module.exports.viewProductPage = async (req, res) => {
  try {
    let data = await product
      .find()
      .populate("categoryId")
      .populate("subcategoryId").populate("itemsId")
    console.log(data);
    return res.render("./pages/view_product", { data });
  } catch (error) {
    console.log(error);
    return res.render("./pages/view-product");
  }
};

module.exports.editProductPage = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = await product
      .findById(id)
      .populate("categoryId")
      .populate("subcategoryId").populate("itemsId")
    let categories = await categoryModel.find();
    let subcategories = await subcategoryModel.find();
    return res.render("./pages/edit_product", {
      product: productData,
      categories,
      subcategories,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.editProduct = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
      fs.unlinkSync(req.body.oldImage);
    } else {
      req.body.image = req.body.oldImage;
    }
    let productData = await product.findByIdAndUpdate(req.params.id, req.body);
    return res.redirect("/product/view_product");
  } catch (error) {
    console.log(error);
    return res.redirect("/product/view_product");
  }
};

module.exports.deletProduct = async (req, res) => {
  try {
    let deleteData = await product.findByIdAndDelete(req.params.id);
    console.log("product delete.");
    fs.unlinkSync(deleteData.image);
    return res.redirect(req.get("Referrer") || "/");
  } catch (error) {
    console.log(error);
    return res.redirect(req.get("Referrer") || "/");
  }
};
