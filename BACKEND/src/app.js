const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

/* ---------------- SECURITY MIDDLEWARE ---------------- */
app.use(helmet());

/* ---------------- LOGGING ---------------- */
app.use(morgan("dev"));

/* ---------------- BODY PARSERS ---------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- COOKIE ---------------- */
app.use(cookieParser());

/* ---------------- CORS ---------------- */
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true
    })
);

/* ---------------- ROUTES ---------------- */
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

/* ---------------- HEALTH CHECK ---------------- */
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is running "
    });
});

/* ---------------- 404 HANDLER ---------------- */
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

/* ---------------- GLOBAL ERROR HANDLER ---------------- */
app.use((err, req, res, next) => {
    console.error("Global Error:", err);

    res.status(500).json({
        message: "Internal Server Error",
        error: err.message
    });
});

module.exports = app;
