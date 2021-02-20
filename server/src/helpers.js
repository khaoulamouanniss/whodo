const { request } = require("express");

const getUserByEmail = (email, db) => {
  return db.query(`
    SELECT * 
    FROM users
    WHERE email = $1;
  `, [email])
    .then(res => {
      if(res) {
        return res.rows[0];
      }
      return null;
    })
    .catch(e => {
      return null;
    });
};
const addUserLoginGF = (userData, db) => {
  const {name, last_name, email, profile_pic} = userData;
  console.log("data in addUserGF", userData)
  return db.query(`
  INSERT INTO users (name, last_name, email, profile_pic, type)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *;
    `, [name, last_name, email, profile_pic, "normal"])
    .then(res => {
     console.log("user added in function addUserGF",res.rows[0])
      return res.rows[0];
    })
    .catch(e => {
      return null;
    });
};
const addUserGF = (userData, db) => {
  const {name, last_name, birth_date, gender, email, profile_pic, country, region, city, type, relationship, family} = userData;
  console.log("data in addUserGF", userData)
  return db.query(`
  INSERT INTO users (name, last_name, birth_date, gender,  email, profile_pic, country, region, city, type, relationship, family)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *;
    `, [name, last_name, birth_date, gender, email, profile_pic, country, region, city, type, relationship, family])
    .then(res => {
     console.log("user added in function addUserGF",res.rows[0])
      return res.rows[0];
    })
    .catch(e => {
      return null;
    });
};

const addUser = (userData, db) => {
  console.log("data in addUser", userData)
  const {name, last_name, birth_date, gender, email, password, profile_pic, country, region, city, referrer, type, relationship, family} = userData;
  return db.query(`
  INSERT INTO users (name, last_name, birth_date, gender,  email, password, profile_pic, country, region, city, referrer, type, relationship, family)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
    `, [name, last_name, birth_date, gender, email, password, profile_pic, country, region, city, referrer, type, relationship, family])
    .then(res => {
     //console.log(res.rows[0])
      return res.rows[0];
    })
    .catch(e => {
      return null;
    });
};

