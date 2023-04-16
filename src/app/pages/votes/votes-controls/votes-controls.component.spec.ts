import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { VotesControlsComponent } from './votes-controls.component';

class AngularFirestoreMock {

  public docValueChangesResult: any = of({});
  public updateValue: any;

  doc(path: string) {
    return {
      valueChanges: () => {
        return this.docValueChangesResult;
      },
      update: (value: any) => {
        this.updateValue = value;
      }
    }
  }

}

class RouterMock {

  public url: string = '';

  public snapshot = {
    paramMap: {
      get: () => {
        return 1;
      }
    }
  }

  navigateByUrl(url: string) {
    this.url = url;
  }

}

describe('VotesControlsComponent', () => {
  let component: VotesControlsComponent;
  let fixture: ComponentFixture<VotesControlsComponent>;

  var angularFirestoreMock = new AngularFirestoreMock();
  var routerMock = new RouterMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VotesControlsComponent],
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
    fixture = TestBed.createComponent(VotesControlsComponent);
    component = fixture.componentInstance;

    component.room = {
      id: '1',
      name: 'Name',
      average: 'Average',
      isFlip: true,
      currentTask: 1,
      participants: [],
      votes: [],
      tasks: []
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not has votes', () => {

    // Arrange
    if (component.room)
      component.room.votes = undefined;

    // Act
    var result = component.hasVotes();

    // Assert
    expect(result).toBeFalsy();

  });

  [
    {
      it: 'should get current task with room undefined',
      room: undefined,
      currentTask: 1,
      roomResult: undefined,
    },
    {
      it: 'should get current task without tasks',
      room: {
        id: '1',
        name: 'Name',
        average: 'Average',
        isFlip: true,
        currentTask: 1,
        participants: [],
        votes: [],
        tasks: undefined
      },
      currentTask: 1,
      roomResult: undefined,
    },
    {
      it: 'should get current task with 0 tasks',
      room: {
        id: '1',
        name: 'Name',
        average: 'Average',
        isFlip: true,
        currentTask: 1,
        participants: [],
        votes: [],
        tasks: []
      },
      currentTask: 1,
      roomResult: undefined,
    },
    {
      it: 'should get current task',
      room: {
        id: '1',
        name: 'Name',
        average: 'Average',
        isFlip: true,
        currentTask: 0,
        participants: [],
        votes: [],
        tasks: [
          'Minha tarefa'
        ]
      },
      currentTask: 0,
      roomResult: 'Minha tarefa',
    }
  ].forEach(item => {

    it(item.it, () => {

      // Arrange
      component.room = item.room;

      // Act
      var result = component.getCurrentTask(item.currentTask);

      // Assert
      expect(item.roomResult).toEqual(result);

    });

  });

  it('should reset votes and go back', () => {

    // Arrange
    var resetVotes = spyOn(component, 'resetVotes');
    var prevTask = spyOn(component, 'prevTask');

    // Act
    component.resetVotesAndGoBack();

    // Assert
    expect(resetVotes).toHaveBeenCalled();
    expect(prevTask).toHaveBeenCalled();

  });

  it('should reset votes and go back', () => {

    // Arrange

    // Act
    component.resetVotes();

    // Assert
    if (component.room) {
      expect(component.room.average).toEqual('-');
      expect(component.room.isFlip).toBeFalsy();
      expect(component.room?.votes?.length).toEqual(0);
    }

    expect(angularFirestoreMock.updateValue.average).toEqual('-');
    expect(angularFirestoreMock.updateValue.isFlip).toBeFalsy();
    expect(angularFirestoreMock.updateValue.votes.length).toEqual(0);

  });

  it('should flip card', () => {

    // Arrange
    var averageCalc = spyOn(component, 'averageCalc');

    // Act
    component.flipCard();

    // Assert
    expect(component?.room?.isFlip).toBeTruthy();
    expect(averageCalc).toHaveBeenCalled();

  });

  it('should reset votes and next', () => {

    // Arrange
    var resetVotes = spyOn(component, 'resetVotes');
    var nextTask = spyOn(component, 'nextTask');

    // Act
    component.resetVotesAndNext();

    // Assert
    expect(component?.room?.isFlip).toBeTruthy();
    expect(resetVotes).toHaveBeenCalled();
    expect(nextTask).toHaveBeenCalled();

  });

  [
    {
      currentTask: 0,
      prevTask: 1
    },
    {
      currentTask: 1,
      prevTask: 0
    }
  ].forEach(item => {

    it('should prev task', () => {

      // Arrange
      if (component.room) {
        component.room.currentTask = item.currentTask;
        component.room.tasks = [
          'Tarefa 1',
          'Tarefa 2'
        ]
      }

      // Act
      component.prevTask();

      // Assert
      expect(item.prevTask).toEqual(component?.room?.currentTask ?? 0);

    });

  });

  [
    {
      currentTask: 1,
      nextTask: 0
    },
    {
      currentTask: 0,
      nextTask: 1
    }
  ].forEach(item => {

    it('should next task', () => {

      // Arrange
      if (component.room) {
        component.room.currentTask = item.currentTask;
        component.room.tasks = [
          'Tarefa 1',
          'Tarefa 2'
        ];
      }

      // Act
      component.nextTask();

      // Assert
      expect(item.nextTask).toEqual(component?.room?.currentTask ?? 0);

    });

  });

  it('should calc average', () => {

    // Arrange
    if (component.room) {
      component.room.average = '0';
      component.room.votes = [
        {
          uid: '1',
          displayName: '1',
          value: {
            value: 1,
            description: '1',
            class: '1'
          },
          isRedCard: true
        },
        {
          uid: '2',
          displayName: '2',
          value: {
            value: 2,
            description: '2',
            class: '2'
          },
          isRedCard: false
        },
        {
          uid: '3',
          displayName: '3',
          value: {
            value: 3,
            description: '3',
            class: '3'
          },
          isRedCard: true
        }
      ];
    }

    // Act
    component.averageCalc();

    // Assert
    expect(angularFirestoreMock.updateValue.average).toEqual('2');

  });

  it('should calc average with 0 votes', () => {

    // Arrange
    if (component.room) {
      component.room.average = '0';
      component.room.votes = [];
    }

    // Act
    component.averageCalc();

    // Assert
    expect(angularFirestoreMock.updateValue.average).toEqual('0');

  });

  it('should set first task', () => {

    // Arrange
    if (component.room)
      component.room.currentTask = 2;

    // Act
    component.firstTask();

    // Assert
    expect(component?.room?.currentTask).toEqual(0);

  });

  it('should go to task page', () => {

    // Arrange
    if (component.room)
      component.room.id = '1';

    // Act
    component.goTask();

    // Assert
    expect(routerMock.url).toEqual('/tasks/1');

  });

  it('should go to task page', () => {

    // Arrange
    if (component.room)
      component.room.tasks = [
        'Tarefa 1',
        'Tarefa 2'
      ];

    // Act
    component.lastTask();

    // Assert
    expect(component?.room?.currentTask).toEqual(1);

  });

});
