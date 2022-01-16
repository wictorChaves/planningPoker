import { TestBed, inject, fakeAsync, tick }                    from '@angular/core/testing';
import { AngularFireAuth }                                     from '@angular/fire/auth';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of }                                      from 'rxjs';
import { UserLoggedGuard }                                     from './user-logged.guard';

class AngularFireAuthMock {
  user = of([{}]);
}

class RouterMock {
  parseUrl = (url: string) => false;
}

describe('UserLoggedGuard', () => {

  var angularFireAuthMock = new AngularFireAuthMock();
  var routerMock          = new RouterMock();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserLoggedGuard,
        {
          provide : AngularFireAuth,
          useValue: angularFireAuthMock
        },
        {
          provide : Router,
          useValue: routerMock
        }
      ]
    });
  });

  it('should create', inject([UserLoggedGuard], (guard: UserLoggedGuard) => {
    expect(guard).toBeTruthy();
  }));

  [
    {
      it          : 'should can activate',
      userResult  : of([{}]),
      assertResult: true
    },
    {
      it          : 'should not can activate',
      userResult  : of(null),
      assertResult: false
    }
  ].forEach(item => {

    it(item.it, inject([UserLoggedGuard], fakeAsync(async (guard: UserLoggedGuard) => {

      // Arrange    
      var route: ActivatedRouteSnapshot;
      var state: RouterStateSnapshot;
      angularFireAuthMock.user = item.userResult;

      // Act
      var result = await (guard.canActivate(route, state) as Observable<boolean>).toPromise();

      // Assert
      expect(item.assertResult).toEqual(result);

    })));

  });

});
