const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));

require("./config/database").connect();

const UserRoute = require("./routes/user");
app.use("/api/v1/", UserRoute);

//cart


// Razorpay 
const paymentRoutes = require("./routes/payment");
app.use("/api/v1/", paymentRoutes);



app.get("/", (req, res) => {
    res.send("<h1>Backend is Running and this is '/' Route</h1>");
});

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
});
