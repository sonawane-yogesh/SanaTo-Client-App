export class DataTrainingMaster {
  DateFormat: string;
  PrimaryKeys: Array<string>;
  NumericFields: Array<string>;
  NonNumericFields: Array<string>;
  ProportionalityColumn: string;
  DateColumn: string;
  FileDetails: object;

  constructor(data: DataTrainingMaster) {
    this.DateColumn = data.DateColumn;
    this.DateFormat = data.DateFormat;
    this.NumericFields = data.NumericFields;
    this.PrimaryKeys = data.PrimaryKeys;
    this.NonNumericFields = data.NonNumericFields;
    this.ProportionalityColumn = data.ProportionalityColumn;
    this.FileDetails = data.FileDetails;
  }
  
}
