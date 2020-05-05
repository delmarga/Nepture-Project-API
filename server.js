const express = require("express");
const cors = require("cors");
const app = express();
const apiRoute = require("./routes/api");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/v1", apiRoute);

// App Server Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
