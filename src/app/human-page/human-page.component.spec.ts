import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanPageComponent } from './human-page.component';

describe('HumanPageComponent', () => {
  let component: HumanPageComponent;
  let fixture: ComponentFixture<HumanPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumanPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
