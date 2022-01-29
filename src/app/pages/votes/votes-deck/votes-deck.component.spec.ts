import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesDeckComponent } from './votes-deck.component';

describe('VotesDeckComponent', () => {
  let component: VotesDeckComponent;
  let fixture  : ComponentFixture<VotesDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VotesDeckComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(VotesDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
