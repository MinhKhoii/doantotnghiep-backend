import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnhComponent } from './anh.component';

describe('AnhComponent', () => {
  let component: AnhComponent;
  let fixture: ComponentFixture<AnhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnhComponent]
    });
    fixture = TestBed.createComponent(AnhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
