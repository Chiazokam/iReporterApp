import { Queries } from '../helpers';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const query = new Queries();

dotenv.load();

const recordController = {

  createRedflag(req, res) {
      let { title, location, comment, images, videos } = req.body;
      title = title.trim();
      comment = comment.trim();
      location = location.trim();

      const userId  = req.userData.id;
      const recordDetails = { title, location, createdBy: userId, type: 'redflag', status: 'draft', comment, images, videos };
      query.createRecordQuery(recordDetails)
      .then((record) => {
        const recordData = record[0].id;
        return res.status(201).send({
          status: 201,
          data: [{
            id: recordData,
            message: 'Created Red-flag Record'
          }]
        })
  
      })
      .catch((error) => {
        res.status(500).send({
          error: error.message
        });
      });
    },

    createIntervention(req, res) {
      const { title, location, comment, images, videos } = req.body;
      const createdBy  = req.userData.id;
      const recordDetails = { title, location, createdBy, type: 'intervention', status: 'draft', comment, images, videos };
      query.createRecordQuery(recordDetails)
      .then((record) => {
        const recordData = record[0].id;
        return res.status(201).send({
          status: 201,
          data: [{
            id: recordData,
            message: 'Created Intervention Record'
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
   let { firstname, lastname, othername, email, password, phone, username } = req.body;
   firstname = firstname.trim();
   lastname = lastname.trim();
   othername = othername.trim();
   email = email.trim();
   phone = phone.trim();
   username = username.trim();

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

  viewAllRedflags(req, res) {
    const type = 'redflag';
    const userId  = req.userData.id;
    query.viewAllRecordsQuery(type, userId)
    .then((records) => {
      const userRecords = records[0];
      if (records.length === 0){
        res.status(404).send({
          status: 404,
          message: 'User has no redflags'
        })
      }
      else {
          res.status(200).send({
          status: 200,
          data: records
        })
      }
    })
    .catch((error) => {
      res.status(500).send({
        error: error.message
      });
    })
  },

  viewAllInterventions(req, res) {
    const type = 'intervention';
    const userId  = req.userData.id;
    query.viewAllRecordsQuery(type, userId)
    .then((records) => {
      const userRecords = records[0];
      if (records.length === 0){
        res.status(404).send({
          status: 404,
          message: 'User has no interventions'
        })
      }
      else {
          res.status(200).send({
          status: 200,
          data: records
        })
      }
    })
    .catch((error) => {
      res.status(500).send({
        error: error.message
      });
    })
  },
  
  viewOneRedflag(req, res) {
    const userId = req.userData.id;
    const redflagId = req.params.id;
    const type = 'redflag';
    query.viewOneRecordQuery(type, userId, redflagId)
    .then((record) => {   // Returns an array with one object
      if (record.length === 0) {
          res.status(404).send({
          status: 404,
          message: 'Redflag does not exist'
        })
      } 
      else {
        res.status(200).send({
        status: 200,
        data: record
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
      error: error.message
      });
    })
  },

}

export default recordController;
