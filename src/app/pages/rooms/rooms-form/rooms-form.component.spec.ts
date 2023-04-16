import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFirestore }                                  from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule }                  from '@angular/forms';
import { Router }                                            from '@angular/router';
import { of }                                                from 'rxjs';
import { LoadingComponentSpec }                              from 'src/app/tests/mocks/loading.component.spec';
import { RoomsFormComponent }                                from './rooms-form.component';

class AngularFirestoreMock {

  public result: any;

  collection(path: string) {
    return { add: () => this.result }
  }

}

class RouterMock {

  public url = '';

  navigateByUrl(url: string) {
    this.url = url;
  }

}

describe('RoomsFormComponent', () => {
  let component: RoomsFormComponent;
  let fixture  : ComponentFixture<RoomsFormComponent>;

  var angularFirestoreMock = new AngularFirestoreMock();
  var routerMock           = new RouterMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoomsFormComponent, LoadingComponentSpec],
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
    fixture   = TestBed.createComponent(RoomsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', fakeAsync(() => {

    // Arrange
    spyOn(component, 'validateForm').and.returnValue(true);
    angularFirestoreMock.result = new Promise((resolve, reject) => {
      resolve({ id: 1 });
    });
    var goToTaskPage = spyOn(component, 'goToTaskPage');

    // Act
    component.onSubmit();
    tick();

    // Assert
    expect(goToTaskPage).toHaveBeenCalled();

  }));

  it('should not submit', fakeAsync(() => {

    // Arrange
    spyOn(component, 'validateForm').and.returnValue(false);
    angularFirestoreMock.result = new Promise((resolve, reject) => {
      resolve({ id: 1 });
    });
    var goToTaskPage = spyOn(component, 'goToTaskPage');

    // Act
    component.onSubmit();
    tick();

    // Assert
    expect(goToTaskPage).not.toHaveBeenCalled();

  }));

  it('should go to task page', () => {

    // Arrange
    var result: any    = { id: 1 };
        routerMock.url = '';

    // Act
    component.goToTaskPage(result);

    // Assert
    expect(routerMock.url).toEqual('/tasks/1');

  });

  [
    {
      it              : 'should show empty form message',
      roomNameValue   : '',
      roomAlreadyExist: false,
      messageError    : 'Você se esqueceu de preencher o nome da sala 😜',
      formValid       : false,
      isValid         : false,
      rooms           : []
    },
    {
      it              : 'should show room already exist message',
      roomNameValue   : 'Sala de teste',
      roomAlreadyExist: true,
      messageError    : 'Esta sala já existe 🤔',
      formValid       : true,
      isValid         : false,
      rooms           : [{ name: 'Sala de teste' }]
    },
    {
      it              : 'should form most be valid',
      roomNameValue   : 'Nova sala',
      roomAlreadyExist: false,
      messageError    : '',
      formValid       : true,
      isValid         : true,
      rooms           : []
    }
  ].forEach(item => {

    it(item.it, () => {

      component.form.patchValue({
        roomName: item.roomNameValue
      });

      // Arrange      
      component.messageError = '';
      component.rooms        = [...item.rooms.map(x => Object.assign(x))];

      // Act
      var result       = component.validateForm();
      var fieldInvalid = component.FieldInvalid('roomName');

      // Assert
      expect(item.messageError).toEqual(component.messageError);
      expect(item.isValid).toEqual(result);
      expect(!item.formValid).toEqual(fieldInvalid);

    });

  });

});
