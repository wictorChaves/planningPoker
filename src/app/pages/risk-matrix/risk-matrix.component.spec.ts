import { async, ComponentFixture, TestBed }             from '@angular/core/testing';
import { RiskMatrixDevelopReproduceComponentSpec }      from 'src/app/tests/mocks/risk-matrix-develop-reproduce.component.spec';
import { RiskMatrixUncertaintyComplexityComponentSpec } from 'src/app/tests/mocks/risk-matrix-uncertainty-complexity.component.spec';
import { RiskMatrixComponent }                          from './risk-matrix.component';

describe('RiskMatrixComponent', () => {
  let component: RiskMatrixComponent;
  let fixture  : ComponentFixture<RiskMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RiskMatrixComponent, RiskMatrixDevelopReproduceComponentSpec, RiskMatrixUncertaintyComplexityComponentSpec]
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
      risk       : { value: 5, emojis: [] },
      uncertainty: { value: 1, emojis: [] }
    },
    {
      risk       : { value: 10, emojis: [] },
      uncertainty: { value: 2, emojis: [] }
    },
    {
      risk       : { value: 15, emojis: [] },
      uncertainty: { value: 2, emojis: [] }
    },
    {
      risk       : { value: 6, emojis: [] },
      uncertainty: { value: 2, emojis: [] }
    },
    {
      risk       : { value: 7, emojis: [] },
      uncertainty: { value: 2, emojis: [] }
    },
    {
      risk       : { value: 12, emojis: [] },
      uncertainty: { value: 3, emojis: [] }
    },
    {
      risk       : { value: 18, emojis: [] },
      uncertainty: { value: 3, emojis: [] }
    },
    {
      risk       : { value: 14, emojis: [] },
      uncertainty: { value: 3, emojis: [] }
    },
    {
      risk       : { value: 21, emojis: [] },
      uncertainty: { value: 3, emojis: [] }
    },
    {
      risk       : { value: 0, emojis: [] },
      uncertainty: { value: 0, emojis: [] }
    }
  ].forEach(item => {

    it('should listener uncertainty risk', () => {

      // Arrange

      // Act
      component.listenerUncertaintyRisk(item.risk)

      // Assert
      expect(item.uncertainty.value).toEqual(component.uncertainty.value);

    });

  });

  [
    {
      risk      : { value: 5, emojis: [] },
      complexity: { value: 5, emojis: [] }
    },
    {
      risk      : { value: 10, emojis: [] },
      complexity: { value: 6, emojis: [] }
    },
    {
      risk      : { value: 15, emojis: [] },
      complexity: { value: 6, emojis: [] }
    },
    {
      risk      : { value: 6, emojis: [] },
      complexity: { value: 6, emojis: [] }
    },
    {
      risk      : { value: 7, emojis: [] },
      complexity: { value: 6, emojis: [] }
    },
    {
      risk      : { value: 12, emojis: [] },
      complexity: { value: 7, emojis: [] }
    },
    {
      risk      : { value: 18, emojis: [] },
      complexity: { value: 7, emojis: [] }
    },
    {
      risk      : { value: 14, emojis: [] },
      complexity: { value: 7, emojis: [] }
    },
    {
      risk      : { value: 21, emojis: [] },
      complexity: { value: 7, emojis: [] }
    },
    {
      risk      : { value: 0, emojis: [] },
      complexity: { value: 0, emojis: [] }
    }
  ].forEach(item => {

    it('should listener complexity risk', () => {

      // Arrange

      // Act
      component.listenerComplexityRisk(item.risk)

      // Assert
      expect(item.complexity.value).toEqual(component.complexity.value);

    });

  });


});