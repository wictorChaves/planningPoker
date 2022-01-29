import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore }                 from '@angular/fire/firestore';
import { Router }                           from '@angular/router';
import { of }                               from 'rxjs';
import { VotesControlsComponent }           from './votes-controls.component';

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

describe('VotesControlsComponent', () => {
  let component: VotesControlsComponent;
  let fixture  : ComponentFixture<VotesControlsComponent>;

  var angularFirestoreMock = new AngularFirestoreMock();
  var routerMock           = new RouterMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VotesControlsComponent],
      providers   : [
        {
          provide : AngularFirestore,
          useValue: angularFirestoreMock
        },
        {
          provide : Router,
          useValue: routerMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(VotesControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
