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
  const {name, lastName, birthDate, gender, email, password, profilePic, country, region, city, referrer, type, relationship, family} = userData;
  return db.query(`
  INSERT INTO users (name, last_name, birth_date, gender,  email, password, profile_pic, country, region, city, referrer, type, relationship, family)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
    `, [name, lastName, birthDate, gender, email, password, profilePic, country, region, city, referrer, type, relationship, family])
    .then(res => {
      console.log(res.rows[0])
      return res.rows[0];
    })
    .catch(e => {
      return null;
    });
};

const getItemsByUserType = (email, type, db) => {

  let sql = `
    SELECT item 
    FROM items
    LIMIT 20;`
  
  if (type === "normal"){
    sql = `
    SELECT item FROM items A
    JOIN item_topics B ON B.item_id = A.id
    JOIN user_topics C ON B.topic_id = C.topic_id
    JOIN users D ON C.user_id = D.id
      WHERE D.email = $1;
    
    `,[email];
  }
  
  return db.query(sql)
    .then(res => {
      console.log("query of getitemsbyusertype",sql)
      console.log("res in function getItemByUserType",res.rows)
      let items = res.rows.map(element => element.item);
      return items;
    })
    .catch(e => {
      return null;
    });
};

module.exports = {
  getUserByEmail,
  addUser,
  getItemsByUserType
};