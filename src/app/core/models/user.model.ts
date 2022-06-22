import { IUser } from '../interfaces';

export class User implements IUser {
  public userId: string;
  public firstName: string;
  public lastName: string;
  public email: string;

  constructor(user: IUser) {
    this.userId = user.userId;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
  }

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public get avatar(): string {
    return `
      ${this.firstName.slice(0, 1)}${this.lastName.slice(0, 1)}
    `.toUpperCase();
  }
}
