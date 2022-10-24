class DalError extends Error {
  code: any;
  constructor(code: any, message: string) {
    super(message);
    this.code = code;
    this.name = 'DAL_ERROR';
  }
}
export default DalError;
