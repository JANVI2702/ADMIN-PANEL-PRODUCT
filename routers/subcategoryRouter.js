const { Router } = require("express");
const subcategoryController = require("../controllers/subcategoryController");
const subcategoryRouter = Router();
const { uploadImage } = require("../middleware/uploadimage");

subcategoryRouter.get(
  "/add_subcategory",
  subcategoryController.addsubcategoryPage
);
subcategoryRouter.post(
  "/add_subcategory",
  uploadImage,
  subcategoryController.addsubcategory
);

subcategoryRouter.get(
  "/view_subcategory",
  subcategoryController.viewsubcategoryPage
);

subcategoryRouter.get(
  "/edit_subcategory/:id",
  subcategoryController.editsubcategoryPage
);
subcategoryRouter.post("/edit_subcategory/:id",uploadImage,subcategoryController.editsubcategory);

subcategoryRouter.get(
  "/delete_subcategory/:id",
  subcategoryController.deletesubcategory
);

module.exports = subcategoryRouter;
