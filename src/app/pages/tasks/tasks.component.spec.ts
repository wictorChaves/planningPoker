import { async, ComponentFixture, TestBed }                         from '@angular/core/testing';
import { AngularFireAuth }                                          from '@angular/fire/auth';
import { AngularFirestore }                                         from '@angular/fire/firestore';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router }                                   from '@angular/router';
import { of }                                                       from 'rxjs';
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
      }
    }
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
});
