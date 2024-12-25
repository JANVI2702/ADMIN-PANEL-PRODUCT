const categoryModel = require("../models/categorySchema");
const subcategoryModel = require("../models/subcategorySchema");
const fs = require("fs");

module.exports.addsubcategoryPage = async (req, res) => {
  let categories = await categoryModel.find();
  return res.render("./pages/add_subcategory", { categories });
};
module.exports.addsubcategory = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    await subcategoryModel.create(req.body);
    return res.redirect("/subcategory/view_subcategory");
  } catch (error) {
    console.log(error);
    return res.redirect(res.get("Referrer") || "/");
  }
};

module.exports.viewsubcategoryPage = async (req, res) => {
  try {
    let data = await subcategoryModel.find().populate("categoryId");
    return res.render("./pages/view_subcategory", { data });
  } catch (error) {
    console.log(error);
    return res.render("./pages/view_subcategory");
  }
};

module.exports.editsubcategoryPage = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategoryData = await subcategoryModel.findById(id);
    const categories = await categoryModel.find();
    return res.render("./pages/edit_subcategory", {
      subcategory: subcategoryData,
      categories,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.editsubcategory = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
      fs.unlinkSync(req.body.oldImage);
    } else {
      req.bodyimage = req.body.oldImage;
    }
    let subcategoryData = await subcategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    return res.redirect("/subcategory/view_subcategory");
  } catch (error) {
    console.log(error);
    return res.redirect("/subcategory/view_subcategory");
  }
};

module.exports.deletesubcategory = async (req, res) => {
  try {
    let deletdata = await subcategoryModel.findByIdAndDelete(req.params.id);
    console.log("data deleted");
    fs.unlinkSync(deletdata.image);
    return res.redirect(req.get("Referrer") || "/");
  } catch (error) {
    console.log(error);
    return res.redirect(req.get("Referrer") || "/");
  }
};
