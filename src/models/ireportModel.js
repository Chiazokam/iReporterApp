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
    return (foundRecord);
  }

  updateRecord(id, record) {
    const foundRecord = this.findOneRecord(id);
    const recordIndex = this.records.indexOf(foundRecord);
    this.records[recordIndex].id = record.id;
    this.records[recordIndex].title = record.title;
    this.records[recordIndex].createdOn = record.createdOn;
    this.records[recordIndex].createdBy = record.createdBy;
    this.records[recordIndex].type = record.type;
    this.records[recordIndex].status = record.status;
    this.records[recordIndex].location = record.location;
    this.records[recordIndex].image = record.image;
    this.records[recordIndex].video = record.video;
    return (this.records[recordIndex]);
  }

  deleteRecord(id) {
    const foundRecord = this.findOneRecord(id);
    const recordIndex = this.records.indexOf(foundRecord);
    this.records[recordIndex].splice(recordIndex, 1);
    return {};
  }
}
// module.exports = Record;
export default new Record();
