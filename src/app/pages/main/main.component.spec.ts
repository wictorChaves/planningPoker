import { Component }                        from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule }              from '@angular/router/testing';
import { MainComponent }                    from './main.component';

//#region 

@Component({ selector: 'app-menu', template: '' })
export class MenuComponentMock { }

//#endregion

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture  : ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent, MenuComponentMock],
      imports     : [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
