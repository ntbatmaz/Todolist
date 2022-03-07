const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = 3030;
const app = express();

const todoRoutes = require("./routes/todoRoutes");
const connectionOptions = { useUnifiedTopology: true, useNewUrlParser: true };

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://ntbeee:1504Ntb1995@cluster0.qpjvp.mongodb.net/todolist?retryWrites=true&w=majority", connectionOptions)
    .then(() => console.log("success"))
    .catch((err) => console.error(err));

app.use("/todos",  todoRoutes);

app.listen(PORT, () => {
    console.log("listening")
})