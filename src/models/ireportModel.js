class Record {
  constructor() {
    this.records = [];
  }

  createRecord(record) {
    const newRecord = {
      id: this.records.length + 1,
      title: record.title,
      createdOn: record.createdOn,
      createdBy: record.createdBy,
      type: record.type,
      status: record.status,
      comment: record.comment,
      location: record.location,
      image: record.image,
      video: record.video,
    };
    this.records.push(newRecord);
    return (newRecord);
  }

  findAllRecords(recordType) {
    const allFoundRecords = [];
    for (let obj = 0; obj < this.records.length; obj++) {
      if (this.records[obj].type === recordType) {
        allFoundRecords.push(this.records[obj]);
      }
    }
    return (allFoundRecords);
  }

  findOneRecord(id) {
    const foundRecord = this.records.find(record => record.id === Number(id));
    const foundIndex = this.records.findIndex(record => record.id === Number(id));
    const foundObject = {
      foundRecord: foundRecord,
      foundIndex: foundIndex,
    }
    return (foundObject);
  }

  // record from the controller will be req.body
  updateComment(id, record) {
    const { foundRecord, foundIndex } = this.findOneRecord(id);
    this.records[foundIndex].comment = record.comment;
    return {};
  }

  updateLocation(id, record) {
    const { foundRecord, foundIndex } = this.findOneRecord(id);
    this.records[foundIndex].location = record.location;
    return {};
  }

  deleteRecord(id) {
    const { foundRecord, foundIndex } = this.findOneRecord(id);
    this.records[foundIndex].splice(foundIndex, 1);
    return {};
  }
}
export default Record;
