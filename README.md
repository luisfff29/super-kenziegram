# KenzieGram

Instagram clone using [Node.js](https://nodejs.org/en/), [Express.js](http://expressjs.com/), [Multer](https://www.npmjs.com/package/multer), and [EJS](https://www.npmjs.com/package/ejs) package

## Instructions

1. Once in the homepage, click on `Choose File` and select any picture you'd like to upload.
2. Click on `Upload` and it will redirect to `/upload` where it will display the picture you just submitted, with a successfull message and the option to be the first comment.
3. To go back click on `Back` to see your picture followed by the list of the other pictures submitted or make a comment and you will be redirected to the comment page where you can see the list of comments.
4. WHen you click on any picture from homepage it will display the comment page of the piture clicked.

## Requirements

-   A functioning express server
-   A homepage that display all the images from the data `comments.json` and a template literal
-   A `post` endpoint that receives an upload picture from a form
-   An upload succes screen that shows the image uploaded, a comment form, and a back button to the homepage
-   Any new pictures uploaded should be displayed on the hompeage upon returning to `localhost:3000`
-   Comments for all images should persiste across server restarts by properly reading/writing them in `./comments.json` file using `fs` methods

## Run

To start the project you can type on the terminal:

```bash
    node app
```

or

```bash
    npm start
```
