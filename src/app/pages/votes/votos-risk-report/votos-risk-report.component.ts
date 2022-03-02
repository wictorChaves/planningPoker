import { Component, Input, OnInit } from '@angular/core';
import { IRoomModel }               from 'src/app/interfaces/i-room.model';
import { CategoryReport }           from './reports/category.report';
import { GeneralReport }            from './reports/general.report';

@Component({
  selector   : 'app-votos-risk-report',
  templateUrl: './votos-risk-report.component.html',
  styleUrls  : ['./votos-risk-report.component.scss']
})
export class VotosRiskReportComponent implements OnInit {

  @Input() room        : IRoomModel;
  public showReport    : boolean = false;
  public categoryReport: any;
  public generalReport = [];

  constructor() { }

  ngOnInit() {
    this.showReport = this.getEmojisRoom().length > 0;
    if (this.showReport) {
      this.categoryReport = new CategoryReport(this.room).report();
      this.generalReport  = new GeneralReport(this.room).report();
    }
  }

  reportCategory() {

  }

  getEmojisRoom() {
    return this.room.votes.map(x => x.value.emojis).reduce((previousValue, currentValue) => [...previousValue, ...currentValue], []);
  }

}
