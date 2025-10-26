require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schema
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const Blog = mongoose.model("Blog", blogSchema);

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.get("/", async (req, res) => {
  const blogs = await Blog.find();
  res.render("home", { blogs: blogs });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/new", async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
  });
  await blog.save();
  res.redirect("/");
});

// Start server
app.listen(3000, () => console.log("Server started on http://localhost:3000"));
