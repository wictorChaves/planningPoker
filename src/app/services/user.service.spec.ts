import { TestBed }         from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { User }            from 'firebase';
import { of }              from 'rxjs';
import { IRoomModel }      from '../interfaces/i-room.model';
import { RoomService }     from './room.service';
import { UserService }     from './user.service';

class AngularFireAuthMock {
  public user = {};
}

class RoomServiceMock {

  public updateRoomCalled = false;

  updateRoom() {
    this.updateRoomCalled = true;
  }

}

describe('UserService', () => {
  var service: UserService;

  var angularFireAuthMock = new AngularFireAuthMock();
  var roomServiceMock     = new RoomServiceMock();

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide : AngularFireAuth,
        useValue: angularFireAuthMock
      },
      {
        provide : RoomService,
        useValue: roomServiceMock
      }
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user', () => {

    // Arrange

    // Act
    var user = service.getUser();

    // Assert
    expect(user).not.toBeUndefined();

  });

  it('should get user and add user to room if not exist', () => {

    // Arrange
    var room: IRoomModel;
    var user = of([{}]);
    spyOn(service, 'getUser').and.returnValue(user as any);
    var addUserToRoomIfNotExist = spyOn(service, 'addUserToRoomIfNotExist');

    // Act
    service.getUserAndAddUserToRoomIfNotExist(room);

    // Assert
    expect(addUserToRoomIfNotExist).toHaveBeenCalled();

  });

  it('should get user and add user to room if not exist', () => {

    // Arrange
    var room: IRoomModel = {
      id          : '1',
      name        : 'Name',
      average     : 'Average',
      isFlip      : true,
      currentTask : 1,
      participants: [
        {
          uid        : '1',
          displayName: 'Participante',
          email      : 'participante@email.com'
        }
      ],
      votes: [],
      tasks: []
    };
    var user: User = Object.assign({ uid: '1' });

    // Act
    var participantExist = service.userAlreadyExistInRoom(room, user);

    // Assert
    expect(participantExist).toBeTruthy();

  });

  it('should add user to room if not exist', () => {

    // Arrange
    var room: IRoomModel = {
      id          : '1',
      name        : 'Name',
      average     : 'Average',
      isFlip      : true,
      currentTask : 1,
      participants: [
        {
          uid        : '1',
          displayName: 'Participante',
          email      : 'participante@email.com'
        }
      ],
      votes: [],
      tasks: []
    };
    var user: User = Object.assign({ uid: '1' });
    spyOn(service, 'userAlreadyExistInRoom').and.returnValue(false);
    var addParticipant = spyOn(service, 'addParticipant');

    // Act
    service.addUserToRoomIfNotExist(room, user);

    // Assert
    expect(addParticipant).toHaveBeenCalled();

  });

  it('should not add user', () => {

    // Arrange
    var room: IRoomModel = {
      id          : '1',
      name        : 'Name',
      average     : 'Average',
      isFlip      : true,
      currentTask : 1,
      participants: [
        {
          uid        : '1',
          displayName: 'Participante',
          email      : 'participante@email.com'
        }
      ],
      votes: [],
      tasks: []
    };
    var user: User = Object.assign({ uid: '1' });
    spyOn(service, 'userAlreadyExistInRoom').and.returnValue(true);
    var addParticipant = spyOn(service, 'addParticipant');

    // Act
    service.addUserToRoomIfNotExist(room, user);

    // Assert
    expect(addParticipant).not.toHaveBeenCalled();

  });

  it('should add participant', () => {

    // Arrange
    var room: IRoomModel = {
      id          : '1',
      name        : 'Name',
      average     : 'Average',
      isFlip      : true,
      currentTask : 1,
      participants: [
        {
          uid        : '1',
          displayName: 'Participante',
          email      : 'participante@email.com'
        }
      ],
      votes: [],
      tasks: []
    };
    var user: User = Object.assign({ uid: '1' });

    var addUserToRoom = spyOn(service, 'addUserToRoom');
    var updateRoom    = spyOn(service, 'updateRoom');

    // Act
    service.addParticipant(room, user);

    // Assert
    expect(addUserToRoom).toHaveBeenCalled();
    expect(updateRoom).toHaveBeenCalled();

  });

  it('should user to room', () => {

    // Arrange
    var room: IRoomModel = {
      id          : '1',
      name        : 'Name',
      average     : 'Average',
      isFlip      : true,
      currentTask : 1,
      participants: [
        {
          uid        : '1',
          displayName: 'Participante',
          email      : 'participante@email.com'
        }
      ],
      votes: [],
      tasks: []
    };
    var user: User = Object.assign({
      uid        : '1',
      displayName: 'Nome',
      email      : 'nome@email.com'
    });

    // Act
    service.addUserToRoom(room, user);

    // Assert
    expect(room.participants.find(x => x.uid == '1')).not.toBeUndefined();

  });

  it('should update room', () => {

    // Arrange
    var room: IRoomModel = {
      id          : '1',
      name        : 'Name',
      average     : 'Average',
      isFlip      : true,
      currentTask : 1,
      participants: [
        {
          uid        : '1',
          displayName: 'Participante',
          email      : 'participante@email.com'
        }
      ],
      votes: [],
      tasks: []
    };

    // Act
    service.updateRoom(room);

    // Assert
    expect(roomServiceMock.updateRoomCalled).toBeTruthy();

  });

});
