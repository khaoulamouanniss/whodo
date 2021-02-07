const router = require("express").Router();

module.exports = db => {
  router.get("/items", (request, response) => {
    db.query(
      `
      SELECT
        *
        FROM items;
    `
    ).then(({ rows: quesitemstions }) => {
      response.json(items);
    });
  });

  return router;
};