import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router }                           from '@angular/router';
import { RoomsListComponent }               from './rooms-list.component';

class RouterMock {

  public url = [];

  navigate(url: []) {
    this.url = url;
  }

}

describe('RoomsListComponent', () => {
  let component: RoomsListComponent;
  let fixture  : ComponentFixture<RoomsListComponent>;

  var routerMock = new RouterMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoomsListComponent],
      providers   : [
        {
          provide : Router,
          useValue: routerMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(RoomsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {

    // Arrange
    var id: string = '1';

    // Act
    component.goToRoom(id);

    // Assert
    expect(routerMock.url[0]).toEqual('tasks');
    expect(routerMock.url[1]).toEqual('1');

  });

});
