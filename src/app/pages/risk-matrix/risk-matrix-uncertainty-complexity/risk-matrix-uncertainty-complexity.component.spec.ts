import { async, ComponentFixture, TestBed }         from '@angular/core/testing';
import { AngularFireAuth }                          from '@angular/fire/auth';
import { AngularFirestore }                         from '@angular/fire/firestore';
import { of }                                       from 'rxjs';
import { RiskMatrixUncertaintyComplexityComponent } from './risk-matrix-uncertainty-complexity.component';

class AngularFireAuthMock {
  user = of([{}]);
}

class AngularFirestoreMock {

  public result = of();

  collection(path: string) {
    return { snapshotChanges: () => this.result }
  }

}

describe('RiskMatrixUncertaintyComplexityComponent', () => {
  let component: RiskMatrixUncertaintyComplexityComponent;
  let fixture  : ComponentFixture<RiskMatrixUncertaintyComplexityComponent>;

  var angularFireAuthMock  = new AngularFireAuthMock();
  var angularFirestoreMock = new AngularFirestoreMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RiskMatrixUncertaintyComplexityComponent],
      providers   : [
        {
          provide : AngularFireAuth,
          useValue: angularFireAuthMock
        },
        {
          provide : AngularFirestore,
          useValue: angularFirestoreMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(RiskMatrixUncertaintyComplexityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calc risk', () => {

    // Arrange
    component.selectedUncertainty = 3;
    component.selectedComplexity  = 3;

    // Act
    component.calcRisk();

    // Assert
    expect(component.risk).toEqual(9);

  });

});
