const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();  // Make sure this is at the top

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "https://your-vercel-deployment-url.vercel.app"],  // Use an array to include both URLs
}));

// Connect to the database
require("./config/database").connect();

// Import and use routes
const UserRoute = require("./routes/user");
app.use("/api/v1/", UserRoute);


// Razorpay payment routes
const paymentRoutes = require("./routes/payment");
app.use("/api/v1/", paymentRoutes);

app.get("/", (req, res) => {
    res.send("<h1>Backend is Running and this is '/' Route</h1>");
});

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
});
