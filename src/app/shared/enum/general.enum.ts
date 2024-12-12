export enum PageMode {
  List = 1,
  Add = 2,
  Edit = 3,
}

export enum SortDirectionEnum {
  Ascending = 0,
  Descending = 1,
}

export enum Language {
  Danish = 1,
  English = 2,
}

export enum Locale {
  Danish = 'dk',
  English = 'en',
}

export enum MessageType {
  Success = 0,
  Error = 1,
  Warning = 2,
}

export enum ResultStatusEnum {
  Success = 0,
  Error = 1,
}

export enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

export enum OperationMode {
  VIEW = 'View',
  ADD = 'Add',
  EDIT = 'Edit',
  DELETE = 'Delete'
}

export enum MaxFileSizes {
  Image = 5242880, // 5 MB in bytes >> 5 * 1024 * 1024
  Video = 52428800, // 50 MB in bytes >> 5 * 1024 * 1024
}

export enum Maxlength {
  NAME = 100,
  CODE = 50,
  Email  = 150,
  NATIONAL_ADDRESS  = 8,
  USERNAME = 50,
  PASSWORD = 50,
  LECEINCE = 20,
  MODEL = 50,
  NOTES = 1000,
  PHONE = 12,
}