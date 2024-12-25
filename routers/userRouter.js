const { Router } = require("express");
const userController = require("../controllers/userController");
const passport = require("passport");

const userRouter = Router();

userRouter.get("/signup", userController.signupPage);
userRouter.post("/signup", userController.signup);

userRouter.get("/login", userController.loginPage);
userRouter.post(
  "/login",
  passport.authenticate("user", {
    failureRedirect: "/user/login",
    successRedirect: "/",
  })
);
userRouter.get("/emailverification", userController.emailVeriPage);
userRouter.post("/recover", userController.recoverPassword);

userRouter.get("/otpverification", userController.otpPage);
userRouter.post("/otpverification", userController.verifyOtp);

userRouter.get("/changepswd", userController.changepswdPage);
userRouter.post("/changepswd", userController.changepswd);

userRouter.get(
  "/profile",
  passport.userPassportAuth,
  userController.profilePage
);

userRouter.get("/logout", userController.logout);
userRouter.get('/profile', passport.userPassportAuth, userController.profilePage)

userRouter.post("/change-pass/:id", userController.changepassword)
userRouter.post('/edit-user-detail/:id', userController.editUserDetail)

module.exports = userRouter;
