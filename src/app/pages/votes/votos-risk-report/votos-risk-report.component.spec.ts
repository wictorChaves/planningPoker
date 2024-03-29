import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VotosRiskReportComponent }         from './votos-risk-report.component';

describe('VotosRiskReportComponent', () => {
  let component: VotosRiskReportComponent;
  let fixture  : ComponentFixture<VotosRiskReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VotosRiskReportComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(VotosRiskReportComponent);
    component = fixture.componentInstance;

    component.room = {
      id          : '1',
      name        : 'Name',
      average     : 'Average',
      isFlip      : true,
      currentTask : 1,
      participants: [],
      votes       : [],
      tasks       : []
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
