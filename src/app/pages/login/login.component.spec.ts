import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';

class AngularFireAuthMock {

  public result: Promise<string> | null = null;

  auth = { signInWithPopup: () => this.result };

}

class RouterMock {

  public url = '';

  navigateByUrl(url: string) {
    this.url = url;
  }

}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  var angularFireAuthMock = new AngularFireAuthMock();
  var routerMock = new RouterMock();

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        {
          provide: AngularFireAuth,
          useValue: angularFireAuthMock
        },
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', fakeAsync(() => {

    // Arrange
    var newGoogleAuthProvider = spyOn(component, 'newGoogleAuthProvider');

    angularFireAuthMock.result = new Promise((resolve, reject) => {
      resolve('userCredential');
    });

    // Act
    component.login();
    tick();

    // Assert
    expect(newGoogleAuthProvider).toHaveBeenCalled();
    expect('/rooms').toEqual(routerMock.url);

  }));

  it('should login fail', fakeAsync(() => {

    // Arrange
    var logError = spyOn(component, 'logError');

    angularFireAuthMock.result = new Promise((resolve, reject) => {
      reject('error');
    });

    // Act
    component.login();
    tick();

    // Assert
    expect(logError).toHaveBeenCalled();

  }));

  it('should create new Google Auth Provider', () => {

    // Arrange

    // Act
    var result = component.newGoogleAuthProvider();

    // Assert
    expect(result).not.toBeUndefined();

  });

  it('should log error', () => {

    // Arrange
    var error: any = 'error';
    spyOn(console, 'log');

    // Act
    component.logError(error);

    // Assert
    expect(console.log).toHaveBeenCalled();

  });

});
