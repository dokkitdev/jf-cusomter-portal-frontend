import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountReportsServiceControlPageComponent } from './service-control.component';

describe('AccountReportsServiceControlPageComponent', () => {
  let component: AccountReportsServiceControlPageComponent;
  let fixture: ComponentFixture<AccountReportsServiceControlPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccountReportsServiceControlPageComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountReportsServiceControlPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
