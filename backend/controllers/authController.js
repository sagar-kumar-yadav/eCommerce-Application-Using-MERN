import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

// POST | REGISTER ----------------------------------------------------------------------------------
// here we take input from body to register in application
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    // validation
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "email is Required" });
    }
    if (!password) {
      return res.send({ message: "password is Required" });
    }
    if (!phone) {
      return res.send({ message: "phone is Required" });
    }
    if (!address) {
      return res.send({ message: "address is Required" });
    }
    if (!answer) {
      return res.send({ message: "answer is Required" });
    }

    // check user in our database if user is exist in database we are not going to create user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register Please Login",
      });
    }

    // if user not exist in database we register the user
    // here we create hashedPassword using hashPassword function that we create in helpers file in authHelper.js
    const hashedPassword = await hashPassword(password);

    // save the all the inputs in database
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// POST | LOGIN ------------------------------------------------------------------------------------
export const loginController = async (req, res) => {
  try {
    // we take email and password to user
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Check User email that exist in our database is not, if not then return 404
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "email is not recognized",
      });
    }

    // if user email exist then we compare the password using user password and the database password
    const match = await comparePassword(password, user.password);
    // if password is not match
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// forgotPasswordController || POST ----------------------------------------------------------------------------------
export const forgotPasswordController = async (req, res) => {
  try {
    // we take inputs from body here and check conditions
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is require" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is require" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is require" });
    }

    // check user email and answer is exist in database or not, if not then response 404
    const user = await userModel.findOne({ email, answer });
    // validation
    if (!user) {
      res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }

    // if user exist we hashed the password using hashPassword function that we create in helper function in authHelper.js
    const hashed = await hashPassword(newPassword);
    // then we find the id in database and update the password
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

// test controller ---------------------------------------------------------------------------------
export const testController = (req, res) => {
  res.send("protected route");
};
