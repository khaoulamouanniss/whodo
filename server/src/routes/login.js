const router = require("express").Router();
const bcrypt = require('bcrypt');

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
    getUserByEmail(email, db)
      .then(user => {
        if (!user) {
          res.send("Email does not exist");
        } else if /*(password === user['password']) {*/(!bcrypt.compareSync(password, user['password'])) {
          res.send("Password is incorrect");
          return;
        }
        res.send("Login success");
      })
      .catch(e => {
        if (e) {
          res.status(401).json({ error: e.message });
        }
      });
  })
    
  return router;
};