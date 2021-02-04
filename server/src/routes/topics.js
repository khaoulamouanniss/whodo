const router = require("express").Router();

module.exports = db => {
  router.get("/topics", (request, response) => {
    db.query(
      `
      SELECT *
        FROM topics;
    `
    ).then(({ rows: topics }) => {
      response.json(topics);
    });
  });

  return router;
};
