import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const currentUser = await User.findOne({ email });
        if (currentUser) {
          return   res.status(500).json("User already exists" );
        }

       
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

       

        res.status(201).json("User created successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};




export const signin = async(req, res)=>{
   try {
     const user = await User.findOne({email: req.body.email})
     if(!user) return res.status(404).json("user not found")
     const comparedPassword = bcryptjs.compareSync(req.body.password , user.password)
     if(!comparedPassword){return res.status(401).json("wrong credentials")}

     const token =  jwt.sign({id:user.id}, process.env.JWT_SECRET )
    
     
     const { password, ...rest } = user._doc;
      res.cookie("access_token", token, {
        sameSite : "none",
        secure: true,
        domain: "https://real-estate-76ud.onrender.com/",
        httpOnly: true
        }).status(200).json(rest)
    } catch (error) {
     
        res.status(500).json({ msg: "Internal Server Error" });
   }
}


export const google = async (req, res)=>{
try {
    const user = await User.findOne({email:req.body.email})
    if(user)
   { const token = jwt.sign({id:user.id}, process.env.JWT_SECRET)
  

    const { password, ...rest } = user._doc;
    res.cookie("access_token", token, {
        sameSite : "none",
        secure: true,
        domain: "https://real-estate-76ud.onrender.com/",
        httpOnly: true
        }).status(200).json(rest)}

    if(!user){
        const generatedpassword = 
        Math.random().toString(36).slice(-8) + 
        Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedpassword,10);
        const newUser = new User ({
            username: 
            req.body.name.split(" ").join("").toLowerCase() +
             Math.random().toString(36).slice(-4),
            email:req.body.email,
            password:hashedPassword,
            avatar:req.body.photo,

        })
        await newUser.save();
        const token = jwt.sign({id:newUser.id}, process.env.JWT_SECRET)
    const { password, ...rest } = newUser._doc;
    res.cookie("access_token", token, {
        sameSite : "none",
        secure: true,
        domain: "https://real-estate-76ud.onrender.com/",
        httpOnly: true
        }).status(200).json(rest)
    }


} catch (error) {
     console.log(error)
    res.status(500).json({ msg: "Internal Server Error",error });

}
}




export const signOut = async(req, res)=>{
    try {
       res.clearCookie('access_token');
       res.status(200).json('user has been logged out')
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error",error });

    }
}