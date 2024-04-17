const yup = require("yup");
const changePasswordValidator = yup.object({
  new_password: yup.string().min(4).max(32).required(),
  old_password: yup.string().min(4).max(32).required(),
});
module.exports = changePasswordValidator;
