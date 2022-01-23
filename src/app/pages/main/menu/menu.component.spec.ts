import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth }                  from '@angular/fire/auth';
import { RouterModule }                     from '@angular/router';
import { RouterTestingModule }              from '@angular/router/testing';
import { MenuComponent }                    from './menu.component';

//#region Mocks

class LoginComponentMock { }
class AngularFireAuthMock {

  public logout = false;

  auth = {
    signOut: () => { this.logout = true }
  }

}

//#endregion

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture  : ComponentFixture<MenuComponent>;

  var angularFireAuthMock = new AngularFireAuthMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuComponent],
      providers   : [
        {
          provide : AngularFireAuth,
          useValue: angularFireAuthMock
        }
      ],
      imports: [
        RouterModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponentMock }
        ])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {

    // Arrange

    // Act
    component.logout();

    // Assert
    expect(angularFireAuthMock.logout).toBeTruthy();

  });

});
