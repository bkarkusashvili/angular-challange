import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';

import { environment } from './../../../environments/environment';
import { EndPoint } from '../enums';
import { User } from '../models';
import { IUser, IUserResponse } from '../interfaces';

@Injectable()
export class UserService {
  private defaultUser: IUser = {
    userId: 'rahej',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
  };

  constructor(private http: HttpClient) {}

  private getUsers(): Observable<IUser[]> {
    return this.http.get<IUserResponse>(environment.api + EndPoint.Users).pipe(
      retry(3),
      map((res) => res.data)
    );
  }

  public getFirstUser(): Observable<User> {
    return this.getUsers().pipe(
      map((users) => new User(users[0] || this.defaultUser))
    );
  }
}
