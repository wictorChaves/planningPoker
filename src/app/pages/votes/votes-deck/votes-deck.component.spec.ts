import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { FibonacciModel } from 'src/app/classes/fibonacci.model';
import { VoteService } from 'src/app/services/vote.service';
import { FibonacciDeckComponentSpec } from 'src/app/tests/mocks/fibonacci-deck.component.spec';
import { RiskMatrixComponentSpec } from 'src/app/tests/mocks/risk-matrix.component.spec';
import { VotesDeckComponent } from './votes-deck.component';

class VoteServiceMock {

  public listenerActiveVoteResult: any = new Subject<any>();
  public activeCardEventCalled: boolean = false;

  listenerActiveVote() {
    return this.listenerActiveVoteResult;
  }

  activeCardEvent() {
    this.activeCardEventCalled = true;
  }

}

describe('VotesDeckComponent', () => {
  let component: VotesDeckComponent;
  let fixture: ComponentFixture<VotesDeckComponent>;

  var voteServiceMock = new VoteServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VotesDeckComponent, FibonacciDeckComponentSpec, RiskMatrixComponentSpec],
      providers: [
        {
          provide: VoteService,
          useValue: voteServiceMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotesDeckComponent);
    component = fixture.componentInstance;

    component.room = {
      id: '1',
      name: 'Name',
      average: 'Average',
      isFlip: true,
      currentTask: 1,
      participants: [],
      votes: [],
      tasks: []
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  [
    {
      result: null,
      expect: {
        value: 1,
        description: 'A',
        class: 'primary'
      }
    },
    {
      result: {
        value: {
          value: 2,
          description: 'description',
          class: 'class',
          emojis: []
        }
      },
      expect: {
        value: 2,
        description: 'description',
        class: 'class',
        emojis: []
      }
    }
  ].forEach(item => {

    it('should load active card', fakeAsync(() => {

      // Arrange
      voteServiceMock.listenerActiveVoteResult.next(item.result);
      tick();

      // Act
      component.loadActiveCard();
      tick();

      // Assert
      expect(item.expect.value).toEqual(component?.activeCard?.value ?? 0);
      expect(item.expect.description).toEqual(component?.activeCard?.description ?? '');

    }));

  });

  it('should load active card', fakeAsync(() => {

    // Arrange
    var fibonacciModel: FibonacciModel = {
      value: 1,
      description: 'description',
      class: 'class',
      emojis: ['1', '2', '3']
    };

    // Act
    component.activeCardEvent(fibonacciModel);
    tick();

    // Assert
    expect(voteServiceMock.activeCardEventCalled).toBeTruthy();
    expect(fibonacciModel?.emojis?.length).toEqual(0);

  }));

});
