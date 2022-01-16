import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth }                  from '@angular/fire/auth';
import { Router }                           from '@angular/router';
import { LoginComponent }                   from './login.component';

class AngularFireAuthMock {

}

class RouterMock {

}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture  : ComponentFixture<LoginComponent>;

  var angularFireAuthMock = new AngularFireAuthMock();
  var routerMock          = new RouterMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers   : [
        {
          provide : AngularFireAuth,
          useValue: angularFireAuthMock
        },
        {
          provide : Router,
          useValue: routerMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    
    // Arrange
    
    // Act
    
    // Assert
    
  });

});
