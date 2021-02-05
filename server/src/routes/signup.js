const router = require("express").Router();
const bcrypt = require('bcrypt');
const { getUserByEmail, addUser } = require("../helpers");

module.exports = db => {
 
   router.post('/signup', (req, res) => {
    const { name, lastName, birthDate, gender, email, password, profilePic, country, region, city, referrer, type, relationship, family} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 12);
  
    if (!name || !lastName || !birthDate || !gender|| !email | !password || !country || !region || !city || !relationship || !family) {
      res.send("You are missing a field");
      return;
    }
    const userData = {
      name: name,
      lastName:lastName,     
      birthDate:birthDate,
      gender:gender,
      email: email,
      password: hashedPassword,
      profilePic : profilePic,
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
    
  return router;
};