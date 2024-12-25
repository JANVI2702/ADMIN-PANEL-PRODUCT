const categoryModel = require("../models/categorySchema")
const itemsModel = require("../models/itemsSchema")
const product = require("../models/productSchema")
const subcategoryModel = require("../models/subcategorySchema")

module.exports.dashboardPage=async(req,res)=>{
    try {
        const categories=await categoryModel.find()
        const subcategories=await subcategoryModel.find()
        const items=await itemsModel.find()
        const products=await product.find() .populate("categoryId")
      .populate("subcategoryId").populate("itemsId")

        const categorycount=categories.length
        const subcategorycount=subcategories.length
        const itemscount=items.length
        const productcount=products.length

        return res.render("index",{categories,subcategories,items,products,categorycount,subcategorycount,itemscount,productcount})
    } catch (error) {
        return res.status(500).send("Error Fetching Product")
    }
}