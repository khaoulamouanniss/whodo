const router = require("express").Router();
const {getItemsByUserType} = require ("../helpers");

module.exports = db => {
  router.get("/items", (request, response) => {
    db.query(
      `
      SELECT
        *
        FROM items;
    `
    ).then(({ rows: items }) => {
      response.json(items);
    });
  });

  router.get('/', (req, res) => {
    const {email, type} = req.body;
    console.log("email and type in the router items", email, type)
    getItemsByUserType(email,type, db)
      .then(items => {
        console.log("item in router items",items)        
        res.send(items);
      })
      .catch(e => {
        if (e) {
          res.status(401).json({ error: e.message });
        }
      });
  })
    
  return router;
};