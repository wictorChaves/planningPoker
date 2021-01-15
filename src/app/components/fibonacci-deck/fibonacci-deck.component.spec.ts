import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FibonacciDeckComponent } from './fibonacci-deck.component';

describe('FibonacciDeckComponent', () => {
  let component: FibonacciDeckComponent;
  let fixture: ComponentFixture<FibonacciDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FibonacciDeckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FibonacciDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
