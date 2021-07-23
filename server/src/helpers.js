const { request } = require("express");
const jwt = require("jsonwebtoken");

const getNbAnswersforOptionById = (question, option, db) => {
  let sql = `
    SELECT count(A.id) as nbAnswers
    FROM answer_items A
    Join items B on B.id = A.item_id
    WHERE B.id = $1 AND A.answer = $2
    GROUP BY (B.id);   
    `;
  return db
    .query(sql, [question, option])
    .then((res) => {
      if (res.rows[0]) {
        return res.rows[0];
      }
      return { nbanswers: "0" };
    })
    .catch((e) => {
      return null;
    });
};

const getUserByEmail = (email, db) => {
  return db
    .query(
      `
    SELECT * 
    FROM users
    WHERE email = $1;
  `,
      [email]
    )
    .then((res) => {
      if (res) {
        console.log("get user", res.rows[0]);
        return res.rows[0];
      }
      return null;
    })
    .catch((e) => {
      return null;
    });
};
//it will return an array containing five cells about the guesses for each of the five answer option
const getAnswersForItem = (id, db) => {
  return db
    .query(
      `
  SELECT ARRAY (SELECT ALL COUNT(id) 
  FROM answer_items
  WHERE item_id = $1
  GROUP BY answer);
  `,
      [id]
    )
    .then((res) => {
      if (res) {
        console.log("here are the guesses", res.rows);
        return res.rows;
      }
      return null;
    })
    .catch((e) => {
      return null;
    });
};
const addUserLoginGF = (userData, db) => {
  const { name, last_name, email, profile_pic } = userData;
  console.log("data in addUserGF", userData);
  return db
    .query(
      `
  INSERT INTO users (name, last_name, email, profile_pic, type)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *;
    `,
      [name, last_name, email, profile_pic, "normal"]
    )
    .then((res) => {
      console.log("user added in function addUserGF", res.rows[0]);
      return res.rows[0];
    })
    .catch((e) => {
      return null;
    });
};
const addUserGF = (userData, db) => {
  const {
    name,
    last_name,
    birth_date,
    gender,
    email,
    profile_pic,
    country,
    city,
    type,
    relationship,
  } = userData;
  console.log("data in addUserGF", userData);
  return db
    .query(
      `
  INSERT INTO users (name, last_name, birth_date, gender,  email, profile_pic, country, city, type, relationship)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
    `,
      [
        name,
        last_name,
        birth_date,
        gender,
        email,
        profile_pic,
        country,
        city,
        type,
        relationship,
      ]
    )
    .then((res) => {
      console.log("user added in function addUserGF", res.rows[0]);
      return res.rows[0];
    })
    .catch((e) => {
      return null;
    });
};

const addUser = (userData, db) => {
  console.log("data in addUser", userData);
  const {
    name,
    last_name,
    birth_date,
    gender,
    email,
    password,
    profile_pic,
    country,
    city,
    type,
    relationship,
  } = userData;
  return db
    .query(
      `
  INSERT INTO users (name, last_name, birth_date, gender, email, password, profile_pic, country, city, type, relationship)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *;
    `,
      [
        name,
        last_name,
        birth_date,
        gender,
        email,
        password,
        profile_pic,
        country,
        city,
        type,
        relationship,
      ]
    )
    .then((res) => {
      console.log("user in addUser after req", res.rows[0]);
      return res.rows[0];
    })
    .catch((e) => {
      console.log("error in router signup");
    });
};
//the items and topics
/*const getItemsAndTopicsByLevel = (level, id, db) => {
  let sql;

  return db
    .query(
      `
    SELECT A.id, item, B.id as id_answer, B.user_id as user_id, D.id as topic_id, D.topic AS topic, count(B.id) as answers
    FROM items A
    LEFT OUTER JOIN answer_items B ON A.id = B.item_id
    JOIN item_topics C ON C.item_id = A.id
    JOIN topics D ON C.topic_id = D.id
    JOIN user_topics E ON D.id = E.topic_id
    JOIN users F ON E.user_id = F.id
    WHERE D.id <=  $1 AND A.approved = true AND B.user_id = $2
    GROUP BY A.id, A.item, D.topic, B.id, D.id
    ORDER BY random ()
    LIMIT 30;
    `,
      [level, id]
    )
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((e) => {
      return null;
    });
};*/

