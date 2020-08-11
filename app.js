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
    posted: false,
};
const upload = multer({ dest: path });

app.set("view engine", "ejs");

app.use(express.static("./public"));

fs.readdir(path, (err, files) => {
    templates.pics = files;
});

app.get("/", (req, res, next) => {
    templates.posted = false;
    res.render("index", templates);
});

app.post("/upload", upload.single("myImage"), (req, res, next) => {
    templates.posted = true;
    // console.log(JSON.parse(fs.readFileSync("./comments.json", "utf8")));
    templates.pics.unshift(req.file.filename);
    templates.pic_uploaded = req.file.filename;
    res.render("upload", templates);
});

app.post("/:myImage", (req, res, next) => {
    res.render("comments", templates);
});

app.get("/:myImage", (req, res, next) => {
    templates.pic_uploaded = req.params.myImage;
    res.render("comments", templates);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
