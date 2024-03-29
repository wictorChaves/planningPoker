import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { IRoomModel } from 'src/app/interfaces/i-room.model';
import { LoadingComponentSpec } from 'src/app/tests/mocks/loading.component.spec';
import { RoomsFormComponentSpec } from 'src/app/tests/mocks/rooms-form.component.spec';
import { RoomsListComponentSpec } from 'src/app/tests/mocks/rooms-list.component.spec';
import { RoomsComponent } from './rooms.component';

//#region Mocks

class AngularFirestoreMock {

  public result = of();

  collection(path: string) {
    return { snapshotChanges: () => this.result }
  }

}

class RouterMock {

  public snapshot = {
    paramMap: {
      get: () => {
        return 1;
      }
    }
  }

  navigateByUrl(url: string) {

  }

}

//#endregion

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;

  var angularFirestoreMock = new AngularFirestoreMock();
  var routerMock = new RouterMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoomsComponent, LoadingComponentSpec, RoomsFormComponentSpec, RoomsListComponentSpec],
      providers: [
        {
          provide: AngularFirestore,
          useValue: angularFirestoreMock
        },
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load rooms', fakeAsync(() => {

    // Arrange
    angularFirestoreMock.result = of([]) as any;
    var setRooms = spyOn(component, 'setRooms');

    // Act
    component.loadRooms();
    tick();

    // Assert
    expect(setRooms).toHaveBeenCalled();

  }));

  it('should load rooms', () => {

    // Arrange
    var action: any = {
      payload: {
        doc: {
          id: 1,
          data: () => ({ name: 'Meu nome' })
        }
      }
    };

    // Act
    var result = component.actionToRoomModel(action);

    // Assert
    expect('1').toEqual(result.id.toString());
    expect('Meu nome').toEqual(result?.name ?? '');

  });

  it('should set rooms', () => {

    // Arrange
    var rooms: IRoomModel[] = [
      {
        id: '1',
        name: 'Name',
        average: 'Average',
        isFlip: true,
        currentTask: 1,
        participants: [],
        votes: [],
        tasks: []
      }
    ];

    // Act
    component.setRooms(rooms);

    // Assert
    expect(rooms[0].id).toEqual((component?.rooms ?? [])[0]?.id ?? '');
    expect(rooms[0].name).toEqual((component?.rooms ?? [])[0]?.name);
    expect(rooms[0].average).toEqual((component?.rooms ?? [])[0]?.average);
    expect(rooms[0].isFlip).toEqual((component?.rooms ?? [])[0]?.isFlip);
    expect(rooms[0].currentTask).toEqual((component?.rooms ?? [])[0]?.currentTask);
    expect(rooms[0].participants).toEqual((component?.rooms ?? [])[0]?.participants);
    expect(rooms[0].votes).toEqual((component?.rooms ?? [])[0]?.votes);
    expect(rooms[0].tasks).toEqual((component?.rooms ?? [])[0]?.tasks);

  });

  [
    [{ name: 'Arthur' }, { name: 'Bernado' }, { name: 'Carlos' }],
    [{ name: 'Arthur' }, { name: 'Carlos' }, { name: 'Bernado' }],
    [{ name: 'Bernado' }, { name: 'Arthur' }, { name: 'Carlos' }],
    [{ name: 'Bernado' }, { name: 'Carlos' }, { name: 'Arthur' }],
    [{ name: 'Carlos' }, { name: 'Arthur' }, { name: 'Bernado' }],
    [{ name: 'Carlos' }, { name: 'Bernado' }, { name: 'Arthur' }]
  ].forEach(items => {
    it('should sort list', () => {

      // Arrange

      // Act
      var list = items.sort(component.sort);

      // Assert
      expect(list[0].name).toEqual('Arthur');
      expect(list[1].name).toEqual('Bernado');
      expect(list[2].name).toEqual('Carlos');

    });
  });

  [
    [{ name: 'Arthur' }, { name: 'Bernado' }, { name: 'Arthur' }]
  ].forEach(items => {
    it('should sort list with repeated values', () => {

      // Arrange

      // Act
      var list = items.sort(component.sort);

      // Assert
      expect(list[0].name).toEqual('Arthur');
      expect(list[1].name).toEqual('Arthur');
      expect(list[2].name).toEqual('Bernado');

    });
  });



});
