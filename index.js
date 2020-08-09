const express = require("express");
const fs = require("fs");

const path = "./public/uploads";
const app = express();
const port = 3000;

app.use(express.static("./public"));

app.get("/", (req, res) => {
    fs.readdir(path, (err, files) => {
        console.log(files);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
