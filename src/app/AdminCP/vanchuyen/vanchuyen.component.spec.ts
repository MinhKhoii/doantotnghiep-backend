import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanchuyenComponent } from './vanchuyen.component';

describe('VanchuyenComponent', () => {
  let component: VanchuyenComponent;
  let fixture: ComponentFixture<VanchuyenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VanchuyenComponent]
    });
    fixture = TestBed.createComponent(VanchuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
