import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoadonnhapComponent } from './hoadonnhap.component';

describe('HoadonnhapComponent', () => {
  let component: HoadonnhapComponent;
  let fixture: ComponentFixture<HoadonnhapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoadonnhapComponent]
    });
    fixture = TestBed.createComponent(HoadonnhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
