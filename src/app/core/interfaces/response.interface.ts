import { ErrorCode } from '../enums';
import { IUser } from './user.interface';

export interface Response {
  code: ErrorCode;
  error: null | unknown;
}

export interface IUserResponse extends Response {
  data: IUser[];
}
