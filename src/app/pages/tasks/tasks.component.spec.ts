import { async, ComponentFixture, TestBed }                         from '@angular/core/testing';
import { AngularFireAuth }                                          from '@angular/fire/auth';
import { AngularFirestore }                                         from '@angular/fire/firestore';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router }                                   from '@angular/router';
import { of }                                                       from 'rxjs';
import { IRoomModel }                                               from 'src/app/interfaces/i-room.model';
import { TasksComponent }                                           from './tasks.component';

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

  doc(path: string) {
    return {
      valueChanges: () => {
        return of()
      },
      update: () => { }
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

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture  : ComponentFixture<TasksComponent>;

  var activatedRouteMock   = new ActivatedRouteMock();
  var angularFirestoreMock = new AngularFirestoreMock();
  var routerMock           = new RouterMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksComponent],
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
          provide : Router,
          useValue: routerMock
        }
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load task and set room', () => {

    // Arrange
    var room: IRoomModel;
    var setRoom   = spyOn(component, 'setRoom');
    var loadTasks = spyOn(component, 'loadTasks');

    // Act
    component.loadTaskAndSetRoom(room);

    // Assert
    expect(setRoom).toHaveBeenCalled();
    expect(loadTasks).toHaveBeenCalled();

  });

  [
    {
      it    : 'should not load task',
      tasks : undefined,
      expect: 0
    },
    {
      it   : 'should load task',
      tasks: [
        'Tarefa 1',
        'Tarefa 2'
      ],
      expect: 2
    }
  ].forEach(item => {

    it(item.it, () => {

      // Arrange
      var room: IRoomModel = {
        id          : '1',
        name        : 'Name',
        average     : 'Average',
        isFlip      : true,
        currentTask : 1,
        participants: [],
        votes       : [],
        tasks       : item.tasks
      };

      // Act
      component.loadTasks(room);

      // Assert
      var tasks = component.getList();
      expect(item.expect).toEqual(tasks.length);

    });

  });

  it('should set room', () => {

    // Arrange
    var room: IRoomModel = {
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
    component.setRoom(room);

    // Assert
    expect(component.room.id).toEqual(room.id);
    expect(component.room.name).toEqual(room.name);
    expect(component.room.average).toEqual(room.average);
    expect(component.room.isFlip).toEqual(room.isFlip);
    expect(component.room.currentTask).toEqual(room.currentTask);
    expect(component.room.participants.length).toEqual(0);
    expect(component.room.votes.length).toEqual(0);
    expect(component.room.tasks.length).toEqual(0);

  });

  it('should save and go vote', () => {

    // Arrange
    var getList  = spyOn(component, 'getList');
    var addTasks = spyOn(component, 'addTasks');
    var goVote   = spyOn(component, 'goVote');

    // Act
    component.saveAndGoVote();

    // Assert
    expect(getList).toHaveBeenCalled();
    expect(addTasks).toHaveBeenCalled();
    expect(goVote).toHaveBeenCalled();

  });

  it('should add tasks', () => {

    // Arrange
    var tasks: string[] = [];

    // Act
    component.addTasks(tasks);

    // Assert
    expect(component.room.currentTask).toEqual(0);
    expect(component.room.tasks.length).toEqual(0);

  });

  it('should go vote', () => {

    // Arrange

    // Act
    component.goVote();

    // Assert
    expect(routerMock.url).toContain('/votes/');

  });

});
