const router = require("express").Router();


module.exports = db => {
  router.get("/users", (request, response) => {
    db.query(
      `
      SELECT *
        FROM users
        WHERE type = 'normal';
    `
    ).then(users => {
      //console.log("users.js",users.rows)
      response.send(users.rows);
    });
  });

  
  return router;
};
