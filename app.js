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
var storage = multer.diskStorage({
    destination: path,
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
});
var upload = multer({ storage: storage });

app.set("view engine", "ejs");

app.use(express.static("./public"));

fs.readdir(path, (err, files) => {
    templates.pics = files;
});

app.get("/", (req, res, next) => {
    templates.value = JSON.parse(fs.readFileSync("./comments.json", "utf8"));
    res.render("index", templates);
});

app.post("/upload", upload.single("myImage"), (req, res, next) => {
    templates.pics.unshift(req.file.filename);
    templates.pic_uploaded = req.file.filename;
    res.render("upload", templates);
});

app.post("/:myImage", (req, res, next) => {
    res.render("comments", templates);
});

app.get("/:myImage", (req, res, next) => {
    myImage = req.params.myImage;
    let value = JSON.parse(fs.readFileSync("./comments.json", "utf8")).data;
    let result = value.filter((com) => com.name === myImage)[0];
    console.log(result);
    if (typeof result == "undefined") {
        templates.comments = [];
    } else {
        templates.comments = result.comments;
    }
    templates.pic_uploaded = myImage;
    res.render("comments", templates);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
