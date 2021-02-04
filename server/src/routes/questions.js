const router = require("express").Router();

module.exports = db => {
  router.get("/questions", (request, response) => {
    db.query(
      `
      SELECT
        *
        FROM questions;
    `
    ).then(({ rows: questions }) => {
      response.json(questions);
    });
  });

  return router;
};