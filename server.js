const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to Compass"))
  .catch((err) => console.error("error found...", err));

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  const newContact = new Contact({
    name: name,
    email: email,
    phone: phone,
    message: message,
  });

  try {
    await newContact.save();
    res.send("Thank you for your message!");
  } catch (err) {
    res.send("There was an error saving your message. Please try again.");
  }
});

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});
