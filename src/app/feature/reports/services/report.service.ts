import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { EndPoint } from 'src/app/core/enums';
import { environment } from 'src/environments/environment';
import { IReport, IReportRequest, IReportResponse } from '../interfaces';

@Injectable()
export class ReportService {
  constructor(private http: HttpClient) {}

  public getReports(request: IReportRequest = {}): Observable<IReport[]> {
    return this.http
      .post<IReportResponse>(environment.api + EndPoint.Report, request)
      .pipe(map((res) => res.data));
  }

  public getReportsTotal(request: IReportRequest = {}): Observable<number> {
    return this.getReports(request).pipe(
      map((list) => list.reduce((total, item) => total + item.amount, 0))
    );
  }
}
