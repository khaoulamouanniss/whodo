const router = require("express").Router();
const {
  getItemsAndTopicsByUserType,
  addItem,
  addTopic,
  addItemTopic,
  deleteItem,
  getNbAnswersForOption,
  getNbAnswersForOptionByGender,
  getNbAnswersforOptionById,
  getNbAnswersForOptionByRelation,
  addItemAnswer,
  getRandomItemForTopic,
  addItemGuess,
  getItemsAndScores,
  getScoreForUser,
} = require("../helpers");

module.exports = (db) => {
  //returns an array of answers for each item
  router.get("/answer/:item_id/guess", async (req, res) => {
    const item_id = req.params.item_id;
    let promises = [];
    for (let i = 1; i < 6; i++) {
      let p = await getNbAnswersforOptionById(item_id, i, db);
      promises.push(p);
    }

    if (promises) {
      console.log(promises);
      res.send(promises);
    } else {
      console.log("something wrong with the guess route");
    }
  });
  //return all the items
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
  //home page
  router.post("/", (req, res) => {
    const { email, type } = req.body;
    getItemsAndTopicsByUserType(email, type, db)
      .then((items) => {
        res.send(items);
      })
      .catch((e) => {
        if (e) {
          res.status(401).json({ error: e.message });
        }
      });
  });
  //get a specific item
  router.get("/items/:id", (req, res) => {
    db.query(
      `
      SELECT item 
        FROM items
        WHERE id = $1;
    `,
      [Number(req.params.id)]
    )
      .then((item) => {
        res.send(item.rows[0]);
      })
      .catch((e) => {
        if (e) {
          res.status(401).json({ error: e.message });
        }
      });
  });
  router.post("/items", async (req, res) => {
    const { creator, item, time, approved, topics } = req.body;

    newItem = await addItem(creator, item, time, approved, db);
    let topic;
    for (let t of topics) {
      topic = await addTopic(t, db);

      addItemTopic(newItem.id, topic.id, db);
    }
    res.send(newItem);
  });
  //return all items for a specific topic
  router.get("/itemsoftopic/:id", (req, res) => {
    const id = Number(req.params.id);
    db.query(
      `
    SELECT A.*, D.topic As topic, count(B.id) AS answers
    FROM items A
    LEFT OUTER JOIN answer_items B ON A.id = B.item_id
    JOIN item_topics C ON C.item_id = A.id
    JOIN topics D ON D.id = C.topic_id
    WHERE D.id = $1
    GROUP BY A.id, D,topic;
  `,
      [id]
    ).then((items) => {
      res.send(items.rows);
    });
  });
  router.delete("/deleteitem/:id", (req, res) => {
    //console.log("req.params", req.params)
    const id = Number(req.params.id);
    //console.log("req.params parsed", id)
    deleteItem(id, db).then(() => {
      res.status(204).json({});
    });
  });
  router.get("/itemstoapprove", (req, res) => {
    db.query(
      `SELECT A.id, item, D.topic AS topic, count(B.id) as answers
    FROM items A
    LEFT OUTER JOIN answer_items B ON A.id = B.item_id
    JOIN item_topics C ON  A.id = C.item_id
    JOIN topics D ON C.topic_id = D.id
    WHERE A.approved = false
    GROUP BY A.id, A.item, D.topic;`
    )
      .then((items) => {
        res.send(items.rows);
      })
      .catch((e) => {
        if (e) {
          res.status(401).json({ error: e.message });
        }
      });
  });
  router.get("/approveitem/:id", (req, res) => {
    const id = Number(req.params.id);
    //console.log("req.params parsed", id)
    db.query(
      `
          UPDATE items 
          SET approved = true
          WHERE id = $1
          RETURNING *;
        `,
      [id]
    ).then((item) => {
      res.send(item.rows[0]);
    });
  });
  router.get("/submitteditems/:id", (req, res) => {
    const id = Number(req.params.id);
    db.query(
      `
        SELECT A.*, D.topic As topic, count(B.id) AS answers
        FROM items A
        LEFT OUTER JOIN answer_items B ON A.id = B.item_id
        JOIN item_topics C ON C.item_id = A.id
        JOIN topics D ON D.id = C.topic_id
        WHERE A.creator_id = $1
        GROUP BY A.id, D,topic;
      `,
      [id]
    ).then((items) => {
      res.send(items.rows);
    });
  });
  //when the user wants to filter the results by marital status
  router.get("/answer/:item_id/filter/relation", (req, res) => {
    const item_id = req.params.item_id;
    const singlePromises = [];
    const engagedPromises = [];
    for (let i = 1; i < 6; i++) {
      singlePromises.push(
        getNbAnswersForOptionByRelation(item_id, i, "single", db)
      );
      engagedPromises.push(
        getNbAnswersForOptionByRelation(item_id, i, "engaged", db)
      );
    }
    Promise.all(singlePromises).then((single) => {
      Promise.all(engagedPromises).then((engaged) => {
        const obj = { single: single, engaged: engaged };
        //console.log('my obj', obj)
        res.send(obj);
      });
    });
  });
  //when the user wants to filter the results by gender
  router.get("/answer/:item_id/filter/gender", (req, res) => {
    const item_id = req.params.item_id;
    const malePromises = [];
    const femalePromises = [];
    for (let i = 1; i < 6; i++) {
      malePromises.push(getNbAnswersForOptionByGender(item_id, i, "male", db));
      femalePromises.push(
        getNbAnswersForOptionByGender(item_id, i, "female", db)
      );
    }
    Promise.all(malePromises).then((male) => {
      Promise.all(femalePromises).then((female) => {
        const obj = { male: male, female: female };
        //console.log('my obj', obj)
        res.send(obj);
      });
    });
  });
  //when the user chooses a response to an item
  router.post("/answer/add", async (req, res) => {
    const { user_id, answer, item_id } = req.body;

    const addedAnswer = await addItemAnswer(item_id, user_id, answer, db);
    if (addedAnswer) {
      res.send(addedAnswer);
    } else {
      console.log("something wrong with the insertion");
    }
  });

  //when the user chooses a guess of what is the highest answered option to an item
  router.post("/guess/add", async (req, res) => {
    const { user_id, guess, item_id, points } = req.body;
    console.log(user_id, guess, item_id, points);
    const addedGuess = await addItemGuess(item_id, user_id, guess, points, db);
    console.log("added guess is", addedGuess);
    if (addedGuess) {
      console.log("added guess");
      res.send(addedGuess);
    } else {
      console.log("something wrong with the guess insertion");
    }
  });
  //getting the number of answers for each question for each option
  router.post("/answer", async (req, res) => {
    const { item, user_id, voteOption } = req.body;
    const promises = [];
    //making an array of number of votes for each option
    for (let i = 1; i < 6; i++) {
      let p = getNbAnswersForOption(item, i, db);
      promises.push(p);
    }
    //we're not sending any data until all the queries are executed
    Promise.all(promises).then((data) => {
      res.send(data);
    });
  });
  //getting a list of items and their scores for a user
  router.post("/MyScore", async (req, res) => {
    const { user } = req.body;
    console.log("user for my score", user);
    //making an array of items and their responses
    getItemsAndScores(user, db).then((data) => {
      console.log(data);
      res.send(data);
    });
  });

  router.post("/answer/random", (req, res) => {
    let { topic } = req.body;

    getRandomItemForTopic(topic, db).then((item) => {
      res.send(item);
    });
  });

  router.post("/guess/score", (req, res) => {
    let { user } = req.body;

    getScoreForUser(user, db).then((item) => {
      res.send(item);
    });
  });

  return router;
};
