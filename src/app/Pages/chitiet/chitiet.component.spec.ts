import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietComponent } from './chitiet.component';

describe('ChitietComponent', () => {
  let component: ChitietComponent;
  let fixture: ComponentFixture<ChitietComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChitietComponent]
    });
    fixture = TestBed.createComponent(ChitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