const getItemsAndTopicsByUserType = (email, type, db) => {

  let sql;
  
  if (type === "normal"){
    //console.log("I am in normal", email)
    return db.query(
      `
    SELECT A.id, item, D.topic AS topic, count(B.id) as answers
    FROM items A
    LEFT OUTER JOIN answer_items B ON A.id = B.item_id
    JOIN item_topics C ON C.item_id = A.id
    JOIN topics D ON C.topic_id = D.id
    JOIN user_topics E ON D.id = E.topic_id
    JOIN users F ON E.user_id = F.id
    WHERE F.email = $1 AND A.approved = true
    GROUP BY A.id, A.item, D.topic
    ORDER BY random ()
    LIMIT 20;
    `,[email]
    )
    .then(res => {
     // console.log("query of getitemsbyusertype",sql)
     // console.log("items in function getItemByUserType",res.rows)
      
      return res.rows;
    })
   
  } else if (type === "super") {
    //console.log("I am in super")
    sql = `
    SELECT A.id, item, D.topic AS topic, count(B.id) as answers
    FROM items A
    LEFT OUTER JOIN answer_items B ON A.id = B.item_id
    JOIN item_topics C ON  A.id = C.item_id
    JOIN topics D ON C.topic_id = D.id
    GROUP BY A.id, A.item, D.topic;`;
  } else {
   // console.log("I am in anonymous")
    sql = `
    SELECT A.id, item, D.topic AS topic, count(B.id) as answers
    FROM items A
    LEFT OUTER JOIN answer_items B ON A.id = B.item_id
    JOIN item_topics C ON  A.id = C.item_id
    JOIN topics D ON C.topic_id = D.id
    WHERE A.approved = true
    GROUP BY A.id, A.item, D.topic
    ORDER BY random ()
    LIMIT 20;`;
  }
  return db.query(sql)
    .then(res => {
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
       // console.log("res in the function", res)
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
 const addItemAnswer = (item_id,user_id,answer, db) => {
  if (user_id){
  db.query(`INSERT INTO answer_items (item_id, user_id, answer, date)
  VALUES ($1, $2, $3, NOW())
  RETURNING *;`, 
  [item_id, user_id, answer])
  .then(res => {
    console.log("the inserted row is",res.rows[0])
    return res.rows[0];
  })
  .catch(e => {
    return null;
  });
  }
}

 const getNbAnswersForOption = (question,option,  db) => {
  let sql = `
    SELECT count(A.id) as nbAnswers
    FROM answer_items A
    Join items B on B.id = A.item_id
    WHERE B.item = $1 AND A.answer = $2
    GROUP BY (B.id);   
    ` ;
  return db.query(sql, [question, option])
    .then(res => {
     if (res.rows[0]) {
      return res.rows[0];
    }
      return {nbanswers: '0'}
    })
    .catch(e => {
      return null;
    });
  };
  //getting the number of answer for a specific question according to gender 
  const getNbAnswersForOptionByRelation = (question,option, relation,  db) => {
    let sql;
    if (relation ='single') {
      sql  = `
      SELECT count(A.id) as nbAnswers
      FROM answer_items A
      Join items B on B.id = A.item_id
      Join users C on C.id =A.user_id
      WHERE B.id = $1 AND A.answer = $2 AND (C.relationship = 'single' OR C.relationship = 'divorced' OR C.relationship = 'widowed')
      GROUP BY (B.id);   
      `
    }
    else if (relation ='engaged') {
      sql  = `
      SELECT count(A.id) as nbAnswers
      FROM answer_items A
      Join items B on B.id = A.item_id
      Join users C on C.id =A.user_id
      WHERE B.id = $1 AND A.answer = $2 AND (C.relationship = 'married' OR C.relationship = 'living with a partner')
      GROUP BY (B.id);   
      ` 
    }
    return db.query(sql, [question, option])
      .then(res => {
        //console.log('by relation', res.rows[0])
       if (res.rows[0]) { 
        // console.log('I am inside the if')
        return res.rows[0];
      }
        return { nbanswers: '0'} 
      })
      .catch(e => {
        return null;
      });
    };
     //////////////////
 //getting the number of answer for a specific question according to gender 
 const getNbAnswersForOptionByGender = (question,option, gender,  db) => {
  let sql = `
    SELECT count(A.id) as nbAnswers
    FROM answer_items A
    Join items B on B.id = A.item_id
    Join users C on C.id =A.user_id
    WHERE B.id = $1 AND A.answer = $2 AND C.gender = $3
    GROUP BY (B.id);   
    ` 
  return db.query(sql, [question, option, gender])
    .then(res => {
      //console.log('by gender', res.rows[0])
     if (res.rows[0]) { 
      // console.log('I am inside the if')
      return res.rows[0];
    }
      return { nbanswers: '0'} 
    })
    .catch(e => {
      return null;
    });
  };

  const updateUser = (userdata, db) => {
    const {name, last_name, birth_date, gender, profile_pic, country, region, city,  relationship, family, email} = userdata;
    return db.query(`Update users SET name = $1, last_name = $2, birth_date = $3,gender = $4,  profile_pic = $5, country = $6, region = $7, city = $8, relationship = $9, family = $10 WHERE email = $11 returning *;`, [name, last_name, birth_date, gender, profile_pic, country, region, city, relationship, family, email])
    .then(res => {
      //console.log(res)
      return res.rows[0]
    })
    .catch(e => {
      //console.log(e)
      return null;
    })
    };
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
  deleteItem,
  getNbAnswersForOption,
  getNbAnswersForOptionByGender,
  getNbAnswersForOptionByRelation,
  updateUser,
  addUserGF,
  addItemAnswer,
  addUserLoginGF
};