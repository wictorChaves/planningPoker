import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFireAuth }                                   from '@angular/fire/auth';
import { AngularFirestore }                                  from '@angular/fire/firestore';
import { ActivatedRoute }                                    from '@angular/router';
import { RouterTestingModule }                               from '@angular/router/testing';
import { of }                                                from 'rxjs';
import { IRoomModel }                                        from 'src/app/interfaces/i-room.model';
import { UserService }                                       from 'src/app/services/user.service';
import { FibonacciDeckComponentSpec }                        from 'src/app/tests/mocks/fibonacci-deck.component.spec';
import { VotesAverageComponentSpec }                         from 'src/app/tests/mocks/votes-average.component.spec';
import { VotesCardsComponentSpec }                           from 'src/app/tests/mocks/votes-cards.component.spec';
import { VotesControlsComponentSpec }                        from 'src/app/tests/mocks/votes-controls.component.spec';
import { VotesDeckComponentSpec }                            from 'src/app/tests/mocks/votes-deck.component.spec';
import { VotosRiskReportComponentSpec }                      from 'src/app/tests/mocks/votos-risk-report.component.spec';
import { VotesComponent }                                    from './votes.component';

class ActivatedRouteMock {

  public value: string = '';

  snapshot = {
    paramMap: {
      get: (value: string) => {
        this.value = value;
        return this.value;
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

class UserServiceMock {

  public called = false;

  getUserAndAddUserToRoomIfNotExist(room: IRoomModel) {
    this.called = true;
  }

}

describe('VotesComponent', () => {
  let component: VotesComponent;
  let fixture  : ComponentFixture<VotesComponent>;

  var activatedRouteMock   = new ActivatedRouteMock();
  var angularFirestoreMock = new AngularFirestoreMock();
  var angularFireAuthMock  = new AngularFireAuthMock();
  var userServiceMock      = new UserServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VotesComponent, FibonacciDeckComponentSpec, VotesAverageComponentSpec, VotesControlsComponentSpec,
        VotesCardsComponentSpec, VotesDeckComponentSpec, VotosRiskReportComponentSpec],
      providers: [
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
        },
        {
          provide : UserService,
          useValue: userServiceMock
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

  it('should get room id', () => {

    // Arrange

    // Act
    component.getRoomId();

    // Assert
    expect(activatedRouteMock.value).toEqual('id');

  });

  it('should load room', fakeAsync(() => {

    // Arrange
    var room = {
      id          : '1',
      name        : 'Name',
      average     : 'Average',
      isFlip      : true,
      currentTask : 1,
      participants: [],
      votes       : [],
      tasks       : []
    };
        angularFirestoreMock.docValueChangesResult = of(room);
    var getUserAndAddUserToRoomIfNotExist          = spyOn(component, 'getUserAndAddUserToRoomIfNotExist');

    // Act
    component.loadRoom();
    tick();

    // Assert
    expect(component.room).toEqual(room);
    expect(getUserAndAddUserToRoomIfNotExist).toHaveBeenCalled();
    expect(component.room.currentTask).toEqual(1);

  }));

  it('should load the room without the current room task', fakeAsync(() => {

    // Arrange
    var room = {
      id          : '1',
      name        : 'Name',
      average     : 'Average',
      isFlip      : true,
      currentTask : undefined,
      participants: [],
      votes       : [],
      tasks       : []
    };
        angularFirestoreMock.docValueChangesResult = of(room);
    var getUserAndAddUserToRoomIfNotExist          = spyOn(component, 'getUserAndAddUserToRoomIfNotExist');

    // Act
    component.loadRoom();
    tick();

    // Assert
    expect(component.room).toEqual(room);
    expect(getUserAndAddUserToRoomIfNotExist).toHaveBeenCalled();
    expect(component.room.currentTask).toEqual(0);

  }));

  it('should get user and add user to room if not exist', () => {

    // Arrange
    var room = {
      id          : '1',
      name        : 'Name',
      average     : 'Average',
      isFlip      : true,
      currentTask : 1,
      participants: [],
      votes       : [],
      tasks       : []
    };

    // Act
    component.getUserAndAddUserToRoomIfNotExist(room);

    // Assert
    expect(userServiceMock.called).toBeTruthy();

  });

});
