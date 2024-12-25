const categoryModel = require("../models/categorySchema");
const fs = require("fs");

module.exports.addcategoryPage = (req, res) => {
  return res.render("./pages/add_category");
};

module.exports.addcategory = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    await categoryModel.create(req.body);
    return res.redirect("/category/view_category");
  } catch (error) {
    console.log(error);
    return res.redirect(res.get("Referrer") || "/");
  }
};
module.exports.viewcategoryPage = async (req, res) => {
  try {
    let categories = await categoryModel.find();
    return res.render("./pages/view_category", { categories });
  } catch (error) {
    console.log(error);
    return res.render("./pages/view_category");
  }
};

module.exports.editcategoryPage = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryData = await categoryModel.findById(id);
    return res.render("./pages/edit_category", { category: categoryData });
  } catch (error) {
    console.log(error);
  }
};

module.exports.editcategory = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
      fs.unlinkSync(req.body.oldImage);
    } else {
      req.body.image = req.body.oldImage;
    }
    let categoryData = await categoryModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    return res.redirect("/category/view_category");
  } catch (error) {
    console.log(error);
    return res.redirect("/category/view_category");
  }
};

module.exports.deletecategory = async (req, res) => {
  try {
    let deleteData = await categoryModel.findByIdAndDelete(req.params.id);
    console.log("category deleted");
    fs.unlinkSync(deleteData.image);
    return res.redirect(req.get("Referrer") || "/");
  } catch (error) {
    console.log(error);
    return res.redirect(req.get("Referrer") || "/");
  }
};
