import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth }                  from '@angular/fire/auth';
import { of }                               from 'rxjs';
import { FibonacciModel }                   from 'src/app/classes/fibonacci.model';
import { IVoteModel }                       from 'src/app/interfaces/i-vote.model';
import { RoomService }                      from 'src/app/services/room.service';
import { UserService }                      from 'src/app/services/user.service';
import { FibonacciDeckComponentSpec }       from 'src/app/tests/mocks/fibonacci-deck.component.spec';
import { RiskMatrixComponentSpec }          from 'src/app/tests/mocks/risk-matrix.component.spec';
import { VotesDeckComponent }               from './votes-deck.component';

class AngularFireAuthMock {
  user = of([{

  }]);
}

class RoomServiceMock {

  public updatePartialCalled = false;

  updatePartialRoom() {
    this.updatePartialCalled = true;
  }

}

class UserServiceMock {

  getUser() {
    return of({
      uid: '123'
    })
  }

}

describe('VotesDeckComponent', () => {
  let component: VotesDeckComponent;
  let fixture  : ComponentFixture<VotesDeckComponent>;

  var angularFireAuthMock = new AngularFireAuthMock();
  var userServiceMock     = new UserServiceMock();
  var roomServiceMock     = new RoomServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VotesDeckComponent, FibonacciDeckComponentSpec, RiskMatrixComponentSpec],
      providers   : [
        {
          provide : AngularFireAuth,
          useValue: angularFireAuthMock
        },
        {
          provide : RoomService,
          useValue: roomServiceMock
        },
        {
          provide : UserService,
          useValue: userServiceMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(VotesDeckComponent);
    component = fixture.componentInstance;

    component.room = {
      id          : '1',
      name        : 'Name',
      average     : 'Average',
      isFlip      : true,
      currentTask : 1,
      participants: [],
      votes       : [],
      tasks       : []
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