//the items and topics
const getItemsAndTopicsByLevel = (level, db) => {
  return db
    .query(
      `
    SELECT A.id,  A.item, B.topic_id as topic_id, count(C.id) as answers, D.topic as topic, C.user_id as user_id
    FROM items A
    JOIN item_topics B ON B.item_id = A.id
    JOIN answer_items C ON C.item_id=A.id
    JOIN topics D on D.id = B.topic_id
    WHERE D.id <=  $1 AND A.approved = true
    GROUP BY A.id, A.item, B.topic_id, D.topic, C.user_id
        ORDER BY random ()
    LIMIT 30;
    `,
      [level]
    )
    .then((res) => {
      console.log("what are the items", res.rows);
      return res.rows;
    })
    .catch((e) => {
      return null;
    });
};

const getItemsByTopic = (topics) => {
  const itemsForTopic = [];
  itemsForTopic = topics.map((topic) =>
    db
      .query(
        `
      select * from items
      join item_topics on id = item_topics.item_id
      where item_topics.topic_id =$1;
      `,
        [topic]
      )
      .then((res) => {
        // console.log("res in the function", res)
        return res.rows[0];
      })
      .catch((e) => {
        return null;
      })
  );
};
const getNbAnswersByItem = (item) => {
  db.query("SELECT COUNT(id) FROM answer_items  WHERE item_id = $1;", [item])
    .then((res) => {
      return res.rows[0];
    })
    .catch((e) => {
      return null;
    });
};

const addItem = (creator, item, time, approved, db) => {
  return db
    .query(
      `INSERT INTO items (creator_id, item, time, approved)
  VALUES ($1, $2, $3, $4)
  RETURNING *;`,
      [creator, item, time, approved]
    )
    .then((res) => {
      // console.log("item added in the function addItem",res.rows[0])
      return res.rows[0];
    })
    .catch((e) => {
      console.log("error", e);
      return e;
    });
};
const addTopic = (t, db) => {
  // console.log("topic",t)
  return db
    .query(
      `SELECT * FROM topics 
    WHERE topic = $1;`,
      [t]
    )
    .then((res) => {
      if (res.rows.length === 0) {
        return db
          .query(
            `INSERT INTO topics (topic)
            VALUES ($1)
            RETURNING *;`,
            [t]
          )
          .then((res1) => {
            return res1.rows[0];
          })
          .catch((e) => {
            return null;
          });
      } else {
        // console.log("line 131 of addTopic");
        return res.rows[0];
      }
    });
};
const addItemTopic = (item_id, topic_id, db) => {
  // console.log("i am here")
  return db
    .query(
      `INSERT INTO item_topics (item_id, topic_id)
VALUES ($1,$2)
RETURNING *;`,
      [item_id, topic_id]
    )
    .then((res) => {
      // console.log("Association item_topics added in the function addItemTopic",res.rows[0])
      return res.rows[0];
    })
    .catch((e) => {
      return null;
    });
};

const addUserTopic = (user_id, topic_id, db) => {
  db.query(
    `INSERT INTO user_topics (user_id, topic_id)
  VALUES ($1,$2)
  RETURNING *;`,
    [user_id, topic_id]
  )
    .then((res) => {
      //console.log("Association user_topics added in the function addFavTopic",res.rows[0])
      return res.rows[0];
    })
    .catch((e) => {
      return null;
    });
};

//For admin

const getItemsByTopicId = (id, db) => {
  return db
    .query(
      `
    SELECT A.*
    FROM items A
    JOIN item_topics B ON B.item_id = A.id
    JOIN topics C ON C.id = B.topic_id
    WHERE C.id = $1;
  `,
      [id]
    )
    .then((res) => {
      //console.log("items in function", res)
      return res.rows;
    })
    .catch((e) => {
      return null;
    });
};

const deleteTopic = (id, db) => {
  return db.query(`DELETE FROM topics WHERE id = $1;`, [id]).then(() => {
    return db
      .query(`DELETE FROM user_topics WHERE topic_id = $1;`, [id])
      .then(() => {
        return db
          .query(`DELETE FROM item_topics WHERE topic_id = $1;`, [id])
          .then(() => console.log("I am in deleteTopic function"));
      });
  });
};

