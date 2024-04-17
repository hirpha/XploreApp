const yup = require("yup");
const registerValidator = yup.object({
  phone_number: yup.string().min(10).max(15).required(),
  password: yup.string().min(4).max(32).required(),
  name: yup.string().min(4).max(32).required(),
  email: yup.string().email().min(8).max(132).required(),
});
module.exports = registerValidator;
