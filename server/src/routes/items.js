const router = require("express").Router();
const {getItemsAndTopicsByUserType} = require ("../helpers");

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
    getItemsAndTopicsByUserType(email,type, db)
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
    
  router.get('/items/:id', (req, res) => {
   
    console.log("id of item in the router",  Number(req.params.id))
    db.query(`
      SELECT item 
        FROM items
        WHERE id = $1;
    `, [ Number(req.params.id)])
    .then(item => {
      res.send(item.rows[0]);
    })
    .catch(e => {
      if (e) {
        res.status(401).json({ error: e.message });
        }
      });
  })
  return router;
};