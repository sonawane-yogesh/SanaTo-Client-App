export class DataTrainingMaster {
  DateFormat: string;
  PrimaryKeys: Array<string>;
  NumericFields: Array<string>;
  DateColumn: string;
  FileDetails: object;

  constructor(data: DataTrainingMaster) {
    this.DateColumn = data.DateColumn;
    this.DateFormat = data.DateFormat;
    this.NumericFields = data.NumericFields;
    this.PrimaryKeys = data.PrimaryKeys;
    this.FileDetails = data.FileDetails;
  }
}
