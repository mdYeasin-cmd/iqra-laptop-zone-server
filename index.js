const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const { bgGreen, bgRed } = require("./utils/consoleMessages");
const dbConnect = require("./config/dbConnect");
const config = require("./config");

const app = express();
const port = config.port || 5001;

// middleware
app.use(cors());
app.use(express.json());

// all route of app
app.use("/api/v1.0/brands", require("./routes/v1.0/brands.router"));
app.use("/api/v1.0/users", require("./routes/v1.0/users.router"));
app.use("/api/v1.0/products", require("./routes/v1.0/products.router"));
app.use("/api/v1.0/orders", require("./routes/v1.0/orders.router"));
app.use("/api/v1.0/sellers", require("./routes/v1.0/sellers.router"));
app.use("/api/v1.0/buyers", require("./routes/v1.0/buyers.router"));

// testing route
app.get("/", (req, res) => {
    res.send("Iqra Laptop Zone server is running.");
});

// 404 route
app.all("*", (req, res) => {
    res.send("No route found");
});

// global error handler
app.use(errorHandler);

// app listen here
dbConnect()
    .then(() => {
        app.listen(port, () => {
            console.log(
                bgGreen(
                    `Iqra Laptop Zone server is running on port ${port}`
                )
            );
        });
    })
    .catch(() => console.log(bgRed("Error occured while listening Iqra Laptop Zone server app")));

// if express not handle any error then this will excute and close the app
process.on("unhandledRejection", (error) => {
    console.log(error.name, error.message);
    app.close(() => {
        process.exit(1);
    });
});
