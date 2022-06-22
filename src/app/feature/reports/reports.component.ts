import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChartData } from 'chart.js';
import * as moment from 'moment';
import { combineLatest, take, tap } from 'rxjs';

import { IOption } from 'src/app/shared/interfaces';
import { IReport } from './interfaces';
import { Gateway, Project } from './models';
import { GatewayService, ProjectService, ReportService } from './services';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  public activeProject = '';

  public projects: Project[] = [];
  public gateways: Gateway[] = [];
  public gatewayNames: { [key: string]: string } = {};
  public reports: { [key: string]: IReport[] } = {};
  public totalPrices: { [key: string]: number } = {};

  public form: FormGroup;

  public activeInfoText = 'All Projects | All Gateways';
  public hasChart = false;
  public chartType: 'projects' | 'gateways' = 'projects';
  public isSingleProject = false;
  public totalPreText = {
    projects: 'GATEWAY ',
    gateways: 'PROJECT ',
  };

  public selectData: {
    [key in 'projects' | 'gateways']: IOption[];
  } = {
    projects: [{ value: '', text: 'All Projects' }],
    gateways: [{ value: '', text: 'All Gateways' }],
  };

  public chartData: ChartData<'doughnut'> = {
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#A259FF', '#F24E1E', '#FFC107', '#6497B1'],
        hoverBackgroundColor: ['#A259FF', '#F24E1E', '#FFC107', '#6497B1'],
        hoverOffset: 4,
      },
    ],
  };

  constructor(
    private projectService: ProjectService,
    private gatewayService: GatewayService,
    private reportService: ReportService,
    private fb: FormBuilder
  ) {
    combineLatest([
      this.projectService.getProjects().pipe(
        tap((list) =>
          list.forEach((item) => {
            this.selectData.projects.push({
              text: item.name,
              value: item.projectId,
            });
          })
        )
      ),
      this.gatewayService.getGateways().pipe(
        tap((list) =>
          list.forEach((item) => {
            this.gatewayNames[item.gatewayId] = item.name;

            this.selectData.gateways.push({
              text: item.name,
              value: item.gatewayId,
            });
          })
        )
      ),
    ])
      .pipe(
        take(1),
        tap(([projects, gateways]) => {
          this.projects = projects;
          this.gateways = gateways;
        })
      )
      .subscribe();

    this.form = this.fb.group({
      projectId: [''],
      gatewayId: [''],
      from: [],
      to: [],
    });

    this.getReports();
  }

  ngOnInit(): void {}

  get chartList(): { name: string }[] {
    return this.chartType === 'projects' ? this.projects : this.gateways;
  }

  get isSingleProjectAllGateway(): boolean {
    return this.form.value.projectId && !this.form.value.gatewayId;
  }

  get isAllProjectSingleGateway(): boolean {
    return !this.form.value.projectId && this.form.value.gatewayId;
  }

  setActiveInfoText() {
    const project = this.selectData.projects.find(
      (item) => item.value === this.form.value.projectId
    )?.text;
    const gateway = this.selectData.gateways.find(
      (item) => item.value === this.form.value.gatewayId
    )?.text;

    this.activeInfoText = `${project} | ${gateway}`;
  }

  toggleProject(projectId: string): void {
    this.activeProject = this.activeProject === projectId ? '' : projectId;
  }

  submit() {
    this.setActiveInfoText();

    this.hasChart =
      this.isSingleProjectAllGateway || this.isAllProjectSingleGateway;
    this.chartType = this.isSingleProjectAllGateway ? 'gateways' : 'projects';
    this.isSingleProject = !!this.form.value.projectId;
    if (this.isSingleProject) {
      this.activeProject = this.form.value.projectId;
    }

    this.getReports();
  }

  setDateType(e: FocusEvent, type = 'date') {
    const element = e.target as HTMLInputElement;
    type = type ? 'date' : this.form.value[element.name] ? 'date' : 'text';

    element.type = type;
  }

  private getReports() {
    const data = this.form.value;

    this.totalPrices = { total: 0 };
    this.reports = {};

    this.reportService
      .getReports({
        projectId: data.projectId,
        gatewayId: data.gatewayId,
        from: data.from ? moment(data.from).format('yyyy-MM-DD') : null,
        to: data.to ? moment(data.to).format('yyyy-MM-DD') : null,
      })
      .pipe(
        take(1),
        tap((list) => {
          list.forEach((item) => {
            if (!this.reports[item.projectId]) {
              this.reports[item.projectId] = [];
            }

            this.reports[item.projectId].push(item);

            if (!this.totalPrices[item.projectId]) {
              this.totalPrices[item.projectId] = 0;
            }

            if (!this.totalPrices[item.gatewayId]) {
              this.totalPrices[item.gatewayId] = 0;
            }

            this.totalPrices[item.projectId] =
              this.totalPrices[item.projectId] + item.amount;
            this.totalPrices[item.gatewayId] =
              this.totalPrices[item.gatewayId] + item.amount;
            this.totalPrices['total'] = this.totalPrices['total'] + item.amount;
          });
        }),
        tap(() => this.setChartData())
      )
      .subscribe();
  }

  private setChartData() {
    let data: number[] = [];
    if (this.isAllProjectSingleGateway) {
      data = this.projects.map((item) => this.totalPrices[item.projectId]);
    }

    if (this.isSingleProjectAllGateway) {
      data = this.gateways.map((item) => this.totalPrices[item.gatewayId]);
    }

    this.chartData.datasets[0].data = data;
    this.chartData = { ...this.chartData };
  }
}
