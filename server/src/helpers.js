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
module.exports = {
  getUserByEmail,
  addUser
};