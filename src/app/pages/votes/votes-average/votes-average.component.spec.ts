import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VotesAverageComponent }            from './votes-average.component';

describe('VotesAverageComponent', () => {
  let component: VotesAverageComponent;
  let fixture  : ComponentFixture<VotesAverageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VotesAverageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(VotesAverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  ['0', '1', '2', '3'].forEach(item => {

    it('should is heart', () => {

      // Arrange

      // Act
      var result = component.isHeart(item);

      // Assert
      expect(result).toBeTruthy();

    });

  });

  ['4'].forEach(item => {

    it('should not is heart', () => {

      // Arrange

      // Act
      var result = component.isHeart(item);

      // Assert
      expect(result).toBeFalsy();

    });

  });

  ['4', '5', '6', '7', '8', '9', '10'].forEach(item => {

    it('should is diamont', () => {

      // Arrange

      // Act
      var result = component.isDiamond(item);

      // Assert
      expect(result).toBeTruthy();

    });

  });

  ['3', '11'].forEach(item => {

    it('should not is diamont', () => {

      // Arrange

      // Act
      var result = component.isDiamond(item);

      // Assert
      expect(result).toBeFalsy();

    });

  });

  ['11', '12'].forEach(item => {

    it('should is spade', () => {

      // Arrange

      // Act
      var result = component.isSpade(item);

      // Assert
      expect(result).toBeTruthy();

    });

  });

  ['10'].forEach(item => {

    it('should not is spade', () => {

      // Arrange

      // Act
      var result = component.isSpade(item);

      // Assert
      expect(result).toBeFalsy();

    });

  });

});
