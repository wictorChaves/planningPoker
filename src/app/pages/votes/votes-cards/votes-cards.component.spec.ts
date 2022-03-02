import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesCardsComponent } from './votes-cards.component';

describe('VotesCardsComponent', () => {
  let component: VotesCardsComponent;
  let fixture  : ComponentFixture<VotesCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VotesCardsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture        = TestBed.createComponent(VotesCardsComponent);
    component      = fixture.componentInstance;
    component.room = {
      id          : '1',
      name        : 'Name',
      average     : 'Average',
      isFlip      : true,
      currentTask : 1,
      participants: [],
      votes       : [],
      tasks       : []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not get title', () => {

    // Arrange
    var emoji: string;

    // Act
    var result = component.getTitle(emoji);

    // Assert
    expect(result).toEqual('');

  });

  it('should get title', () => {

    // Arrange
    var emoji: string = '🛴';

    // Act
    var result = component.getTitle(emoji);

    // Assert
    expect(result).toEqual('Claro o que tem que fazer');

  });

});
