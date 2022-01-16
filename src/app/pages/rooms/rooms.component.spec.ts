import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore }                 from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router }                           from '@angular/router';
import { of }                               from 'rxjs';
import { LoadingComponentSpec }             from 'src/app/tests/mocks/loading.component.spec';
import { RoomsComponent }                   from './rooms.component';

class AngularFirestoreMock {

  collection(path: string) {
    return {
      snapshotChanges: () => {
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

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture  : ComponentFixture<RoomsComponent>;

  var angularFirestoreMock = new AngularFirestoreMock();
  var routerMock           = new RouterMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoomsComponent, LoadingComponentSpec],
      providers   : [
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
    fixture   = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
