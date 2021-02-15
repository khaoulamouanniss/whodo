const router = require("express").Router();
const {addUserTopic} =require("../helpers");

module.exports = db => {
  router.get("/topics", (req, res) => {
    db.query(
      `
      SELECT A.*, count(B.id) as items
        FROM topics A
        JOIN item_topics B ON A.id = B.topic_id
        GROUP BY A.id;
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

  router.post("/favtopics", (req, res) => {
    const {user_id,topic_id} = req.body;
    console.log("req.body",req.body)
    addUserTopic(user_id, topic_id, db)
    // .then (res => {
    
    //   console.log("res in route favtopics",res)
    // })
    // .catch(e => {
    //   if (e) {
    //     res.status(401).json({ error: e.message });
    //   }
    // });
  });
  return router;

}
