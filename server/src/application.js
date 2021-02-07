const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

const db = require("./db");

const users = require("./routes/users");
const topics = require("./routes/topics");
const questions = require("./routes/items");
const login = require("./routes/login");
const signup = require("./routes/signup");

function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf-8"
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

module.exports = function application(
  ENV
) {
  app.use(cors());
  app.use(helmet());
  app.use(bodyparser.json());

  app.use("", users(db));
  app.use("", topics(db));
  app.use("", items(db));
  app.use("", login(db));
  app.use("", signup(db));

 
    Promise.all([
      read(path.resolve(__dirname, `db/schema/create.sql`)),
      read(path.resolve(__dirname, `db/schema/seeds.sql`))
    ])
      .then(([create, seed]) => {
        app.get("/debug/reset", (request, response) => {
          db.query(create)
            .then(() => db.query(seed))
            .then(() => {
              console.log("Database Reset");
              response.status(200).send("Database Reset");
            });
        });
      })
      .catch(error => {
        console.log(`Error setting up the reset route: ${error}`);
      });


  app.close = function() {
    return db.end();
  };

  return app;
};
