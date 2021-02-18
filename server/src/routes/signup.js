const router = require("express").Router();
const bcrypt = require('bcrypt');
const { getUserByEmail, addUser,updateUser } = require("../helpers");

module.exports = db => {
 
   router.post('/signup', (req, res) => {
    const { name, last_name, birth_date, gender, email, password, profile_pic, country, region, city, referrer, type, relationship, family} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 12);
  
    if (!name || !last_name || !birth_date || !gender|| !email | !password || !country || !region || !city || !relationship || !family) {
      res.send("You are missing a field");
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
      region: region,
      city: city,
      referrer: referrer,
      type: type,
      relationship: relationship,
      family: family 
    };
    getUserByEmail(email, db)
      .then(response => {
        if (response) {
          res.send({error: "An account with this email exist"});
          return;
        }
        addUser(userData, db).then(newUser => {
          console.log(newUser);
          
          // req.session['userID'] = newUser['id'];
          res.send(newUser);
          return;
        })
          .catch(e => res.send("error"));
          
      })
      .catch(e => {
        res.status(500).json({ error: e.message});
      });
  });

  router.post('/update', (req,res) => {
    const { name, last_name, birth_date, gender, profile_pic, country, region, city, relationship, family, email} = req.body;
    console.log("Hello")
    if (!name || !last_name || !birth_date || !gender|| !country || !region || !city || !relationship || !family) {
      res.status(500).send("You are missing a field");
      return;
    }
    const userData = {
      name: name,
      last_name:last_name,     
      birth_date:birth_date,
      gender:gender,
      profile_pic : profile_pic,
      country: country,
      region: region,
      city: city,
      relationship: relationship,
      family: family, 
      email:email
    };
    updateUser(userData, db).then(newUser => {
      console.log("New USER", newUser)
        res.send(newUser);
        return;
      })
        .catch(e => res.send("error"));    
  });

  return router;
};