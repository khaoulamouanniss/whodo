const { request } = require("express");

const getUserByEmail = (email, db) => {
  return db.query(`
    SELECT * 
    FROM users
    WHERE email = $1;
  `, [email])
    .then(res => {
      return res.rows[0];
    })
    .catch(e => {
      return null;
    });
};
const addUser = (userData, db) => {
  const {name, last_name, birth_date, gender, email, password, profile_pic, country, region, city, referrer, type, relationship, family} = userData;
  return db.query(`
  INSERT INTO users (name, last_name, birth_date, gender,  email, password, profile_pic, country, region, city, referrer, type, relationship, family)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
    `, [name, last_name, birth_date, gender, email, password, profile_pic, country, region, city, referrer, type, relationship, family])
    .then(res => {
     console.log(res.rows[0])
      return res.rows[0];
    })
    .catch(e => {
      return null;
    });
};

const getItemsAndTopicsByUserType = (email, type, db) => {

  let sql;
  
  if (type === "normal"){
    console.log("I am in normal")
    sql = `
    SELECT A.id, item, D.topic AS topic, count(B.id) as answers
    FROM items A
    LEFT OUTER JOIN answer_items B ON A.id = B.item_id
    JOIN item_topics C ON C.item_id = A.id
    JOIN topics D ON C.topic_id = D.id
    JOIN user_topics E ON D.id = E.topic_id
    JOIN users F ON E.user_id = F.id
    WHERE F.email = $1
    GROUP BY A.id, A.item, D.topic
    ORDER BY random ()
    LIMIT 20;
    
    `,[email];
  } else if (type === "super") {
    console.log("I am in super")
    sql = `
    SELECT A.id, item, D.topic AS topic, count(B.id) as answers
    FROM items A
    LEFT OUTER JOIN answer_items B ON A.id = B.item_id
    JOIN item_topics C ON  A.id = C.item_id
    JOIN topics D ON C.topic_id = D.id
    GROUP BY A.id, A.item, D.topic;`
  } else {
    console.log("I am in anonymous")
    sql = `
    SELECT A.id, item, D.topic AS topic, count(B.id) as answers
    FROM items A
    LEFT OUTER JOIN answer_items B ON A.id = B.item_id
    JOIN item_topics C ON  A.id = C.item_id
    JOIN topics D ON C.topic_id = D.id
    GROUP BY A.id, A.item, D.topic
    ORDER BY random ()
    LIMIT 20;`
  }
  return db.query(sql)
    .then(res => {
      console.log("query of getitemsbyusertype",sql)
      //console.log("res in function getItemByUserType",res.rows)
      
      return res.rows;
    })
    .catch(e => {
      return null;
    });
};

const getItemsByTopic = (topics)  => {
  const itemsForTopic=[];
      itemsForTopic = topics.map(topic =>
      db.query(`
      select * from items
      join item_topics on id = item_topics.item_id
      where item_topics.topic_id =$1;
      `, [topic])
      .then(res => {
          return res.rows[0];
        })
        .catch(e => {
          return null;
        })
  );
}
const getNbAnswersByItem = (item) => {
   db.query('SELECT COUNT(id) FROM answer_items  WHERE item_id = $1;', [item])
   .then(res => {
      return res.rows[0];
    })
    .catch(e => {
      return null;
    })
  }
 
const addItem = (creator,item,time,approved,db) => {

  return db.query(`INSERT INTO items (creator_id, item, time, approved)
  VALUES ($1, $2, $3, $4)
  RETURNING *;`, 
  [creator, item, time, approved])
  .then(res => {
   // console.log("item added in the function addItem",res.rows[0])
    return res.rows[0];
  })
  .catch(e => {
    console.log("error", e)
    return e;
  });
 
}
  const addTopic = (t,db) => {
   // console.log("topic",t)
    return db.query(`SELECT * FROM topics 
    WHERE topic = $1;`, [t])
    .then(res => {
     
      if (res.rows.length === 0) {
        
          return db.query(`INSERT INTO topics (topic)
            VALUES ($1)
            RETURNING *;`, 
            [t])
        .then(res1 => {
             // console.log("topic id added in the function addTopic",res1.rows[0])
              return res1.rows[0];
            })
        .catch(e => {
              return null;
            });
      } else {
       // console.log("line 131 of addTopic");
        return res.rows[0];
      }
    })
    
   
  }
const addItemTopic =  (item_id,topic_id,db) => {
 // console.log("i am here")
return db.query(`INSERT INTO item_topics (item_id, topic_id)
VALUES ($1,$2)
RETURNING *;`, 
[item_id, topic_id])
.then(res => {
 // console.log("Association item_topics added in the function addItemTopic",res.rows[0])
  return res.rows[0];
})
.catch(e => {
  return null;
});
}

const addUserTopic = (user_id, topic_id, db) => {
  db.query(`INSERT INTO user_topics (user_id, topic_id)
  VALUES ($1,$2)
  RETURNING *;`, 
[user_id, topic_id])
.then(res => {
  //console.log("Association user_topics added in the function addFavTopic",res.rows[0])
  return res.rows[0];
})
.catch(e => {
  return null;
});
}

//For admin

const getItemsByTopicId =(id,db) => {

  return db.query(`
    SELECT A.*
    FROM items A
    JOIN item_topics B ON B.item_id = A.id
    JOIN topics C ON C.id = B.topic_id
    WHERE C.id = $1;
  `, [id])
    .then(res => {
      //console.log("items in function", res)
      return res.rows;
    })
    .catch(e => {
      return null;
    });
}

const deleteTopic = (id,db) => {
 return db.query(`DELETE FROM topics WHERE id = $1;`, [id])
    .then(() => {
       return db.query(`DELETE FROM user_topics WHERE topic_id = $1;`, [id])
      .then(() => {
         return db.query(`DELETE FROM item_topics WHERE topic_id = $1;`, [id])
         .then(() => console.log("I am in deleteTopic function"))
      })
      
    })
}

const deleteItem = (id,db) => {
  return db.query(`DELETE FROM items WHERE id = $1;`, [id])
     .then(() => {
        return db.query(`DELETE FROM item_topics WHERE item_id = $1;`, [id])
       .then(() => {
          return db.query(`DELETE FROM answer_items WHERE item_id = $1;`, [id])
          .then(() => console.log("I am in deleteItem function"))
       })
       
     })
 }
module.exports = {
  getUserByEmail,
  addUser,
  getItemsAndTopicsByUserType,
  getItemsByTopic,
  getNbAnswersByItem,
  addItem,
  addTopic,
  addItemTopic,
  addUserTopic,
  getItemsByTopicId,
  deleteTopic,
  deleteItem
};