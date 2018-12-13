import db from '../models/db';

class Queries {
  createRecordQuery (recordDetails) {
    db.any(`INSERT INTO records(title, createdBy, type, comment, location, status, images, videos)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [
            recordDetails.title,
            recordDetails.createdBy,
            recordDetails.type,
            recordDetails.comment,
            recordDetails.location,
            recordDetails.draft,
            recordDetails.images,
            recordDetails.videos
          ]);
  }

  userExistence (email, phone, username) {
    return db.any('SELECT * FROM users WHERE email = $1 OR phone = $2 OR username = $3', [email.trim(), phone.trim(), username.trim()]);
  }

  // userDetails is an object
  createUserQuery(userDetails) {
  return db.any(`INSERT INTO users(firstname, lastname, othername, email, password, phone, username)
          VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [
            userDetails.firstname,
            userDetails.lastname,
            userDetails.othername,
            userDetails.email,
            userDetails.hash,
            userDetails.phone,
            userDetails.username,
          ])
  }
}

export default Queries;
