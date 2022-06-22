import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { EndPoint } from 'src/app/core/enums';
import { environment } from 'src/environments/environment';
import { IProjectResponse } from '../interfaces';
import { Project } from '../models';
import { ReportService } from './report.service';

@Injectable()
export class ProjectService {
  constructor(private http: HttpClient, private reportService: ReportService) {}

  public getProjects(): Observable<Project[]> {
    return this.http
      .get<IProjectResponse>(environment.api + EndPoint.Projects)
      .pipe(map((res) => res.data.map((item) => new Project(item))));
  }
}
