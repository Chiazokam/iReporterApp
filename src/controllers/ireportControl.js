import Record from '../models/ireportModel';
const recordObject = new Record();

const recordControllers = {
  createNewRecord(req, res) {
    if (!req.body.title || !req.body.createdOn || !req.body.location
      || !req.body.comment || !req.body.image || !req.body.video) {
      return res.status(400).send({ error: 'Incomplete data' });
    }
    return res.status(201).send({ data: [recordObject.createRecord(req.body)] });
  },

  viewAllRedflags(req, res) {
    res.status(200).send({ data: [recordObject.findAllRecords('redflag')] });
  },

  viewAllInterventions(req, res) {
    res.status(200).send({ data: [recordObject.findAllRecords('intervention')] });
  },

  viewOneRedflag(req, res) {
    if (!recordObject.findOneRecord(req.params.id)) {
      res.status(404).send({ error: 'Record not found' });
    } else {
      res.status(200).send({ data: [recordObject.findOneRecord(req.params.id)] });
    }
  },

  viewOneIntervention(req, res) {
    if (!recordObject.findOneRecord(req.params.id)) {
      res.status(404).send({ error: 'Record not found' });
    } else {
      res.status(200).send({ data: [recordObject.findOneRecord(req.params.id)] });
    }
  },

  editRedflagComment(req, res) {
    if (!recordObject.findOneRecord(req.params.id)) {
      res.status(404).send({ error: 'Record not found' });
    } else {
      recordObject.updateComment(req.params.id, req.body)
      res.status(200).send({ data: { id: Number(req.params.id), message: 'Updated red-flag record\'s comment' } });
    }
  },
};

// module.exports = recordControllers;
export default recordControllers;
