import { Observable, of } from 'rxjs';

import { IProject, IReport } from '../interfaces';

export class Project implements IProject {
  public projectId: string;
  public userIds: string[];
  public rule: string;
  public gatewayIds: string[];
  public structure: string;
  public industry: string;
  public website: string;
  public description: string;
  public image: string;
  public name: string;

  constructor(project: IProject) {
    this.projectId = project.projectId;
    this.userIds = project.userIds;
    this.rule = project.rule;
    this.gatewayIds = project.gatewayIds;
    this.structure = project.structure;
    this.industry = project.industry;
    this.website = project.website;
    this.description = project.description;
    this.image = project.image;
    this.name = project.name;
  }
}
