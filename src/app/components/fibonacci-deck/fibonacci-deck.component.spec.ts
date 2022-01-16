import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FibonacciModel }                   from 'src/app/classes/fibonacci.model';
import { FibonacciDeckComponent }           from './fibonacci-deck.component';

describe('FibonacciDeckComponent', () => {
  let component: FibonacciDeckComponent;
  let fixture  : ComponentFixture<FibonacciDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FibonacciDeckComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(FibonacciDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set active', () => {

    // Arrange
    var fibonacci: FibonacciModel = {
      value      : 1,
      description: "Description",
      class      : "Class"
    };
    var emit = spyOn(component.activeCardEvent, 'emit');

    // Act
    component.setActive(fibonacci);

    // Assert
    expect(fibonacci.value).toEqual(component.activeCard.value);
    expect(fibonacci.description).toEqual(component.activeCard.description);
    expect(fibonacci.class).toEqual(component.activeCard.class);
    expect(emit).toHaveBeenCalled();

  });

});
