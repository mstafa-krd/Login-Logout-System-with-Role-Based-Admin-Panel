const passport = require("passport");
const bcrypt = require("bcrypt");

const user = require("../models/user");

//login
const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err); // If there's an error, pass it to the next middleware
    }
    if (!user) {
      // Handle failed login, you can send a response indicating failure
      return res.status(401).json({ message: "Incorrect email or password" });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.json({ success: true, user: user });
    });
  })(req, res, next);
};

//createUser
const createUser = async (req, res) => {
  const { name, email, password, role, manager } = req.body;

  user
    .findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.send("User already exists");
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;

          bcrypt.hash(password, salt, (err, hashedPassword) => {
            if (err) throw err;

            user
              .create({
                name,
                email,
                password: hashedPassword, // Storing the hashed password as a String
                role,
                manager,
              })
              .then(() => {
                res.send("User registered successfully");
              })
              .catch((err) => {
                console.error(err);
                res.status(500).send("Server error");
              });
          });
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Server error");
    });
};

//logout
const logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.sendStatus(200);
  });
};

//get all users
const getAllUsers = (req, res) => {
  user
    .find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Server Error");
    });
};

//update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const myuser = await user.findByIdAndUpdate(id, req.body);
    if (!myuser) {
      res.status(404).json({ message: "User  not found " });
    }

    const updatedUser = await user.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await user.findByIdAndDelete(id);
    res.status(200).json({ message: "User Deleted successfully " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update team member
const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const myuser = await user.findByIdAndUpdate(id, req.body);
    if (!myuser) {
      res.status(404).json({ message: "User  not found " });
    }

    const updatedUser = await user.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get a user by id
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const myuser = await user.findById(id);
    res.status(200).json(myuser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//export
module.exports = {
  login,
  createUser,
  logout,
  getAllUsers,
  updateUser,
  deleteUser,
  updateTeamMember,
  getUser,
};
