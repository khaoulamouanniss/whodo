const router = require("express").Router();

module.exports = db => {
  router.get("/topics", (req, res) => {
    db.query(
      `
      SELECT topic
        FROM topics;
    `
    ).then(topics => {
      console.log("topics in router topics",topics.rows)  
      
      res.send(topics.rows);
    })
    .catch(e => {
      if (e) {
        res.status(401).json({ error: e.message });
      }
    });
  });

  return router;
};
