const { Router } = require("express");

const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");
const subcategoryRouter = require("./subcategoryRouter");
const itemsRouter = require("./itemsRouter");
const dashboardRouter = require("./dashbordRouter");
const userRouter = require("./userRouter");
const router = Router();


router.use('/',dashboardRouter)
router.use("/user",userRouter)
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/subcategory",subcategoryRouter)
router.use("/items",itemsRouter)

module.exports = router;
