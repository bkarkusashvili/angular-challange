import { Response } from 'src/app/core/interfaces';

export interface IReport {
  amount: number;
  created: string;
  gatewayId: string;
  modified: string;
  paymentId: string;
  projectId: string;
  userIds: string[];
}

export interface IReportResponse extends Response {
  data: IReport[];
}

export interface IReportRequest {
  from?: string | null;
  to?: string | null;
  projectId?: string;
  gatewayId?: string;
}
