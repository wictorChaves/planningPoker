import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesAverageComponent } from './votes-average.component';

describe('VotesAverageComponent', () => {
  let component: VotesAverageComponent;
  let fixture: ComponentFixture<VotesAverageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotesAverageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotesAverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