const deleteItem = (id, db) => {
  return db.query(`DELETE FROM items WHERE id = $1;`, [id]).then(() => {
    return db
      .query(`DELETE FROM item_topics WHERE item_id = $1;`, [id])
      .then(() => {
        return db
          .query(`DELETE FROM answer_items WHERE item_id = $1;`, [id])
          .then(() => console.log("I am in deleteItem function"));
      });
  });
};
//add an answer for an item
const addItemAnswer = (item_id, user_id, answer, db) => {
  if (user_id) {
    db.query(
      `INSERT INTO answer_items (item_id, user_id, answer, date)
  VALUES ($1, $2, $3, NOW())
  RETURNING *;`,
      [item_id, user_id, answer]
    )
      .then((res) => {
        console.log("the inserted row is", res.rows[0]);
        return res.rows[0];
      })
      .catch((e) => {
        return null;
      });
  }
};
//add a guess for about an item
const addItemGuess = (item_id, user_id, guess, points, db) => {
  if (user_id) {
    db.query(
      `INSERT INTO guess_items (item_id, user_id, guess, date, points)
  VALUES ($1, $2, $3, NOW(), $4)
  RETURNING *;`,
      [item_id, user_id, guess, points]
    )
      .then((res) => {
        console.log("the inserted row about guess is", res.rows[0]);
        return res.rows[0];
      })
      .catch((e) => {
        return null;
      });
  }
};
//getting how many user has answered x option for x item
const getNbAnswersForOption = (question, option, db) => {
  let sql = `
    SELECT count(A.id) as nbAnswers
    FROM answer_items A
    Join items B on B.id = A.item_id
    WHERE B.item = $1 AND A.answer = $2
    GROUP BY (B.id);   
    `;
  return db
    .query(sql, [question, option])
    .then((res) => {
      if (res.rows[0]) {
        return res.rows[0];
      }
      return { nbanswers: "0" };
    })
    .catch((e) => {
      return null;
    });
};

//getting how many user has answered x option for x item
const getItemsAndScores = (user, db) => {
  let sql = `
    SELECT A.item_id as item_id, B.item as item, A.user_id as user_id,  A.guess as guess, A.points as points 
    FROM guess_items A
    LEFT OUTER Join items B on B.id = A.item_id
    WHERE A.user_id = $1
    GROUP BY A.item_id, B.item, A.user_id, A.guess, A.points ;   
    `;
  return db
    .query(sql, [user])
    .then((res) => {
      if (res.rows) {
        return res.rows;
      }
    })
    .catch((e) => {
      return null;
    });
};

