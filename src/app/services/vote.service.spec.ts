import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { VoteService } from './vote.service';

class AngularFireAuthMock {
  user = of([{}]);
}

class AngularFirestoreMock {

  public result = of();

  collection(path: string) {
    return { snapshotChanges: () => this.result }
  }

}

describe('VoteService', () => {

  var angularFireAuthMock = new AngularFireAuthMock();
  var angularFirestoreMock = new AngularFirestoreMock();

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: AngularFireAuth,
        useValue: angularFireAuthMock
      },
      {
        provide: AngularFirestore,
        useValue: angularFirestoreMock
      }
    ]
  }));

  it('should be created', () => {
    const service: VoteService = TestBed.get(VoteService);
    expect(service).toBeTruthy();
  });
});
