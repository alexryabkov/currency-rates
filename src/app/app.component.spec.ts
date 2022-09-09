import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { AppComponent } from './app.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { DateTimeComponent } from './components/date-time/date-time.component';
import { HeaderComponent } from './components/header/header.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent(HeaderComponent),
        MockComponent(DateTimeComponent),
        MockComponent(CurrenciesComponent),
      ],
    }).compileComponents();
  });

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [AppComponent] });
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'currency-rates'`, () => {
    expect(app.title).toEqual('currency-rates');
  });
});
