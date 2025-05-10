import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyTaskFormPage } from './my-task-form.page';

describe('MyTaskFormPage', () => {
  let component: MyTaskFormPage;
  let fixture: ComponentFixture<MyTaskFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTaskFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyTaskFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
