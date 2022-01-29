import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFireAuth }                                   from '@angular/fire/auth';
import { AngularFirestore }                                  from '@angular/fire/firestore';
import { ActivatedRoute }                                    from '@angular/router';
import { RouterTestingModule }                               from '@angular/router/testing';
import { of }                                                from 'rxjs';
import { FibonacciDeckComponentSpec }                        from 'src/app/tests/mocks/fibonacci-deck.component.spec';
import { VotesAverageComponentSpec }                         from 'src/app/tests/mocks/votes-average.component.spec';
import { VotesCardsComponentSpec }                           from 'src/app/tests/mocks/votes-cards.component.spec';
import { VotesControlsComponentSpec }                        from 'src/app/tests/mocks/votes-controls.component.spec';
import { VotesComponent }                                    from './votes.component';

class ActivatedRouteMock {

  snapshot = {
    paramMap: {
      get: (value: string) => {
        return 1;
      }
    }
  }

}

class AngularFirestoreMock {

  public docValueChangesResult: any = { subscribe: () => { } };

  doc(path: string) {
    return {
      valueChanges: () => {
        return this.docValueChangesResult;
      },
      update: () => { }
    }
  }

}

class AngularFireAuthMock {
  public user = of({});
}

describe('VotesComponent', () => {
  let component: VotesComponent;
  let fixture  : ComponentFixture<VotesComponent>;

  var activatedRouteMock   = new ActivatedRouteMock();
  var angularFirestoreMock = new AngularFirestoreMock();
  var angularFireAuthMock  = new AngularFireAuthMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VotesComponent, FibonacciDeckComponentSpec, VotesAverageComponentSpec, VotesControlsComponentSpec, VotesCardsComponentSpec],
      providers   : [
        {
          provide : ActivatedRoute,
          useValue: activatedRouteMock
        },
        {
          provide : AngularFirestore,
          useValue: angularFirestoreMock
        },
        {
          provide : AngularFireAuth,
          useValue: angularFireAuthMock
        }
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(VotesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {

    // Arrange
    var loadRoom    = spyOn(component, 'loadRoom');
    var waitAndFlip = spyOn(component, 'waitAndFlip');

    // Act
    fixture.detectChanges();

    // Assert
    expect(component).toBeTruthy();
    expect(loadRoom).toHaveBeenCalled();
    expect(waitAndFlip).toHaveBeenCalled();

  });

  it('should load room', () => {

    // Arrange
    var includeUserRoom                            = spyOn(component, 'includeUserRoom');
        angularFirestoreMock.docValueChangesResult = of({
      id          : '1',
      name        : 'Name',
      average     : 'Average',
      isFlip      : true,
      currentTask : 1,
      participants: [],
      votes       : [],
      tasks       : []
    });

    // Act
    component.loadRoom();

    // Assert
    expect(includeUserRoom).toHaveBeenCalled();

  });

  it('should load room without currency task', () => {

    // Arrange
    var includeUserRoom                            = spyOn(component, 'includeUserRoom');
        angularFirestoreMock.docValueChangesResult = of({
      id          : '1',
      name        : 'Name',
      average     : 'Average',
      isFlip      : true,
      currentTask : undefined,
      participants: [],
      votes       : [],
      tasks       : []
    });

    // Act
    component.loadRoom();

    // Assert
    expect(includeUserRoom).toHaveBeenCalled();

  });

  it('should wait and flip', fakeAsync(() => {

    // Arrange
    component.isFlip = false;
    component.waitAndFlip();

    // Act
    component.flipEvent.next(true);
    tick(51);

    // Assert
    expect(component.isFlip).toBeTruthy();

  }));

});