//getting the number of answer for a specific question according to gender
const getNbAnswersForOptionByRelation = (question, option, relation, db) => {
  let sql;
  if (relation === "single") {
    sql = `
      SELECT count(A.id) as nbAnswers
      FROM answer_items A
      Join items B on B.id = A.item_id
      Join users C on C.id =A.user_id
      WHERE B.id = $1 AND A.answer = $2 AND (C.relationship = 'single' OR C.relationship = 'divorced' OR C.relationship = 'widowed')
      GROUP BY (B.id);
      `;
  } else if (relation === "engaged") {
    sql = `
      SELECT count(A.id) as nbAnswers
      FROM answer_items A
      Join items B on B.id = A.item_id
      Join users C on C.id =A.user_id
      WHERE B.id = $1 AND A.answer = $2 AND (C.relationship = 'married' OR C.relationship = 'living with a partner')
      GROUP BY (B.id);
      `;
  }
  return db
    .query(sql, [question, option])
    .then((res) => {
      /* console.log('by relation', res.rows[0])*/
      if (res.rows[0]) {
        return res.rows[0];
      }
      return { nbanswers: "0" };
    })
    .catch((e) => {
      return null;
    });
};
//////////////////
//getting the number of answer for a specific question according to gender
const getNbAnswersForOptionByGender = (question, option, gender, db) => {
  let sql = `
    SELECT count(A.id) as nbAnswers
    FROM answer_items A
    Join items B on B.id = A.item_id
    Join users C on C.id =A.user_id
    WHERE B.id = $1 AND A.answer = $2 AND C.gender = $3
    GROUP BY (B.id);   
    `;
  return db
    .query(sql, [question, option, gender])
    .then((res) => {
      if (res.rows[0]) {
        return res.rows[0];
      }
      return { nbanswers: "0" };
    })
    .catch((e) => {
      return null;
    });
};
const updateUser = (userdata, db) => {
  const {
    name,
    last_name,
    birth_date,
    gender,
    country,
    city,
    relationship,
    email,
  } = userdata;
  return db
    .query(
      `Update users SET name = $1, last_name = $2, birth_date = $3,gender = $4, country = $5, city = $6, relationship = $7  WHERE email = $8 returning *;`,
      [name, last_name, birth_date, gender, country, city, relationship, email]
    )
    .then((res) => {
      //console.log(res)
      return res.rows[0];
    })
    .catch((e) => {
      //console.log(e)
      return null;
    });
};
//update the profile picture for the user
const updateUserPic = (profile_pic, email, db) => {
  return db
    .query(`Update users SET profile_pic = $1 where email = $2 returning *;`, [
      profile_pic,
      email,
    ])
    .then((res) => {
      //console.log(res)
      return res.rows[0];
    })
    .catch((e) => {
      //console.log(e)
      return null;
    });
};
//update the level of the user
const upUserLevel = (l, id, db) => {
  return db
    .query(`Update users SET user_level = $1 where id = $2 returning *;`, [
      l,
      id,
    ])
    .then((res) => {
      console.log("about updating level", res.rows[0]);
      return res.rows[0];
    })
    .catch((e) => {
      console.log(e);
      return null;
    });
};
//randomly return an item for a specific topic
const getRandomItemForTopic = (topic, db) => {
  return db
    .query(
      `
    SELECT A.id, A.item, C.topic
    FROM items A
    JOIN item_topics B ON A.id = B.item_id
    JOIN topics C ON  B.topic_id = C.id
    WHERE C.topic = $1
    ORDER BY random ()
    LIMIT 1;`,
      [topic]
    )
    .then((res) => {
      return res.rows[0];
    })
    .catch((e) => {
      return null;
    });
};
//get the sum of points (score) a user accumulated knowing his id
const getScoreForUser = (user, db) => {
  return db
    .query(
      `
    SELECT SUM (points)
    FROM guess_items
    WHERE user_id = $1;
  
  `,
      [user]
    )
    .then((res) => {
      return res.rows[0].sum;
    })
    .catch((e) => {
      return null;
    });
};

//get the topics opened for specific user
const getTopicsForUser = (level, db) => {
  return db
    .query(
      `
    SELECT topic
    FROM topics
    WHERE topic_level <= $1;
  `,
      [level]
    )
    .then((res) => {
      console.log("topics got", res.rows);
      return res.rows;
    })
    .catch((e) => {
      return null;
    });
};

//get the level of a certain user knowing his id
const getLevelForUser = (user, db) => {
  return db
    .query(
      `
    SELECT user_level
    FROM users
    WHERE id = $1;
  
  `,
      [user]
    )
    .then((res) => {
      return res.rows[0].user_level;
    })
    .catch((e) => {
      return null;
    });
};

const verifyJWT = (req, res, next) => {
  console.log("token in verifyJWT", req.headers);
  const token = req.headers("x-access-token");
  if (!token) {
    res.send("You're not autorised");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "You failed to authenticate" });
      } else {
        res.userId = decoded.id;
        next();
      }
    });
  }
};

module.exports = {
  getUserByEmail,
  addUser,
  getScoreForUser,
  getItemsAndTopicsByLevel,
  getItemsByTopic,
  getNbAnswersByItem,
  addItem,
  addTopic,
  addItemTopic,
  getNbAnswersforOptionById,
  addUserTopic,
  getItemsByTopicId,
  deleteTopic,
  deleteItem,
  getNbAnswersForOption,
  getNbAnswersForOptionByGender,
  getNbAnswersForOptionByRelation,
  updateUser,
  addUserGF,
  addItemAnswer,
  addUserLoginGF,
  getRandomItemForTopic,
  updateUserPic,
  getAnswersForItem,
  addItemGuess,
  getItemsAndScores,
  upUserLevel,
  getLevelForUser,
  getTopicsForUser,
};
