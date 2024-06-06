const bcrypt = require("bcrypt");
const User = require ("../models/User")
require("dotenv").config();

//signup route handler
exports.signup = async(req,res) => {
    try{
        //get data
        const {name,email,password,contactNumber,order} = req.body;

        if(!name || !email || !password || !contactNumber) {
            return res.status(401).json({
                success:false,
                message:"pura form bhr"
            })
        }

        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.status(400).json({
                success:false,
                message:'User already Exists',
            })

        }
        
        let hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            contactNumber,
            order,


        })
        console.log(user)

        return res.status(200).json({
            success:true,
            user,
            message:"User is Created Successfully",
        
        })
        

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be registered, please try again later',
        });
    }
}


exports.login = async(req,res) => {
    try{
      
        const {email, password} = req.body;
        if( !email || !password ) {
              return res.status(401).json({
                success:false,
                message:"pura form bhr"
            })
        }
             
        const checkuser = await User.findOne({email})
        if(!checkuser) {
            return res.status(400).json({
            success:false,
            message:'User Not Exists',
        })
        }

        if(! await bcrypt.compare(password, checkuser.password)) {
            return res.status(402).json({
                success:false,
                message:"Wrong Password"
            })
        }

        res.status(200).json({
            success:true,
            checkuser,
            message:"Logged in successfully",



        })
        console.log(checkuser);

    



    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure, please try again',
        });
    }
}

