import Listing from "../models/listing.model.js";
import User from "../models/user.model.js"
import bcryptjs from "bcryptjs";

export const getAllUsers = async(req,res)=>{
    try {
        const users = await User.find()
        if(!users){return res.status(404).json({msg:"no users found"})}
        return res.status(200).json(users)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}



export const updateUser = async (req, res) => {
    if (req.user.id !== req.params.id) return res.status(401).json("you are allowed only to update your account");
  

    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password , 10)
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: { 
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            } },
            { new: true });
        const {password , ...rest} = updatedUser._doc
         res.status(200).json(rest);
    
        }

     catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};




export const DeleteUser = async(req, res)=>{
    if(req.user.id !== req.params.id) return  res.status(401).json('you can only delete your account')
    try {
         await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
         res.status(200).json('user has been deleted!')
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }

}



export const getUserListings = async (req, res) => {
    if (req.user.id === req.params.id) {
      try {
        const listings = await Listing.find({ userRef: req.params.id });
        res.status(200).json(listings);
      } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" , error});
      }
    } else {
      return res.status(401).json( 'You can only view your own listings!');
    }
  };


  export const getUser = async(req, res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user)return res.status(404).json('user not found')
        const {password , ...rest} = user._doc

        res.status(200).json(rest)
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" , error});

    }
  }