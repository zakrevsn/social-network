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