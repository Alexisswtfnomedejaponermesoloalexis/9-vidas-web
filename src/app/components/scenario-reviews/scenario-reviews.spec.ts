import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioReviewsComponent } from './scenario-reviews';

describe('ScenarioReviewsComponent', () => {
  let component: ScenarioReviewsComponent;
  let fixture: ComponentFixture<ScenarioReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenarioReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenarioReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
