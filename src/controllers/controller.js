import db from '../db';
import moment from 'moment';
// import 'babel-polyfill';

const recordController = {
  createRecord(req, res) {
    const { title, createdOn, createdBy, type, location, comment, images, videos } = req.body;
    db.any(`INSERT INTO records(title, createdOn, createdBy, type, comment, location, status, images, videos)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, [
            title,
            createdOn,
            createdBy,
            type,
            comment,
            location,
            'draft',
            images,
            videos
          ])
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
        error
      });
    });
 }
}

export default recordController;
