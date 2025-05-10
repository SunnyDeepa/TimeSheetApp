import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PendingReviewTimesheetFormPage } from './pending-review-timesheet-form.page';

describe('PendingReviewTimesheetFormPage', () => {
  let component: PendingReviewTimesheetFormPage;
  let fixture: ComponentFixture<PendingReviewTimesheetFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingReviewTimesheetFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PendingReviewTimesheetFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
