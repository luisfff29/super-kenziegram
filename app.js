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
        cb(null, Date.now() + ".jpg");
    },
});
var upload = multer({ storage: storage });

app.set("view engine", "ejs");

app.use(express.static("./public"));

templates.data = JSON.parse(fs.readFileSync("./comments.json", "utf8")).data;

app.get("/", (req, res, next) => {
    res.render("index", templates);
});

app.post("/upload", upload.single("myImage"), (req, res, next) => {
    const filename = req.file.filename;

    templates.data.push({
        id: templates.data.length + 1,
        name: filename,
        comments: [],
    });
    setTimeout(function () {
        fs.writeFileSync(
            "./comments.json",
            JSON.stringify({ data: templates.data })
        );
    }, 1000);
    templates.pic_uploaded = filename;
    res.render("upload", templates);
});

app.get("/upload/:myImage", (req, res) => {
    let myImage = req.params.myImage;
    let result = templates.data.filter((com) => com.name === myImage)[0];
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
