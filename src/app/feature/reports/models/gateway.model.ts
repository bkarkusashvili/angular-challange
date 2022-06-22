import { Observable, of } from 'rxjs';

import { IGateway } from '../interfaces';

export class Gateway implements IGateway {
  public gatewayId: string;
  public userIds: string[];
  public name: string;
  public type: string;
  public apiKey: string;
  public secondaryApiKey: string;
  public description: string;

  public totalPrice$: Observable<number> = of(0);

  constructor(project: IGateway) {
    this.gatewayId = project.gatewayId;
    this.userIds = project.userIds;
    this.name = project.name;
    this.type = project.type;
    this.apiKey = project.apiKey;
    this.secondaryApiKey = project.secondaryApiKey;
    this.description = project.description;
  }

  public addTotalPrice(totalPrice: Observable<number>): Gateway {
    this.totalPrice$ = totalPrice;

    return this;
  }
}
