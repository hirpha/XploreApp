const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    // {
    //   defaultScope: {
    //     attributes: { exclude: ["password"] }, // Exclude 'password' field by default
    //   },
    //   scopes: {
    //     withPassword: {
    //       attributes: { include: ["password"] }, // Include 'password' field when explicitly requested
    //     },
    //   },
    // }
  );

  User.beforeSave((user) => {
    if (user.changed("password")) {
      user.password = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(10),
        null
      );
    }
  });

  User.prototype.changePassword = async function (oldPassword, newPassword) {
    const isMatch = await bcrypt.compare(oldPassword, this.password);
    if (!isMatch) {
      throw new Error('Invalid old password');
    }
    this.password = await bcrypt.hash(newPassword, 10);
    await this.save();
  };
  User.prototype.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };

  // User.createAccount = function (userData) {
  //   return User.create(userData, { exclude: ["password"] }); // Exclude 'password' field during creation
  // };
  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());

    // delete values.password;
    return values;
  };

  return User;
};
