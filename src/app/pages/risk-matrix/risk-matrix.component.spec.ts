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
      risk       : 5,
      uncertainty: 1
    },
    {
      risk       : 10,
      uncertainty: 2
    },
    {
      risk       : 15,
      uncertainty: 2
    },
    {
      risk       : 6,
      uncertainty: 2
    },
    {
      risk       : 7,
      uncertainty: 2
    },
    {
      risk       : 12,
      uncertainty: 3
    },
    {
      risk       : 18,
      uncertainty: 3
    },
    {
      risk       : 14,
      uncertainty: 3
    },
    {
      risk       : 21,
      uncertainty: 3
    },
    {
      risk       : 0,
      uncertainty: 0
    }
  ].forEach(item => {

    it('should create', () => {

      // Arrange

      // Act
      component.uncertaintyEvent(item.risk)

      // Assert
      expect(item.uncertainty).toEqual(component.uncertainty);

    });

  });

  [
    {
      risk      : 5,
      complexity: 5
    },
    {
      risk      : 10,
      complexity: 6
    },
    {
      risk      : 15,
      complexity: 6
    },
    {
      risk      : 6,
      complexity: 6
    },
    {
      risk      : 7,
      complexity: 6
    },
    {
      risk      : 12,
      complexity: 7
    },
    {
      risk      : 18,
      complexity: 7
    },
    {
      risk      : 14,
      complexity: 7
    },
    {
      risk      : 21,
      complexity: 7
    },
    {
      risk      : 0,
      complexity: 0
    }
  ].forEach(item => {

    it('should create', () => {

      // Arrange

      // Act
      component.complexityEvent(item.risk)

      // Assert
      expect(item.complexity).toEqual(component.complexity);

    });

  });


});