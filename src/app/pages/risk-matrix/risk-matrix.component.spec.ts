import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RiskMatrixComponent }              from './risk-matrix.component';

describe('RiskMatrixComponent', () => {
  let component: RiskMatrixComponent;
  let fixture  : ComponentFixture<RiskMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RiskMatrixComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(RiskMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  [
    {
      startValue: 0,
      value     : 1,
      selected  : 1
    },
    {
      startValue: 1,
      value     : 1,
      selected  : 0
    }
  ].forEach(item => {

    it('should set impact', () => {

      // Arrange
      component.selectedImpact = item.startValue;

      // Act
      component.setImpact(item.value);

      // Assert
      expect(item.selected).toEqual(component.selectedImpact);

    });

  });

  [
    {
      startValue: 0,
      value     : 2,
      selected  : 2
    },
    {
      startValue: 2,
      value     : 2,
      selected  : 0
    }
  ].forEach(item => {

    it('should set probability', () => {

      // Arrange
      component.selectedProbability = item.startValue;

      // Act
      component.setProbability(item.value);

      // Assert
      expect(item.selected).toEqual(component.selectedProbability);

    });

  });

  it('should set impact and calc risk', () => {

    // Arrange
    var value: number = 1;
    var setImpact     = spyOn(component, 'setImpact');
    var calcRisk      = spyOn(component, 'calcRisk');

    // Act
    component.setImpactAndCalcRisk(value);

    // Assert
    expect(setImpact).toHaveBeenCalled();
    expect(calcRisk).toHaveBeenCalled();

  });

  it('should set probability and calc risk', () => {

    // Arrange
    var value: number  = 1;
    var setProbability = spyOn(component, 'setProbability');
    var calcRisk       = spyOn(component, 'calcRisk');

    // Act
    component.setProbabilityAndCalcRisk(value);

    // Assert
    expect(setProbability).toHaveBeenCalled();
    expect(calcRisk).toHaveBeenCalled();

  });

  it('should calc risk', () => {

    // Arrange
    component.selectedImpact      = 3;
    component.selectedProbability = 3;

    // Act
    component.calcRisk();

    // Assert
    expect(component.risk).toEqual(9);

  });

});
