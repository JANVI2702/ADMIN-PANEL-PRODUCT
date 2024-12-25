const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const categoryRouter = Router();
const { uploadImage } = require("../middleware/uploadimage");

categoryRouter.get("/add_category", categoryController.addcategoryPage);
categoryRouter.post(
  "/add_category",
  uploadImage,
  categoryController.addcategory
);

categoryRouter.get("/view_category", categoryController.viewcategoryPage);

categoryRouter.get("/edit_category/:id", categoryController.editcategoryPage); // edit category page
categoryRouter.post("/edit_category/:id",uploadImage, categoryController.editcategory); 

categoryRouter.get("/delete_category/:id", categoryController.deletecategory); 

module.exports = categoryRouter;
