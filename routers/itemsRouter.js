const { Router } = require("express");
const itemsController = require("../controllers/itemsController");
const itemsRouter = Router();
const { uploadImage } = require("../middleware/uploadimage");

itemsRouter.get(
  "/add_items",
  itemsController.additemsPage
);
itemsRouter.post(
  "/add_items",
  uploadImage,
  itemsController.additems
);

itemsRouter.get(
  "/view_items",
  itemsController.viewitemsPage
);

itemsRouter.get(
  "/edit_items/:id",
  itemsController.edititemsPage
);
itemsRouter.post("/edit_items/:id",uploadImage,itemsController.edititems);

itemsRouter.get(
  "/delete_items/:id",
  itemsController.deleteitems
);

module.exports = itemsRouter;
