import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { ReportService } from './report.service';
import { environment } from 'src/environments/environment.prod';
import { EndPoint } from 'src/app/core/enums';
import { Gateway } from '../models';
import { IGatewayResponse } from '../interfaces';

@Injectable()
export class GatewayService {
  constructor(private http: HttpClient, private reportService: ReportService) {}

  public getGateways(): Observable<Gateway[]> {
    return this.http
      .get<IGatewayResponse>(environment.api + EndPoint.Gateways)
      .pipe(
        map((res) =>
          res.data.map((item) =>
            new Gateway(item).addTotalPrice(
              this.reportService.getReportsTotal({ gatewayId: item.gatewayId })
            )
          )
        )
      );
  }
}
