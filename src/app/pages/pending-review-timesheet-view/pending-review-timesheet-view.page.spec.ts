import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PendingReviewTimesheetViewPage } from './pending-review-timesheet-view.page';

describe('PendingReviewTimesheetViewPage', () => {
  let component: PendingReviewTimesheetViewPage;
  let fixture: ComponentFixture<PendingReviewTimesheetViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingReviewTimesheetViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PendingReviewTimesheetViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
