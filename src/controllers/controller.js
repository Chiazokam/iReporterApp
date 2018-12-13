import db from '../models/db';
import { Queries } from '../helpers';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import moment from 'moment';
const query = new Queries();

dotenv.load();

const recordController = {
  createRecord(req, res) {
    const { title, type, location, comment, images, videos } = req.body;
    const recordDetails = { title, type, location, draft: 'draft', comment, images, videos }
    query.createRecordQuery(recordDetails)
    .then((record) => {
      const recordData = record[0].id;
      return res.status(201).send({
        status: 201,
        data: [{
          id: recordData,
          message: 'Record posted'
        }]
      })

    })
    .catch((error) => {
      res.status(500).send({
        error: error.message
      });
    });
 },

 createUser(req, res) {
   const { firstname, lastname, othername, email, password, phone, username } = req.body;
   const hash = bcrypt.hashSync(password, 10);
   const userDetails = { firstname, lastname, othername, email, hash, phone, username };
   query.createUserQuery(userDetails)
   .then((data) => {
     const user = data[0];
     const userData = {
       id: user.id,
       username: user.username,
       email: user.email,
       firstname: user.firstname,
       lastname: user.lastname,
       othername: user.othername,
       phone: user.phone,
       isAdmin: user.isadmin
     };
     const token = jwt.sign(userData, process.env.SECRET_KEY, { expiresIn: '2d' });
     return res.status(201).send({
       status: 201,
       data: [{
         token: token,
         user: userData
       }]
     })

   })
   .catch((error) => {
     res.status(500).send({
       error: error.message
     });
   });
}
}

export default recordController;
