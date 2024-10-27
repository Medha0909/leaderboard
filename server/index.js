require("dotenv").config();
const express = require("express");
const connectDb = require("./config/dbConnection.js");
connectDb();

const cors = require("cors");
// *********** All-Routes *************
const auth = require( "./routes/auth.routes.js");
const user = require ("./routes/user.routes.js");
// *********** All-Routes *************

const cookieParser = require("cookie-parser");
const app = express();
// Use cors middleware
app.use(cors());

app.use(
  cors({
    origin: "*", // Replace with the frontend's URL (React app)
    methods: "GET,POST,PUT,DELETE,PATCH", // Allowed methods
  })
);

//middle wares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// *********** All-Routes *************

app.get("/", (req, res) => {
  res.json("I'm coming from backend");
});
app.use("/api/auth/v1", auth);
app.use("/api/user/v1", user);

// for wrong apis
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found. Please check the URL and try again.",
  });
});

// Error handling middleware (optional, for other server errors)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal server error.",
    error: err.message,
  });
});

app.listen(7000, async () => {
  console.log("Server is running on port 7000");
  await connectDb();
});