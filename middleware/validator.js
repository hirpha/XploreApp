const Validator = (schema) => {
  return async (req, res, next) => {
    try {
      const inputs = req.body;
      await schema.validate(inputs);
      next();
    } catch (err) {
      console.log(err);
      res.status(400).json({
        error: err.errors,
        message: err.message,
      });
      return;
    }
  };
};
module.exports = Validator;
