const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { register, getUser,changePassword, loginUser } = require("../controllers/user_controller");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/register", register);
router.post("/login", loginUser);
router.get("/get-users",auth, getUser);
router.put("/change-password",auth, changePassword);
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
