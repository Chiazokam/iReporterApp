import Record from '../models/ireportModel';
const recordObject = new Record();

const recordControllers = {
  createNewRecord(req, res) {
    return res.status(201).send({ data: [recordObject.createRecord(req.body)] });
  },

  viewAllRedflags(req, res) {
    res.status(200).send({ data: [recordObject.findAllRecords('redflag')] });
  },

  viewAllInterventions(req, res) {
    res.status(200).send({ data: [recordObject.findAllRecords('intervention')] });
  },

  viewOneRedflag(req, res) {
    const { foundRecord } = recordObject.findOneRecord(req.params.id);
    if (!foundRecord) {
      res.status(404).send({ error: 'Record not found' });
    } else {
      res.status(200).send({ data: [foundRecord] });
    }
  },

  viewOneIntervention(req, res) {
    const { foundRecord } = recordObject.findOneRecord(req.params.id);
    if (!foundRecord) {
      res.status(404).send({ error: 'Record not found' });
    } else {
      res.status(200).send({ data: [foundRecord] });
    }
  },

  editRecordComment(req, res) {
    const { foundRecord } = recordObject.findOneRecord(req.params.id);
    if (req.body.comment) {
      recordObject.updateComment(req.params.id, req.body.comment)
      return res.status(200).send({ data: [{ id: Number(req.params.id), message: 'Updated record\'s comment' }] });
    }
    return res.status(404).send({ error: 'Record not found' });
  },

  editRecordLocation(req, res) {
    const { foundRecord } = recordObject.findOneRecord(req.params.id);
    if (req.body.location) {
      recordObject.updateLocation(req.params.id, req.body.location)
      return res.status(200).send({ data: [{ id: Number(req.params.id), message: 'Updated record\'s comment' }] });
    }
    return res.status(404).send({ error: 'Record not found' });
  },

  deleteIntervention(req, res) {
    const { foundRecord } = recordObject.findOneRecord(req.params.id);
    if (!foundRecord) {
      res.status(404).send({ error: 'Record not found' });
    } else {
      recordObject.deleteRecord(req.params.id)
      res.status(200).send({ data: [{ id: Number(req.params.id), message: 'intervention record has been deleted' }] })
    }
  }
};

export default recordControllers;
