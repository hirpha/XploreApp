const jwt = require("jsonwebtoken");

const generateAuthToken = (id) => {
  const token = jwt.sign({ _id: id }, "XploreApp");
  const t = jwt.verify(token, "XploreApp");
  console.log(t._id);
  console.log(id);
  return token;
};

module.exports = {
  generateAuthToken,
};
