require("dotenv").config();

const app = require("./src/app");
const connectToDB = require("./src/config/database");

// Connect DB first
connectToDB();

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});