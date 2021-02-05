const router = require("express").Router();
const bcrypt = require('bcrypt');
//const getUserByEmail = require ("../helpers");

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
module.exports = db => {
 
  router.post('/login', (req, res) => {
    const {email, password} = req.body;
    console.log("email and password in the router login", email, password)
    getUserByEmail(email, db)
      .then(user => {
        console.log("user in router login",user)
        if (!user) {
          res.send("Email does not exist");
        } else if /*(password !== user['password']) {*/(!bcrypt.compare(password, user['password'])) {
          res.send("Password is incorrect");
          
          return;
        }
        
        res.send(user);
      })
      .catch(e => {
        if (e) {
          res.status(401).json({ error: e.message });
        }
      });
  })
    
  return router;
};