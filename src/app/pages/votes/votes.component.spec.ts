import { Component }                        from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VotesComponent }                   from './votes.component';

//#region Mocks

@Component({ selector: 'app-fibonacci-deck', template: '' })
export class FibonacciDeckComponentMock { }

//#endregion

fdescribe('VotesComponent', () => {
  let component: VotesComponent;
  let fixture  : ComponentFixture<VotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:[
        
      ],
      declarations: [VotesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(VotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
