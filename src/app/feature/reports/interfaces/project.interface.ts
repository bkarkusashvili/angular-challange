import { Response } from 'src/app/core/interfaces';

export interface IProject {
  projectId: string;
  userIds: string[];
  rule: string;
  gatewayIds: string[];
  structure: string;
  industry: string;
  website: string;
  description: string;
  image: string;
  name: string;
}

export interface IProjectResponse extends Response {
  data: IProject[];
}
