import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth }                  from '@angular/fire/auth';
import { of }                               from 'rxjs';
import { FibonacciModel }                   from 'src/app/classes/fibonacci.model';
import { IVoteModel }                       from 'src/app/interfaces/i-vote.model';
import { RoomService }                      from 'src/app/services/room.service';
import { UserService }                      from 'src/app/services/user.service';
import { FibonacciDeckComponentSpec }       from 'src/app/tests/mocks/fibonacci-deck.component.spec';
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
      declarations: [VotesDeckComponent, FibonacciDeckComponentSpec],
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

  it('should emit active card event and remove vote', () => {

    // Arrange
    var fibonacciModel: FibonacciModel = {
      value      : 1,
      description: '1',
      class      : '1'
    };
    var getUserVote = spyOn(component, 'getUserVote');
    var removeVote  = spyOn(component, 'removeVote');
    var addVote     = spyOn(component, 'addVote');
    spyOn(component, 'hasVote').and.returnValue(true);


    // Act
    component.activeCardEvent(fibonacciModel);

    // Assert
    expect(getUserVote).toHaveBeenCalled();
    expect(removeVote).toHaveBeenCalled();
    expect(addVote).toHaveBeenCalled();

  });

  it('should emit active card event and not remove vote', () => {

    // Arrange
    var fibonacciModel: FibonacciModel = {
      value      : 1,
      description: '1',
      class      : '1'
    };
    var getUserVote = spyOn(component, 'getUserVote');
    var removeVote  = spyOn(component, 'removeVote');
    var addVote     = spyOn(component, 'addVote');
    spyOn(component, 'hasVote').and.returnValue(false);


    // Act
    component.activeCardEvent(fibonacciModel);

    // Assert
    expect(getUserVote).toHaveBeenCalled();
    expect(removeVote).not.toHaveBeenCalled();
    expect(addVote).toHaveBeenCalled();

  });

  it('should get user vote', () => {

    // Arrange
    component.room.votes = [{
      uid        : '123',
      displayName: 'Voto do usuário',
      value      : {
        value      : 1,
        description: '1',
        class      : '1'
      },
      isRedCard: true
    }];


    // Act
    var vote = component.getUserVote();

    // Assert
    expect(vote.displayName).toEqual('Voto do usuário');

  });

  it('should remove vote', () => {

    // Arrange
    var vote: IVoteModel;
    var updatePartialRoom = spyOn(component, 'updatePartialRoom');

    // Act
    component.removeVote(vote);

    // Assert
    expect(updatePartialRoom).toHaveBeenCalled();

  });

  it('should add vote', () => {

    // Arrange
    var fibonacciModel: FibonacciModel;
    var updatePartialRoom = spyOn(component, 'updatePartialRoom');

    // Act
    component.addVote(fibonacciModel);

    // Assert
    expect(updatePartialRoom).toHaveBeenCalled();

  });

  it('should has vote', () => {

    // Arrange
    var vote: IVoteModel = {
      uid        : '123',
      displayName: '1',
      value      : {
        value      : 1,
        description: '1',
        class      : '1'
      },
      isRedCard: false
    };

    // Act
    var result = component.hasVote(vote);

    // Assert
    expect(result).toBeTruthy();

  });

  it('should not has vote', () => {

    // Arrange
    var vote: IVoteModel;

    // Act
    var result = component.hasVote(vote);

    // Assert
    expect(result).toBeFalsy();

  });

  it('should update partial room', () => {

    // Arrange
    var partialRoom: any = {};

    // Act
    component.updatePartialRoom(partialRoom);

    // Assert
    expect(roomServiceMock.updatePartialCalled).toBeTruthy();

  });

});
