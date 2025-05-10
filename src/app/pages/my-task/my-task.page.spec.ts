import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyTaskPage } from './my-task.page';

describe('MyTaskPage', () => {
  let component: MyTaskPage;
  let fixture: ComponentFixture<MyTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTaskPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
