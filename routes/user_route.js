const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  register,
  getUser,
  changePassword,
  loginUser,
  forgetPassword,
  getUsers,
} = require("../controllers/user_controller");

const multer = require("multer");
const Validator = require("../middleware/validator");
const loginWithPhoneNumberSchema = require("../validator/login_with_phone_number");
const registerValidator = require("../validator/register_validator");
const changePasswordValidator = require("../validator/change_password_validator");
const forgetPasswordValidator = require("../validator/forget_password_validator");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/register", Validator(registerValidator), register);
router.post("/login", Validator(loginWithPhoneNumberSchema), loginUser);
router.post(
  "/forget-password",
  Validator(forgetPasswordValidator),
  auth,
  forgetPassword
);
router.get("/get-users", auth, getUsers);
router.get("/get-user", auth, getUser);
router.put(
  "/change-password",
  Validator(changePasswordValidator),
  auth,
  changePassword
);
//router.post('/startTextChat', startTextChat);
// router.post('/fetchAppointments', fetchAppointments)
// router.post('/createPost', auth, upload.single('postImage'), createPost)
// router.get('/fetchPosts', getAllPosts)
// router.get('/getMyPosts', auth, getMyPosts)
// router.post('/deletePost', deletePost)
// router.post('/confirmPassword', confirmPassword)
// router.post('/updateUserInfo', updateUserInfo)
// router.post('/deleteAppointment', deleteAppointment);
// router.post('/forgotPassword', forgotPassword);
// router.post('/resetPassord', resetPassord);

module.exports = router;
