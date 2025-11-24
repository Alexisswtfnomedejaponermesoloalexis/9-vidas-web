import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioReviews } from './scenario-reviews';

describe('ScenarioReviews', () => {
  let component: ScenarioReviews;
  let fixture: ComponentFixture<ScenarioReviews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenarioReviews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenarioReviews);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
