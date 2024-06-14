import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitiethoadonnhapComponent } from './chitiethoadonnhap.component';

describe('ChitiethoadonnhapComponent', () => {
  let component: ChitiethoadonnhapComponent;
  let fixture: ComponentFixture<ChitiethoadonnhapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChitiethoadonnhapComponent]
    });
    fixture = TestBed.createComponent(ChitiethoadonnhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
