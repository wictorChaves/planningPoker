import { VoteService } from './../../../services/vote.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RiskMatrixUncertaintyComplexityComponent } from './risk-matrix-uncertainty-complexity.component';
import { RiskModel } from '../model/risk.model';
import { FibonacciModel } from 'src/app/classes/fibonacci.model';

class VoteServiceMock {

  public activeCardEventIsCalled = false;

  activeCardEvent() {
    this.activeCardEventIsCalled = true;
  }

}

describe('RiskMatrixUncertaintyComplexityComponent', () => {
  let component: RiskMatrixUncertaintyComplexityComponent;
  let fixture: ComponentFixture<RiskMatrixUncertaintyComplexityComponent>;

  var voteServiceMock = new VoteServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RiskMatrixUncertaintyComplexityComponent],
      providers: [
        {
          provide: VoteService,
          useValue: voteServiceMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskMatrixUncertaintyComplexityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calc risk', () => {

    // Arrange
    var riskModel = new RiskModel();
    riskModel.value = 1;
    riskModel.emojis = [];
    spyOn(component, 'buildRisk').and.returnValue(riskModel);
    var getMatrixRisk = spyOn(component, 'getMatrixRisk');
    var getFibonacciSequenciAndSelectCard = spyOn(component, 'getFibonacciSequenciAndSelectCard');

    // Act
    component.calcRisk();

    // Assert
    expect(getMatrixRisk).toHaveBeenCalled();
    expect(getFibonacciSequenciAndSelectCard).toHaveBeenCalled();

  });

  it('should set uncertainty and calc risk', () => {

    // Arrange
    var value: RiskModel = new RiskModel();
    var setUncertainty = spyOn(component, 'setUncertainty');
    var calcRisk = spyOn(component, 'calcRisk');

    // Act
    component.setUncertaintyAndCalcRisk = value;

    // Assert
    expect(setUncertainty).toHaveBeenCalled();
    expect(calcRisk).toHaveBeenCalled();

  });

  it('should set complexity and calc risk', () => {

    // Arrange
    var value: RiskModel = new RiskModel();
    var setComplexity = spyOn(component, 'setComplexity');
    var calcRisk = spyOn(component, 'calcRisk');

    // Act
    component.setComplexityAndCalcRisk = value;

    // Assert
    expect(setComplexity).toHaveBeenCalled();
    expect(calcRisk).toHaveBeenCalled();

  });

  [
    {
      risk: 5,
      result: 1
    },
    {
      risk: 10,
      result: 2
    },
    {
      risk: 6,
      result: 2
    },
    {
      risk: 15,
      result: 5
    },
    {
      risk: 12,
      result: 5
    },
    {
      risk: 7,
      result: 5
    },
    {
      risk: 18,
      result: 8
    },
    {
      risk: 14,
      result: 8
    },
    {
      risk: 21,
      result: 13
    },
    {
      risk: 0,
      result: 0
    },
    {
      risk: -1,
      result: undefined
    }
  ].forEach(item => {

    it('should get matrix risk', () => {

      // Arrange

      // Act
      var result = component.getMatrixRisk(item.risk);

      // Assert
      expect(result).toEqual(item?.result ?? 0);

    });

  });

  describe('', () => {

    var riskUncertainty: any = {};
    var riskComplexity: any = {};

    beforeEach(() => {

      // Arrange
      riskUncertainty = { value: 2, emojis: ['🧨', '✨'] };
      riskComplexity = { value: 3, emojis: ['🤞', '🤙'] };

      // Act
      component.setUncertainty(riskUncertainty);
      component.setComplexity(riskComplexity);

      // Assert
      expect(riskUncertainty.value).toEqual(component.selectedUncertainty.value ?? 0);
      expect(riskComplexity.value).toEqual(component.selectedComplexity.value ?? 0);

    });

    it('should build risk', () => {

      // Arrange

      // Act
      var riskModel = component.buildRisk();

      // Assert      
      expect(riskUncertainty.value * riskComplexity.value).toEqual(riskModel.value ?? 0);
      expect(['🧨', '✨', '🤞', '🤙']).toEqual(riskModel.emojis ?? '');

    });

  });

});
