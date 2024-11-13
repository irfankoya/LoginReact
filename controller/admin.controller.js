import Admin from "../models/admin.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const adminLogin = async (req, res, next) => {
  const { email, password } = req.body; 
  try {
    if (email !== 'admin@gmail.com' || password !== 'admin123') {
      return next(errorHandler(404, "Invalid credentials"));
    }
    res.json({ success: true });  
  } catch (error) {
    console.log(error);
  }
}


export const userData = async (req, res) => {
  try {
    const data = await User.find(); 
    res.json(data);
  } catch (error) {
    console.log(error); 
  } 
};

export const edit = async (req, res) => {
  try {
    const bodyData = req.body;
    const image = req.file ? req.file.filename : bodyData.prevImg;
    const data = await User.findByIdAndUpdate(
      bodyData.id,
      {
        username: bodyData.username,
        email: bodyData.email,   
        profilePicture: image,
      }, 
      { upsert: true, new: true }
    );
    res.json(true)
  } catch (error) {
    console.log(error);
  }
 
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }

}