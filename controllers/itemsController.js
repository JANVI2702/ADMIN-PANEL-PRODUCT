const categoryModel = require("../models/categorySchema");
const subcategoryModel = require("../models/subcategorySchema");
const itemsModel = require("../models/itemsSchema")
const fs = require("fs");

module.exports.additemsPage = async (req, res) => {
  let categories = await categoryModel.find();
  let subcategories = await subcategoryModel.find()
  return res.render("./pages/add_items", { categories,subcategories });
};
module.exports.additems = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    await itemsModel.create(req.body);
    return res.redirect("/items/view_items");
  } catch (error) {
    console.log(error);
    return res.redirect(res.get("Referrer") || "/");
  }
};

module.exports.viewitemsPage = async (req, res) => {
  try {
    let data = await itemsModel.find().populate("categoryId").populate("subcategoryId");
    return res.render("./pages/view_items", { data });
  } catch (error) {
    console.log(error);
    return res.render("./pages/view_items");
  }
};

module.exports.edititemsPage = async (req, res) => {
  try {
    const { id } = req.params;
    const itemsData = await itemsModel.findById(id);
    const categories = await categoryModel.find();
    const subcategories = await  subcategoryModel.find()
    return res.render("./pages/edit_items", {
      items: itemsData ,
      categories,subcategories,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.edititems = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
      fs.unlinkSync(req.body.oldImage);
    } else {
      req.bodyimage = req.body.oldImage;
    }
    let itemsData = await itemsModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    return res.redirect("/items/view_items");
  } catch (error) {
    console.log(error);
    return res.redirect("/items/view_items");
  }
};

module.exports.deleteitems = async (req, res) => {
  try {
    let deletdata = await itemsModel.findByIdAndDelete(req.params.id);
    console.log("data deleted");
    fs.unlinkSync(deletdata.image);
    return res.redirect(req.get("Referrer") || "/");
  } catch (error) {
    console.log(error);
    return res.redirect(req.get("Referrer") || "/");
  }
};
