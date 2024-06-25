const { ErrorHandler } = require("../utils/common");
const User = require("../models/user.mdl");

// Get Users
module.exports.getAllUsers = async function (req, res, next) {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    ErrorHandler(500, err.message, res);
  }
};

// Get Single User
module.exports.getSingleUser = async function (req, res, next) {
  const { _id } = req.query;
  try {
    const single_user = await User.findById(_id);
    if (single_user) {
      res.status(200).json({
        success: true,
        user: single_user,
      });
    }
  } catch (err) {
    ErrorHandler(500, err.message, res);
  }
};

// Login User
module.exports.loginUser = async function (req, res, next) {
  const { email, password } = req.body;

  if (email && password) {
    const user = await User.findOne({ email }).select("+password");
    if (user) {
      const pwd_valid = await user.confirmPassword(password);
      if (pwd_valid) {
        const tokken = user.getJWTTokken();
        const { _id, email, name, role, verifyed } = user;
        res.status(200).json({
          success: true,
          tokken,
          user: { _id, email, name, role, verifyed },
        });
      } else {
        ErrorHandler(500, "User Email or Password not matched", res);
      }
    } else {
      ErrorHandler(500, "User Email or Password not matched", res);
    }
  } else {
    ErrorHandler(500, "Please enter both email and password", res);
  }
};

// Create User
module.exports.createUser = async (req, res, next) => {
  const data = req.body;
  const obj_user = new User(data);
  try {
    const user = await obj_user.save();
    if (user) {
      const tokken = obj_user.getJWTTokken();
      const { _id, email, name, role, verifyed } = user;
      return res.status(201).json({
        success: true,
        tokken,
        user: { _id, email, name, role, verifyed },
      });
    }
  } catch (err) {
    ErrorHandler(500, err.message, res);
  }
};

// Edit User
module.exports.editUser = async (req, res, next) => {
  const data = req.body;
  const { user_id } = req.query;

  const edit_keys = Object.keys(data).map((key_names) => key_names);

  const non_editable_keys = ["email", "password", "role", "verifyed"];

  let editable = true;

  for (let i of edit_keys) {
    if (non_editable_keys.includes(i)) {
      editable = false;
      break;
    }
  }

  const included_keys = edit_keys
    .map((k_name) => {
      if (non_editable_keys.includes(k_name)) {
        return k_name;
      }
    })
    .filter((k) => k != undefined)
    .join(" , ");

  if (editable) {
    const userData = User.findById(user_id);
    userData
      .then((user) => {
        const { _id, email, name, role, verifyed } = user;
        if (!user) {
          error.ErrorHandler(501, "User Not Found", res);
        } else {
          user.name = req.body.name;
          user.dob = req.body.dob;
          user.avatar = req.body.avatar;
          user.password = Buffer.from(user.password, "base64").toString(
            "ascii"
          );
          user.save();
          res
            .status(200)
            .json({
              success: true,
              message: "User Updated Successfuly",
              user: { _id, email, name, role, verifyed },
            });
        }
      })
      .catch((err) => {
        ErrorHandler(500, err.message, res);
      });
  } else {
    ErrorHandler(500, `these fields not editable '${included_keys}'`, res);
  }
};

// Delete User
module.exports.deleteUser = async (req, res, next) => {
  const { _id } = req.query;
  try {
    const user_delete = await User.findByIdAndDelete(_id);

    if (user_delete) {
      res.status(200).json({
        success: true,
        message: "User Deleted Successfuly",
        user: user_delete,
      });
    } else {
      ErrorHandler(500, "User Not Found", res);
    }
  } catch (err) {
    ErrorHandler(500, err.message, res);
  }
};
