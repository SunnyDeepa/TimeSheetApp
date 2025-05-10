import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyTimesheetListPage } from './my-timesheet-list.page';

describe('MyTimesheetListPage', () => {
  let component: MyTimesheetListPage;
  let fixture: ComponentFixture<MyTimesheetListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTimesheetListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyTimesheetListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
