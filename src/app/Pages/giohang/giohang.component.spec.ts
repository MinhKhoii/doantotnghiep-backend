import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiohangComponent } from './giohang.component';

describe('GiohangComponent', () => {
  let component: GiohangComponent;
  let fixture: ComponentFixture<GiohangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GiohangComponent]
    });
    fixture = TestBed.createComponent(GiohangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
