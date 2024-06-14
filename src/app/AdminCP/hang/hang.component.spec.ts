import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HangComponent } from './hang.component';

describe('HangComponent', () => {
  let component: HangComponent;
  let fixture: ComponentFixture<HangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HangComponent]
    });
    fixture = TestBed.createComponent(HangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
