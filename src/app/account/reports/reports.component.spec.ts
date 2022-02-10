import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountReportsPageComponent } from './reports.component';

describe('AccountReportsPageComponent', () => {
  let component: AccountReportsPageComponent;
  let fixture: ComponentFixture<AccountReportsPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccountReportsPageComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountReportsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
