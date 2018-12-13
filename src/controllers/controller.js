import db from '../models/db';
import { Queries } from '../helpers';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import moment from 'moment';
const query = new Queries();

dotenv.load();

const recordController = {
  createRedflag(req, res) {
      const { title, location, comment, images, videos } = req.body;
      const userId  = req.userData.id;
      const recordDetails = { title, location, createdBy: userId, type: 'redflag', status: 'draft', comment, images, videos };
      query.createRecordQuery(recordDetails)
      .then((record) => {
        const recordData = record[0].id;
        return res.status(201).send({
          status: 201,
          data: [{
            id: recordData,
            message: 'Redflag posted'
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
     const userObject = {
       id: user.id,
       username: user.username,
       email: user.email,
       firstname: user.firstname,
       lastname: user.lastname,
       othername: user.othername,
       phone: user.phone,
       isAdmin: user.isadmin
     };
     const token = jwt.sign(userObject, process.env.SECRET_KEY, { expiresIn: '2d' });
     return res.status(201).send({
       status: 201,
       data: [{
         token: token,
         user: userObject
       }]
     })

   })
   .catch((error) => {
     res.status(500).send({
       error: error.message
     });
   });
},

  signInUser(req, res) {
    const { email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const userDetails = { email, hash }

    query.userRegisteredQuery(email, hash)
      .then((data) => {
        const user = data[0]
        if (data.length > 0) {
          if (!bcrypt.compareSync(password, user.password)) {
              return res.status(401).send({
                status: 401,
                data: [{
                  message: 'Username or password is incorrect'
                }]
              });
            }
            const userObject = {
              id: user.id,
              username: user.username,
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname,
              othername: user.othername,
              phone: user.phone,
              isAdmin: user.isadmin
            }
            const token = jwt.sign(userObject, process.env.SECRET_KEY, { expiresIn: '2d' });
            return res.status(200).send({
              status: 201,
              data: [{
                token,
                user: userObject
              }]
            })
          } else {
          return res.status(401).send({
            status: 401,
            data: [{
              message: 'Username or password is incorrect'
            }]
          });
        }
      })
      .catch((error) => {
        res.status(500).send({
          error: error.message
        });
      });
  },
  

}

export default recordController;
