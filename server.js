const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const itemsRoutes = require("./routes/api/items");

const app = express();

//body-parser middle-ware
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

//connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb is connected"))
  .catch((err) => console.log(err));

//use routes
app.use("/api/items", itemsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
