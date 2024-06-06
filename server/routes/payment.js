const express = require("express")
const router = express.Router()
const Razorpay = require("razorpay")
const crypto = require("crypto");

//create order
router.post("/orders", async(req,res) => {
    try{
        const instance = new Razorpay({
            key_id:process.env.key_id,
            key_secret:process.env.key_secret,
        });

        const options = {
            amount:req.body.amount * 100,
            currency:"INR",
            receipt:  Math.random(Date.now()).toString()

        };

        instance.orders.create(options,(error,order) => {
        if(error) {
            console.log(error);
            return res.status(500).json({message:"Some Went Wrong"});
        }
        res.status(200).json({data:order});
        });

    } catch(error) {
       console.log(error);
       res.status(500).json({message:"Internal Server Error"});
    }
});

//payment verify 
router.post("/verfiy", async(req,res) => {
    try{
     const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
     } = req.body
     const sign = razorpay_order_id + "|" + razorpay_payment_id;
     const expectedSign = crypto 
       .createHash("sha256",process.env.KEY_SECRET)
       .update(sign.toString())
       .digest("hex");

       if(razorpay_signature === expectedSign) {
        return res.status(200).json({message:"Payment Verified Successfully"});
       } else {
        return res.status(400).json({message:"Invalid signature sent!"});
       }

    } catch(error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});

    }
})

module.exports = router;