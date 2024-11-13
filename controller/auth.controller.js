import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashpassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashpassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    next(error);
  } 
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if(!email){
    return next(errorHandler(400,"Please enter a valid Email Id"))
  }
  if(!password){
    return next(errorHandler(400,"Password required"))
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "Email not Found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Password"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashpassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);  
  } catch (error) { 
    next(error);
  }
};

export const google = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  try {
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true, 
          expires: expiryDate, 
        })
        .status(200)
        .json(rest);
    } else { 
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,   
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res.cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {}
};

export const signout = (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};

