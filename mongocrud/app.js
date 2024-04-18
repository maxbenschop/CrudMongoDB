const express = require("express");
const app = express();
const path = require("path");
const db = require("./connection");
const postModel = require("./postModel");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await postModel.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/posts", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const newPost = await postModel.create({ title, content });
    res.json(newPost);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.findById(id);
    res.json(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await postModel.findByIdAndUpdate(id, { title, content });
    res.json(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.findByIdAndDelete(id);
    res.json("Deleted post");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
