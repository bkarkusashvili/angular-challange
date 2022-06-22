import { ErrorCode } from '../enums';

export interface IError {
  type: ErrorCode;
  error: string;
}
