const router = require("express").Router();


module.exports = db => {
  router.get("/users", (request, response) => {
    db.query(
      `
      SELECT *
        FROM users;
    `
    ).then(({ rows: users }) => {
      console.log("users.js")
      response.json(users);
    });
  });

  
  return router;
};
