const router = require("express").Router();
const bcrypt = require('bcrypt');
const {getUserByEmail, addUserLoginGF} = require ("../helpers");

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
    console.log("details in the router logingf", req.body)    
    const { email, name, last_name, profile_pic} = req.body;

    getUserByEmail(email, db)
      .then(user => {
        console.log("user in router logingf",user)
        if (!user) {
          const userData = {
          name: name,
          last_name:last_name,     
          email: email,
          profile_pic : profile_pic
           };
          addUserLoginGF(userData, db).then(newUser => {
          console.log("newUser in res of function addUserLoginGf in router signupgf",newUser);
          res.send(newUser);
          //return newUser;
        })
        } else {
          res.send(user);
        }        
          
      })
      .catch(e => {
        if (e) {
          res.status(401).json({ error: e.message });
        }
      });
  })
  return router;
};