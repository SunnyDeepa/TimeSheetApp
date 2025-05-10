import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PendingMyReviewPage } from './pending-my-review.page';

describe('PendingMyReviewPage', () => {
  let component: PendingMyReviewPage;
  let fixture: ComponentFixture<PendingMyReviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingMyReviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PendingMyReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
