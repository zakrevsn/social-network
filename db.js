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
exports.getFriendship = function getFriendship(userId, otherUserId) {
    let q = `SELECT *
    FROM friendship
    WHERE (sender_id=$1 and recipient_id=$2) or
    (sender_id=$2 and recipient_id=$1) `;
    let params = [userId, otherUserId];
    return db.query(q, params);
};
exports.insertFriendship = function insertFriendship(userId, otherUserId) {
    let q = `INSERT INTO friendship
    (sender_id, recipient_id) VALUES ($1, $2)
    RETURNING * `;
    let params = [userId, otherUserId];
    return db.query(q, params);
};
exports.acceptFriendship = function acceptFriendship(userId, otherUserId) {
    let q = `UPDATE friendship
    SET accepted=true
    WHERE
    (sender_id=$2 and recipient_id=$1) RETURNING * `;
    let params = [userId, otherUserId];
    return db.query(q, params);
};
exports.deleteFriendship = function deleteFriendship(userId, otherUserId) {
    let q = `DELETE FROM friendship
    WHERE (sender_id=$1 and recipient_id=$2) or
    (sender_id=$2 and recipient_id=$1) RETURNING * `;
    let params = [userId, otherUserId];
    return db.query(q, params);
};
exports.getFriendsList = function getFriendsList(userId) {
    let q = `
        SELECT users.id, firstname, lastname, profilepic, accepted
        FROM friendship
        JOIN users
        ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
`;
    let params = [userId];
    return db.query(q, params);
};
