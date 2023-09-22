import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsencesCardComponent } from './absences-card.component';

describe('AbsencesCardComponent', () => {
  let component: AbsencesCardComponent;
  let fixture: ComponentFixture<AbsencesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbsencesCardComponent]
    });
    fixture = TestBed.createComponent(AbsencesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
