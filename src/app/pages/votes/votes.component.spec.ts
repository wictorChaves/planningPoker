import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFireAuth }                                   from '@angular/fire/auth';
import { AngularFirestore }                                  from '@angular/fire/firestore';
import { ActivatedRoute, convertToParamMap, Router }         from '@angular/router';
import { RouterTestingModule }                               from '@angular/router/testing';
import { of, Subject }                                       from 'rxjs';
import { FibonacciModel }                                    from 'src/app/classes/fibonacci.model';
import { FibonacciDeckComponentSpec }                        from 'src/app/tests/mocks/fibonacci-deck.component.spec';
import { VotesComponent }                                    from './votes.component';

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

  public docValueChangesResult: any = of({});

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

describe('VotesComponent', () => {
  let component: VotesComponent;
  let fixture  : ComponentFixture<VotesComponent>;

  var activatedRouteMock   = new ActivatedRouteMock();
  var angularFirestoreMock = new AngularFirestoreMock();
  var angularFireAuthMock  = new AngularFireAuthMock();
  var routerMock           = new RouterMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VotesComponent, FibonacciDeckComponentSpec],
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
          provide : AngularFireAuth,
          useValue: angularFireAuthMock
        },
        {
          provide : Router,
          useValue: routerMock
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
