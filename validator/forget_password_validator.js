const yup = require("yup");
const forgetPasswordValidator = yup.object({
  new_password: yup.string().min(4).max(32).required(),
  confirm_password: yup.string().min(4).max(32).required(),
});
module.exports = forgetPasswordValidator;
