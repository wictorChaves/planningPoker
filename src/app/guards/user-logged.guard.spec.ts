import { TestBed, async, inject } from '@angular/core/testing';

import { UserLoggedGuard } from './user-logged.guard';

describe('UserLoggedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLoggedGuard]
    });
  });

  it('should ...', inject([UserLoggedGuard], (guard: UserLoggedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
