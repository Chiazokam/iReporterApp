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

  viewAllRedflags(req, res) {
    res.status(200).send({ data: [Record.findAllRecords('redflag')] });
  },

  viewAllInterventions(req, res) {
    res.status(200).send({ data: [Record.findAllRecords('intervention')] });
  },

  viewOneRedflag(req, res) {
    if (!Record.findOneRecord(req.params.id)) {
      res.status(404).send({ error: 'Record not found' });
    } else {
      res.status(200).send({ data: [Record.findOneRecord(req.params.id)] });
    }
  },

  viewOneIntervention(req, res) {
    if (!Record.findOneRecord(req.params.id)) {
      res.status(404).send({ error: 'Record not found' });
    } else {
      res.status(200).send({ data: [Record.findOneRecord(req.params.id)] });
    }
  },
};

// module.exports = recordControllers;
export default recordControllers;
