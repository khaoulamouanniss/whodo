const router = require("express").Router();
const bcrypt = require('bcrypt');
const {getUserByEmail} = require ("../helpers");

module.exports = db => {
 

  router.post('/login', (req, res) => {
    const {email, password} = req.body;
    //console.log("email and password in the router login", email, password)
    getUserByEmail(email, db)
      .then(user => {
        //console.log("user in router login",user)
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
    
  router.post('/logingf', (req, res) => {
    console.log("email and password in the router logingf", req.body.email)
    getUserByEmail(req.body.email, db)
      .then(user => {
        console.log("user in router logingf",user)
        if (!user) {
          res.send(req.body)
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