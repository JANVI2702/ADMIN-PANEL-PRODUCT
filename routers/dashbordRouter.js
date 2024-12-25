const { Router } = require("express");
const  dashboardController  = require("../controllers/dashboardController");
const passport = require("passport")
const dashboardRouter = Router()

dashboardRouter.get('/',passport.userPassportAuth,dashboardController.dashboardPage)

module.exports = dashboardRouter