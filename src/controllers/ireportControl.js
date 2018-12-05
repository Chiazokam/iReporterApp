import Record from '../models/ireportModel';
// const Record = require('../models/ireportModel');

const recordControllers = {
  createNewRecord(req, res) {
    if (!req.body.title || !req.body.createdOn || !req.body.location
      || !req.body.comment || !req.body.image || !req.body.video) {
      return res.status(400).send({ error: 'Incomplete data' });
    }
    return res.status(201).send({ data: [Record.createRecord(req.body)] });
  },
};

// module.exports = recordControllers;
export default recordControllers;
