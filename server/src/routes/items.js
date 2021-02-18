const router = require("express").Router();
const {getItemsAndTopicsByUserType, addItem, addTopic, addItemTopic, getItemsByTopicId,deleteItem} = require ("../helpers");

module.exports = db => {
  router.get("/items", (request, response) => {
    //console.log("db in items",db)
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

  router.post('/', (req, res) => {
    const {email, type} = req.body;
    console.log("email and type in the router items", email, type)
    getItemsAndTopicsByUserType(email,type, db)
      .then(items => {
        res.send(items);
      })
      .catch(e => {
        if (e) {
          res.status(401).json({ error: e.message });
        }
      });
  })
    
  router.get('/items/:id', (req, res) => {
   
   // console.log("id of item in the router",  Number(req.params.id))
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

  
  router.post('/items', async (req,res) => {
    const {creator, item, time, approved, topics} = req.body;
   // console.log("I am in router")
    newItem = await addItem(creator, item, time, approved, db);
   // console.log("addItem",newItem)
    let topic;
    for(let t of topics) {
      topic = await addTopic(t,db)
          //console.log("addTopic",topic)
         // if(newItem && topic) {
            addItemTopic(newItem.id,topic.id, db);
         // }
          //console.log("topic in route",topic);
         
        }
        res.send(newItem)
      });

  router.get("/itemsoftopic/:id", (req, res) => {
    const id = Number(req.params.id);
    db.query(`
    SELECT A.*, D.topic As topic, count(B.id) AS answers
    FROM items A
    LEFT OUTER JOIN answer_items B ON A.id = B.item_id
    JOIN item_topics C ON C.item_id = A.id
    JOIN topics D ON D.id = C.topic_id
    WHERE D.id = $1
    GROUP BY A.id, D,topic;
  `, [id])
  .then((items) => {
    
    res.send(items.rows);
  });
      });

      router.delete("/deleteitem/:id", (req, res) => {
        //console.log("req.params", req.params)
        const id = Number(req.params.id);
        //console.log("req.params parsed", id)
        deleteItem(id,db)
        .then(() => {
          res.status(204).json({});
        })
        
       
      });

      router.get('/itemstoapprove', (req, res) => {
        db.query(
          `SELECT A.id, item, D.topic AS topic, count(B.id) as answers
    FROM items A
    LEFT OUTER JOIN answer_items B ON A.id = B.item_id
    JOIN item_topics C ON  A.id = C.item_id
    JOIN topics D ON C.topic_id = D.id
    WHERE A.approved = false
    GROUP BY A.id, A.item, D.topic;`)
          .then(items => {
            res.send(items.rows);
          })
          .catch(e => {
            if (e) {
              res.status(401).json({ error: e.message });
            }
          });
      })
      router.get("/approveitem/:id", (req, res) => {
        const id = Number(req.params.id);
        console.log("req.params parsed", id)
        db.query(
          `
          UPDATE items 
          SET approved = true
          WHERE id = $1
          RETURNING *;
        `,[id])
        .then((item) => {
          res.send(item.rows[0])
        })       
      });

      router.get("/submitteditems/:id", (req, res) => {
        const id = Number(req.params.id);
        db.query(`
        SELECT A.*, D.topic As topic, count(B.id) AS answers
        FROM items A
        LEFT OUTER JOIN answer_items B ON A.id = B.item_id
        JOIN item_topics C ON C.item_id = A.id
        JOIN topics D ON D.id = C.topic_id
        WHERE A.creator_id = $1
        GROUP BY A.id, D,topic;
      `, [id])
      .then((items) => {
        
        res.send(items.rows);
      });
    });
  return router;
};