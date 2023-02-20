const express = require('express');
const cors = require('cors');
const app = express();

const commentController = require("./comment-controller");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/comment", commentController);

app.listen(3001);
app.set('port', 3001);
console.log("Blog Post Comments server running On Port: " + app.get('port'));