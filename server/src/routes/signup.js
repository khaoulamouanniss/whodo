const router = require("express").Router();
const bcrypt = require('bcrypt');
const { getUserByEmail, addUser,updateUser, addUserGF, updateUserPic } = require("../helpers");
const jwt = require('jsonwebtoken');

module.exports = db => {
 
   router.post('/signup', (req, res) => {
     console.log("req.body into signup router", req.body)
    const { name, last_name, birth_date, gender, email, password, profile_pic, country, city, relationship} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 12);
  
    if (!name || !last_name || !email || !password) {
      res.send({auth:false,message:"You are missing a field!"})
      return;
    }
    const userData = {
      name: name,
      last_name:last_name,     
      birth_date:birth_date,
      gender:gender,
      email: email,
      password: hashedPassword,
      profile_pic : profile_pic,
      country: country,
      city: city,
      type: "normal",
      relationship: relationship
    };
    getUserByEmail(email, db)
      .then(response => {
        if (response) {
          res.send({auth:false,message:"An account with this email exist"})
          return;
        }
        addUser(userData, db).then(user => {
          // console.log(newUser);
          // console.log("user in router after addUser", user)
          const token = jwt.sign({user},"jwtSecret", {
            expiresIn : 360
            })
            res.json({auth:true, token:token, user:user})
          //res.send(user)
            //return;
        })          
      })
      .catch(e => {
        res.status(500).json({ error: e.message});
      });
  });

  router.post('/update', (req,res) => {
    const { name, last_name, birth_date, gender, country, city, relationship,email} = req.body;
   // console.log("Hello")
    
    const userData = {
      name: name,
      last_name:last_name,     
      birth_date:birth_date,
      gender:gender,
      country: country,
      city: city,
      relationship: relationship,
      email:email
    };
    updateUser(userData, db).then(newUser => {
      //console.log("New USER", newUser)
        res.send(newUser);
        return;
      })
        .catch(e => res.send(e));    
  });

  router.post('/signupgf', (req, res) => {
    const { name, last_name, birth_date, gender, email, profile_pic, country, city, relationship} = req.body;
      
     const userData = {
      name: name,
      last_name:last_name,     
      birth_date:birth_date,
      gender:gender,
      email: email,
      profile_pic : profile_pic,
      country: country,
      city: city,
      type: "normal",
      relationship: relationship 
    };
     addUserGF(userData, db).then(user => {
      console.log("newUser in res of function addUserGf in router signupgf",user);
          
          // req.session['userID'] = newUser['id'];
          const token = jwt.sign({user},"jwtSecret", {
            expiresIn : 360
            })
            res.json({auth:true, token:token, user:user})
          return;
        })
          .catch(e => res.send("error"));    
  
    });

    router.post('/uploadpic', (req,res) => {
      const { profile_pic, email} = req.body;
     // console.log("Hello")
      updateUserPic(profile_pic, email, db).then(newUser => {
        //console.log("New USER", newUser)
          res.send(newUser);
          return;
        })
          .catch(e => res.send("error"));    
    });

  return router;
};