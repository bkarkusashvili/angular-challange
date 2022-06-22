import { Response } from 'src/app/core/interfaces';

export interface IGateway {
  gatewayId: string;
  userIds: string[];
  name: string;
  type: string;
  apiKey: string;
  secondaryApiKey: string;
  description: string;
}

export interface IGatewayResponse extends Response {
  data: IGateway[];
}
