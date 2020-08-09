const express = require("express");
const fs = require("fs");
const multer = require("multer");
const ejs = require("ejs");

const path = "./public/uploads";
const app = express();
const port = 3000;
templates = {
    titleHeader: "Kenziegram Project",
    title: "<h1>KenzieGram</h1>",
};

app.set("view engine", "ejs");

app.use(express.static("./public"));

fs.readdir(path, (err, files) => {
    console.log(files);
    templates.pics = files;
    console.log(templates);
});

app.get("/", (req, res) => {
    res.render("index", templates);
});

app.post("/upload", (req, res) => {
    res.render("index", templates);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
