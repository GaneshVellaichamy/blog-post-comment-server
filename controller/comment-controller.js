const express = require('express');
const router = express.Router();

const {
    getComments,
    insertComment,
    updateComment,
    deleteComment
} = require("../service/comment-service");

router.route("/getComments").get(getComments);
router.route("/insertComment").post(insertComment);
router.route("/updateComment").post(updateComment);
router.route("/deleteComment").post(deleteComment);

module.exports = router;