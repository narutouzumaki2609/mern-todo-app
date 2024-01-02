import express from 'express';
import User from '../models/user.js'
import connect from '../connection/connection.js';
const router =express.Router();
import bcrypt from 'bcrypt';
//SIGN UP
router.post('/register',async(req,res)=>{
    console.log(req.body)

    connect();
    try{
        console.log(req.body)
        const {username, email, password} = req.body;
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password,salt);
        await User.create({
            email:email,
            username:username,
            password:hashedPassword
        });
        res.status(200).json({message:"SignUp Successful"})
    }catch(err){
        console.log(err)
        // res.json({success: false})
        res.status(400).json({
            message: "User Already Exists",
        })
    }
});

//SIGN IN

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (!user) {
            return res.status(200).json({
                message: "Please sign up first",
            });
        }
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(200).json({
                message: "Password is not correct",
            });
        }
        const { password, ...others } = user._doc;
        return res.status(200).json({ others });
    } catch (err) {
        return res.status(400).json({
            message: "",
        });
    }
});

export default router;