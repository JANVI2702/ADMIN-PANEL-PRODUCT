const user = require("../models/userSchema");
const nodemailer = require("nodemailer");

module.exports.signupPage = (req, res) => {
  return res.render("./pages/signup");
};

module.exports.signup = async (req, res) => {
  try {
    console.log(req.body);
    let data = await user.create(req.body);
    console.log("User Created.");
    return res.redirect("/user/login");
  } catch (error) {
    console.log(error);
    return res.redirect("/user/login");
  }
};

module.exports.loginPage = (req, res) => {
  return res.render("./pages/login");
};

module.exports.profilePage = (req, res) => {
  let user = req.user || {};
  return res.render("./pages/profile", {
    user,
  });
};

module.exports.editUserDetail = async (req, res) => {
    try {
        const { username, email, phone } = req.body
        let { id } = req.params
        let data = await user.findByIdAndUpdate(id, req.body)
        await data.save()
        req.flash('success','User Detail is Updated')
        return res.redirect("/user/profile")
    } catch (error) {
        console.log(error)
        return res.redirect("/user/profile")
    }
}

module.exports.logout = (req, res) => {
  req.logout(() => {
    return res.redirect("/user/login");
  });
};

module.exports.changepassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    let { id } = req.params;
    let User = await user.findById(id);

    if (User.password === oldPassword) {
      if (newPassword == confirmPassword) {
        User.password = newPassword;
        console.log(User.password);
        await User.save();
        return res.redirect("/user/logout");
      }
    }

    return res.redirect("/user/profile");
  } catch (error) {
    console.log(error);
    return res.redirect("/user/profile");
  }
};

module.exports.recoverPassword = async (req, res) => {
  try {
    let { email } = req.body;

    let User = await user.findOne({ email: email });
    let otp = Math.floor(Math.random() * 900000) + 100000;
    console.log(otp);

    if (User) {
      User.otp = otp;
      await User.save();
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: "janviraghvani6708@gmail.com",
          pass: "qgggmchbrhfdhvhi",
        },
      });

      const info = await transporter.sendMail({
        from: "<janviraghvani6708@gmail.com>", // sender address
        to: `${User.email}`, // list of receivers
        subject: "Enter OTP to recover password", // Subject line
        html: `<b>Do not Share your One time password (OTP):${otp}</b>`, // html body
      });
      if (info.messageId) {
        res.cookie("otp", otp);
        res.cookie("email", JSON.stringify({ User: User.email }));
      }

      console.log("Message sent: %s", info.messageId);
      return res.redirect("/user/otpverification");
    } else {
      console.log("User not found");
      return res.redirect(req.get("Referrer") || "/");
    }
  } catch (error) {
    console.log(error);
    return res.redirect(req.get("Referrer") || "/");
  }
};

// email verification

module.exports.emailVeriPage = (req, res) => {
  return res.render("./pages/emailVerification");
};

// otp page

module.exports.otpPage = (req, res) => {
  return res.render("./pages/otpverification");
};

module.exports.verifyOtp = (req, res) => {
  if (req.body.otp == req.cookies.otp) {
    res.clearCookie("otp");
    res.redirect("/user/changepswd");
  }
};

// change pasword page

module.exports.changepswdPage = (req, res) => {
  return res.render("./pages/changepswd");
};

module.exports.changepswd = async (req, res) => {
  try {
    const emailCookie = req.cookies.email;
    const email = JSON.parse(emailCookie).User;
    let { newPassword, confirmPassword } = req.body;
    let User = await user.findOne({ email });

    if (newPassword == confirmPassword) {
      User.password = newPassword;
      await User.save();
      res.clearCookie("email");
      return res.redirect("/user/login");
    } else {
      return res.redirect(req.get("Referrer") || "/");
    }
  } catch (error) {
    console.log(error);
    return res.redirect(req.get("Referrer") || "/");
  }
};
