const DBConfig = require("../config/DBConfig");
const util = require('util');
const blogPostSqlDB = DBConfig.blogPostSqlDB;
const queryPromise = util.promisify(blogPostSqlDB.query).bind(blogPostSqlDB);

const getComments = async (req, res) => {
    try {
        const sqlSelect = "SELECT * FROM comments";
        const allComments = await queryPromise(sqlSelect);
        const result = allComments.map((comment) => {
            return {
                commentId: comment.comment_id,
                commentBody: comment.comment_body,
                parentId: comment.parent_id,
                userId: comment.user_id,
                userName: comment.user_name,
                createdAt: comment.created_at,
                updatedAt: comment.updated_at,
            }
        });
        res.status(200);
        res.send(result);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
};

const insertComment = async (req, res) => {
    const commentBody = req.body.commentBody;
    const parentId = req.body.parentId;
    const userId = req.body.userId;
    const userName = req.body.userName;
    const createdAt = new Date();
    const updatedAt = new Date();
    const insertSql = `INSERT INTO comments (comment_body, parent_id, user_id, user_name, created_at, updated_at) VALUES (?,?,?,?,?,?)`;
    const sqlSelect = "SELECT * FROM comments where comment_id = ?";

    try {
        const insertResult = await queryPromise(insertSql, [commentBody, parentId, userId, userName, createdAt, updatedAt]);
        const commentId = insertResult.insertId;
        const insertedComment = await queryPromise(sqlSelect, [commentId]);
        const result = {
            commentId: insertedComment[0].comment_id,
            commentBody: insertedComment[0].comment_body,
            parentId: insertedComment[0].parent_id,
            userId: insertedComment[0].user_id,
            userName: insertedComment[0].user_name,
            createdAt: insertedComment[0].created_at,
            updatedAt: insertedComment[0].updated_at,
        };
        res.status(200);
        res.send(result);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
};

const updateComment = async (req, res) => {
    const commentId = req.body.commentId;
    const commentBody = req.body.commentBody;
    const updatedAt = new Date();
    const updateSql = `UPDATE comments SET comment_body = ?,  updated_at = ? WHERE comment_id = ?`;
    const sqlSelect = "SELECT * FROM comments where comment_id = ?";

    try {
        await queryPromise(updateSql, [commentBody, updatedAt, commentId]);
        const updatedComment = await queryPromise(sqlSelect, [commentId]);
        const result = {
            commentId: updatedComment[0].comment_id,
            commentBody: updatedComment[0].comment_body,
            parentId: updatedComment[0].parent_id,
            userId: updatedComment[0].user_id,
            userName: updatedComment[0].user_name,
            createdAt: updatedComment[0].created_at,
            updatedAt: updatedComment[0].updated_at,
        };
        res.status(200);
        res.send(result);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
};

const deleteComment = async (req, res) => {
    const commentId = req.body.commentId;
    const deleteSql = `DELETE FROM comments where comment_id = ?`;
    try {
        const deleteResult = await queryPromise(deleteSql, [commentId]);
        res.status(200);
        res.send(deleteResult);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
};

module.exports = { getComments, insertComment, updateComment, deleteComment };