import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KichthuocComponent } from './kichthuoc.component';

describe('KichthuocComponent', () => {
  let component: KichthuocComponent;
  let fixture: ComponentFixture<KichthuocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KichthuocComponent]
    });
    fixture = TestBed.createComponent(KichthuocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
