const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const s3 = require("./s3");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const config = require("./config");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080 yourfunkychickenapp.herokuapp.com:*"
});

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(compression());

// app.use(
//     require("body-parser").urlencoded({
//         extended: false
//     })
// );
app.use(require("body-parser").json());
app.use(express.static("./public"));

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always hungry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

app.post("/register", (req, res) => {
    console.log(req.body);
    hashPassword(req.body.password)
        .then(hash => {
            db.addUser(
                req.body.firstname,
                req.body.lastname,
                req.body.email,
                hash
            )
                .then(() => {
                    res.status(200);
                    res.end();
                })
                .catch(err => {
                    res.status(500);
                    res.end("An error occured. Please try again.");
                    console.log("err in addUser: ", err);
                });
        })
        .catch(err => {
            res.status(500);
            res.end("An error occured. Please try again.");
            console.log("err in addUser: ", err);
        });
});
app.post("/bio", (req, res) => {
    db.updateBio(req.body.bio, req.session.userId)
        .then(results => {
            req.session.bio = results.rows[0].bio;
            res.json(results.rows);
        })
        .catch(err => {
            res.status(500);
            res.end("An error occured. Please try again.");
            console.log("err in updateBio: ", err);
        });
});

app.post("/login", (req, res) => {
    db.getUser(req.body.email)
        .then(results => {
            if (results.rows.length == 1) {
                checkPassword(req.body.password, results.rows[0].password)
                    .then(() => {
                        req.session.firstname = results.rows[0].firstname;
                        req.session.lastname = results.rows[0].lastname;
                        req.session.email = results.rows[0].email;
                        req.session.userId = results.rows[0].id;
                        req.session.profilepic = results.rows[0].profilepic;
                        req.session.bio = results.rows[0].bio;

                        console.log("finishing login", req.session);
                        res.status(200);
                        res.end();
                    })
                    .catch(() => {
                        res.status(401);
                        res.end("Invalid email or password. Please try again.");
                    });
            } else {
                res.status(401);
                res.end("Invalid email or password. Please try again.");
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500);
            res.end("An error occured. Please try again.");
        });
});

app.post("/profilepic", [uploader.single("file"), s3.upload], function(
    req,
    res
) {
    // If nothing went wrong the file is already in the uploads directory
    // console.log("req.file", req.file);
    db.setProfilepic(config.s3Url + req.file.filename, req.session.userId)
        .then(results => {
            req.session.profilepic = results.rows[0].profilepic;
            res.json(results.rows);
        })
        .catch(() => {
            res.sendStatus(500);
        });
});

var bcrypt = require("bcryptjs");

function hashPassword(plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
}
function checkPassword(textEnteredInLoginForm, hashedPasswordFromDatabase) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(
            textEnteredInLoginForm,
            hashedPasswordFromDatabase,
            function(err, doesMatch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doesMatch);
                }
            }
        );
    });
}

app.get("/user", function(req, res) {
    res.json({
        firstname: req.session.firstname,
        lastname: req.session.lastname,
        id: req.session.userId,
        profilepic: req.session.profilepic,
        bio: req.session.bio
    });
});

app.get("/user/:id.json", (req, res) => {
    if (req.params.id == req.session.userId) {
        return res.json({
            redirect: true
        });
    }
    db.getOtherUser(req.params.id)
        .then(results => {
            res.json({
                firstname: results.rows[0].firstname,
                lastname: results.rows[0].lastname,
                profilepic: results.rows[0].profilepic,
                bio: results.rows[0].bio
            });
        })
        .catch(() => {
            res.status(500);
            res.end();
        });
});

app.get("/friendship/:id", (req, res) => {
    db.getFriendship(req.session.userId, req.params.id)
        .then(results => {
            res.json(results.rows[0] || false);
        })
        .catch(() => {
            res.status(500);
            res.end();
        });
});
app.post("/friendship/:id", (req, res) => {
    db.insertFriendship(req.session.userId, req.params.id)
        .then(results => {
            res.json(results.rows[0]);
        })
        .catch(() => {
            res.status(500);
            res.end();
        });
});
app.put("/friendship/:id", (req, res) => {
    db.acceptFriendship(req.session.userId, req.params.id)
        .then(results => {
            res.json(results.rows[0]);
        })
        .catch(() => {
            res.status(500);
            res.end();
        });
});
app.delete("/friendship/:id", (req, res) => {
    db.deleteFriendship(req.session.userId, req.params.id)
        .then(results => {
            res.json(results.rows[0]);
        })
        .catch(() => {
            res.status(500);
            res.end();
        });
});
app.get("/friendship", (req, res) => {
    db.getFriendsList(req.session.userId)
        .then(results => {
            res.json(results.rows);
        })
        .catch(() => {
            res.status(500);
            res.end();
        });
});

let onlineUsers = [];
let chat = [];
io.on("connection", socket => {
    console.log(socket.request.session);
    console.log(`socket with the id ${socket.id} is now connected`);
    if (!socket.request.session.userId) {
        return;
    }
    let found = false;
    for (let i in onlineUsers) {
        if (
            onlineUsers[i] &&
            onlineUsers[i].userId == socket.request.session.userId
        ) {
            found = true;
            onlineUsers[i].socketId = socket.id;
        }
    }
    socket.emit("onlineUsers", onlineUsers);

    socket.on("disconnect", function() {
        let userId,
            newOnlineUsers = [];
        console.log(`socket with the id ${socket.id} is now disconnected`);
        for (let i in onlineUsers) {
            if (onlineUsers[i] && onlineUsers[i].socketId == socket.id) {
                userId = onlineUsers[i].userId;
            } else if (onlineUsers[i]) {
                newOnlineUsers.push(onlineUsers[i]);
            }
        }
        onlineUsers = newOnlineUsers;
        if (userId) {
            io.sockets.emit("userLeft", userId);
        }
    });

    if (found) {
        return;
    }
    let user = {
        socketId: socket.id,
        userId: socket.request.session.userId,
        firstname: socket.request.session.firstname,
        lastname: socket.request.session.lastname,
        profilepic: socket.request.session.profilepic
    };
    onlineUsers.push(user);
    console.log("broadcasting userJoined");
    io.sockets.emit("userJoined", user);

    socket.emit("Message", chat);

    socket.on("newChatMessage", data => {
        console.log("newChatMessage", data);
        let myNewChatObj = {
            firstname: socket.request.session.firstname,
            lastname: socket.request.session.lastname,
            profilepic: socket.request.session.profilepic,
            message: data,
            userId: socket.request.session.userId,
            timestamp: new Date().toJSON()
        };
        chat.push(myNewChatObj);
        if (chat.length > 10) {
            chat = chat.slice(chat.length - 10);
        }
        io.sockets.emit("Message", [myNewChatObj]);
    });
});

// make query to get from db firstname, lastname, pic etc. Not from users
// JUST SELECT
// NEXT STEP get user data from db to Redux + chat message in an object
// it should look like other chat object in Redux

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

module.exports = app;
if (require.main == module) {
    server.listen(process.env.PORT || 8080, () =>
        console.log("I'm listening.")
    );
}
