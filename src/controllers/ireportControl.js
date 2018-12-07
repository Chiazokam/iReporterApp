import Record from '../models/ireportModel';
const recordObject = new Record();

const recordControllers = {
  createNewRecord(req, res) {
    const { title, createdOn, location, comment, image, video } = req.body;
    if (!title || !createdOn || !location || !comment || !image || !video) {
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
    const { foundRecord, foundIndex } = recordObject.findOneRecord(req.params.id);
    if (!foundRecord) {
      res.status(404).send({ error: 'Record not found' });
    } else {
      res.status(200).send({ data: [foundRecord] });
    }
  },

  viewOneIntervention(req, res) {
    const { foundRecord, foundIndex } = recordObject.findOneRecord(req.params.id);
    if (!foundRecord) {
      res.status(404).send({ error: 'Record not found' });
    } else {
      res.status(200).send({ data: [foundRecord] });
    }
  },

  editRedflagComment(req, res) {
    const { foundRecord, foundIndex } = recordObject.findOneRecord(req.params.id);
    if (!foundRecord) {
      res.status(404).send({ error: 'Record not found' });
    } else {
      recordObject.updateComment(req.params.id, req.body)
      res.status(200).send({ data: [{ id: Number(req.params.id), message: 'Updated record\'s comment' }] });
    }
  },

  editRedflagLocation(req, res) {
    if (!recordObject.findOneRecord(req.params.id)) {
      res.status(404).send({ error: 'Record not found' });
    } else {
      recordObject.updateLocation(req.params.id, req.body)
      res.status(200).send({ data: [{ id: Number(req.params.id), message: 'Updated record\'s comment' }] });
    }
  },

  deleteIntervention(req, res) {
    const { foundRecord, foundIndex } = recordObject.findOneRecord(req.params.id);
    if (!foundRecord) {
      res.status(404).send({ error: 'Record not found' });
    } else {
      recordObject.deleteRecord(req.params.id)
      res.status(200).send({ data: [{ id: Number(req.params.id), message: 'intervention record has been deleted' }] })
    }
  }
};

export default recordControllers;
