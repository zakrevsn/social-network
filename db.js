var spicedPg = require("spiced-pg");

var dbUrl =
    process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/socialnetwork";
var db = spicedPg(dbUrl);

exports.addUser = function addUser(firstname, lastname, email, password) {
    let q = `INSERT INTO users(firstname, lastname, email, password)
    VALUES ($1, $2, $3, $4) RETURNING * `;
    let params = [firstname, lastname, email, password];
    return db.query(q, params);
};
exports.getUser = function getUser(email) {
    let q = `SELECT * FROM users WHERE email=$1`;
    let params = [email];
    return db.query(q, params);
};
exports.setProfilepic = function setProfilepic(image, userId) {
    let q = `UPDATE users SET profilepic = $1 WHERE id = $2 RETURNING *`;
    let params = [image, userId];
    return db.query(q, params);
};
exports.updateBio = function updateBio(bio, userId) {
    let q = `UPDATE users SET bio = $1 WHERE id = $2 RETURNING *`;
    let params = [bio, userId];
    return db.query(q, params);
};
exports.getOtherUser = function getOtherUser(userId) {
    let q = `SELECT firstname, lastname, profilepic, bio FROM users WHERE id=$1`;
    let params = [userId];
    return db.query(q, params);
};
