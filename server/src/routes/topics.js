const router = require("express").Router();
const { addUserTopic, addTopic, deleteTopic } = require("../helpers");

module.exports = (db) => {
  router.get("/topics", (req, res) => {
    db.query(
      `
      SELECT A.*, count(B.id) as items
        FROM topics A
        LEFT JOIN item_topics B ON A.id = B.topic_id
        GROUP BY A.id;
      `
    )
      .then((topics) => {
        // console.log("topics in router topics",topics.rows)

        res.send(topics.rows);
      })
      .catch((e) => {
        if (e) {
          res.status(401).json({ error: e.message });
        }
      });
  });

  router.post("/favtopics", (req, res) => {
    const { user_id, topic_id } = req.body;
    //console.log("req.body",req.body)
    addUserTopic(user_id, topic_id, db);
    // .then (res => {

    //   console.log("res in route favtopics",res)
    // })
    // .catch(e => {
    //   if (e) {
    //     res.status(401).json({ error: e.message });
    //   }
    // });
  });
  router.post("/addtopic", (req, res) => {
    const { topic } = req.body;
    addTopic(topic, db).then((newTopic) => {
      console.log("tabba3 topic tzed wallala", newTopic);
      res.send(newTopic);
    });
  });

  router.delete("/deletetopic/:id", (req, res) => {
    //console.log("req.params", req.params)
    const id = Number(req.params.id);
    //console.log("req.params parsed", id)
    deleteTopic(id, db).then(() => {
      res.status(204).json({});
    });
  });

  return router;
};
