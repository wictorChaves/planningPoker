import { TestBed }          from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IRoomModel }       from '../interfaces/i-room.model';
import { RoomService }      from './room.service';

class Doc {

  public value: any;

  update(value: any) {
    this.value = value;
  }

}

class AngularFirestoreMock {

  private docObj = new Doc();

  getResult() {
    return this.docObj.value;
  }

  collection(path: string) {
    return { snapshotChanges: () => this.docObj }
  }

  doc() {
    return this.docObj;
  }

}

describe('RoomService', () => {
  var service: RoomService;
  var angularFirestoreMock = new AngularFirestoreMock();

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide : AngularFirestore,
        useValue: angularFirestoreMock
      }
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(RoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update room', () => {

    // Arrange
    var room: IRoomModel = Object.assign({ id: 1 });

    // Act
    service.updateRoom(room);

    // Assert
    expect(angularFirestoreMock.getResult().id).toEqual(room.id);

  });

  it('should update partial room', () => {

    // Arrange
    var roomId: string   = '1';
    var room: IRoomModel = Object.assign({ id: 1 });

    // Act
    service.updatePartialRoom(room, roomId);

    // Assert
    expect(angularFirestoreMock.getResult().id).toEqual(room.id);

  });

});
