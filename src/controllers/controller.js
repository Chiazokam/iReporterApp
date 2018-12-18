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
                error: 'Username or password is incorrect'
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
            error: 'Username or password is incorrect'
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
          error: 'User has no redflags'
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
          error: 'User has no interventions'
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
          error: 'Redflag does not exist'
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

  viewOneIntervention(req, res) {
    const userId = req.userData.id;
    const intervId = req.params.id;
    const type = 'intervention';
    query.viewOneRecordQuery(type, userId, intervId)
    .then((record) => {   // Returns an array with one object
      if (record.length === 0) {
          res.status(404).send({
          status: 404,
          error: 'Intervention does not exist'
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

  editRedflagComment(req, res) {
    const { comment } = req.body;
    const userId = req.userData.id;
    const redflagId = req.params.id;
    const type = 'redflag';

    query.viewOneRecordQuery(type, userId, redflagId)
    .then((record) => {
      if (record.length < 1) {
          res.status(404).send({
          status: 404,
          error: 'Record does not exist'
        })
      } else {
          query.updateRecordComment(comment, redflagId)
            if (type === 'redflag'){
                res.status(200).send({
                status: 200,
                data: [{
                  id: record[0].id,
                  message: "Updated Redflag's comment"
                }]
              })
            }
      }
    })
    .catch((error) => {
      res.status(500).send({
      error: error.message
      });
    })
  },

  editRedflagLocation(req, res) {
    const { location } = req.body;
    const userId = req.userData.id;
    const redflagId = req.params.id;
    const type = 'redflag';

    query.viewOneRecordQuery(type, userId, redflagId)
    .then((record) => {
      if (record.length < 1) {
          res.status(404).send({
          status: 404,
          error: 'Record does not exist'
        })
      } else {
          query.updateRecordLocation(location, redflagId)
            if (type === 'redflag'){
                res.status(200).send({
                status: 200,
                data: [{
                  id: record[0].id,
                  message: "Updated Redflag's location"
                }]
              })
            }
      }
    })
    .catch((error) => {
      res.status(500).send({
      error: error.message
      });
    })
  },

  editIntervComment(req, res) {
    const { comment } = req.body;
    const userId = req.userData.id;
    const intervId = req.params.id;
    const type = 'intervention';

    query.viewOneRecordQuery(type, userId, intervId)
    .then((record) => {
      if (record.length < 1) {
          res.status(404).send({
          status: 404,
          error: 'Record does not exist'
        })
      } else {
          query.updateRecordComment(comment, intervId)
            if (type === 'intervention'){
                res.status(200).send({
                status: 200,
                data: [{
                  id: record[0].id,
                  message: "Updated Intervention's comment"
                }]
              })
            }
      }
    })
    .catch((error) => {
      res.status(500).send({
      error: error.message
      });
    })
  },

  editIntervLocation(req, res) {
    const { location } = req.body;
    const userId = req.userData.id;
    const intervId = req.params.id;
    const type = 'intervention';

    query.viewOneRecordQuery(type, userId, intervId)
    .then((record) => {
      if (record.length < 1) {
          res.status(404).send({
          status: 404,
          error: 'Record does not exist'
        })
      } else {
          query.updateRecordLocation(location, intervId)
            if (type === 'intervention'){
                res.status(200).send({
                status: 200,
                data: [{
                  id: record[0].id,
                  message: "Updated Intervention's location"
                }]
              })
            }
      }
    })
    .catch((error) => {
      res.status(500).send({
      error: error.message
      });
    })
  },

  deleteRedflag(req, res) {
    const redflagId = req.params.id;
    const userId = req.userData.id;
    const type = 'redflag';

    query.viewOneRecordQuery(type, userId, redflagId)
    .then((record) => {
      if (record.length < 1) {
          res.status(404).send({
          status: 404,
          error: 'Redflag does not exist'
        })
      } else {
          query.deleteRecord(type, userId, redflagId)
                res.status(200).send({
                status: 200,
                data: [{
                  id: record[0].id,
                  message: "Redflag record has been deleted"
                }]
              })
      }
    })
    .catch((error) => {
      res.status(500).send({
      error: error.message
      });
    })
  },

  deleteIntervention(req, res) {
    const intervId = req.params.id;
    const userId = req.userData.id;
    const type = 'intervention';

    query.viewOneRecordQuery(type, userId, intervId)
    .then((record) => {
      if (record.length < 1) {
          res.status(404).send({
          status: 404,
          error: 'Intervention does not exist'
        })
      } else {
          query.deleteRecord(type, userId, intervId)
                res.status(200).send({
                status: 200,
                data: [{
                  id: record[0].id,
                  message: "Intervention record has been deleted"
                }]
              })
      }
    })
    .catch((error) => {
      res.status(500).send({
      error: error.message
      });
    })
  },

  adminViewAll(req, res) {
    const userId  = req.userData.id;

    query.isUserAdmin(userId)
    .then((user) => {
      const adminObject = {
        id: user[0].id,
        email: user[0].email,
        isAdmin: user[0].isadmin
      }

      if (adminObject.isAdmin === true) {
        query.adminViewAllQuery()
        .then((records) => {
          if (records.length < 1) {
            res.status(404).send({
              status: 404,
              error: "No records found"
            });
          } else {
            res.status(200).send({
              status: 200,
              data: records
            });
          }
        })
      } else if (adminObject.isAdmin === false) {
        res.status(403).send({
          status: 403,
          error: "Unauthorized access"
        });
      }

    })
    .catch((error) => {
      res.status(500).send({
        status: 500,
        error: error.message
      });
    })
   
  },

  adminEditStatus(req, res) {
    const { status } = req.body;
    const userId = req.userData.id;
    const recordId = req.params.id;

    query.isUserAdmin(userId)
    .then((user) => {
      const adminObject = {
        id: user[0].id,
        email: user[0].email,
        isAdmin: user[0].isadmin
      }
      if (adminObject.isAdmin === true) {
        query.adminViewOneRecord(recordId)
        .then((record) => {
          if (record.length < 1) {
            res.status(404).send({
              status: 404,
              error: "Record unavailable"
            });
          } else {
            query.editStatusQuery(status, recordId)
            res.status(200).send({
              id: record[0].id,
              data: [{
                status: 200,
                message: "Status updated"
              }]
            });
          }
        })
      } else if (adminObject.isAdmin === false) {
        res.status(403).send({
          status: 403,
          error: "Action unauthorized"
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        status: 500,
        error: error.message
      });
    })
  },



}

export default recordController;
