import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyNames } from 'src/app/types/currency-names';

import { CurrencyItemComponent } from './currency-item.component';

describe('CurrencyItemComponent', () => {
  let component: CurrencyItemComponent;
  let fixture: ComponentFixture<CurrencyItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default data', () => {
    expect(component.currency).toEqual({
      name: CurrencyNames.NONE,
      exchangeRate: 0,
      rateChange: 0,
    });
  });

  it('should display correct data', () => {
    component.currency = {
      name: CurrencyNames.USD,
      exchangeRate: 60,
      rateChange: 0.1,
    };
    fixture.detectChanges();
    const currencyElem = fixture.nativeElement;

    expect(
      currencyElem.querySelector('.currency-item div').textContent
    ).toEqual(component.currency.name);

    expect(
      currencyElem.querySelector('.currency-item span').textContent
    ).toContain(component.currency.exchangeRate);

    expect(currencyElem.querySelector('.rate-up').textContent).toContain(
      component.currency.rateChange
    );
  });

  it('should show "red down" arrow and red rate text for negative rate change', () => {
    const redColor = 'rgb(204, 0, 0)';
    component.currency = {
      name: CurrencyNames.USD,
      exchangeRate: 60,
      rateChange: -0.1,
    };
    fixture.detectChanges();
    const currencyElem = fixture.nativeElement;
    expect(
      getComputedStyle(currencyElem.querySelector('.rate-down-arrow')).fill
    ).toEqual(redColor);
    expect(
      getComputedStyle(currencyElem.querySelector('.rate-down')).color
    ).toEqual(redColor);
    expect(currencyElem.querySelector('.rate-down').textContent).toEqual(
      `(${component.currency.rateChange.toFixed(2)})`
    );
  });

  it('should show "green up" arrow and green rate text for positive rate change', () => {
    const greenColor = 'rgb(0, 160, 0)';
    component.currency = {
      name: CurrencyNames.USD,
      exchangeRate: 60,
      rateChange: 0.1,
    };
    fixture.detectChanges();
    const currencyElem = fixture.nativeElement;
    expect(
      getComputedStyle(currencyElem.querySelector('.rate-up-arrow')).fill
    ).toEqual(greenColor);
    expect(
      getComputedStyle(currencyElem.querySelector('.rate-up')).color
    ).toEqual(greenColor);
    expect(currencyElem.querySelector('.rate-up').textContent).toEqual(
      `(+${component.currency.rateChange.toFixed(2)})`
    );
  });

  it('should show no arrow for zero rate change', () => {
    component.currency = {
      name: CurrencyNames.USD,
      exchangeRate: 60,
      rateChange: 0,
    };
    fixture.detectChanges();
    const currencyElem = fixture.nativeElement;
    expect(currencyElem.querySelector('svg')).toBeFalsy();
    expect(currencyElem.querySelector('.rate').textContent).toContain(
      `(${component.currency.rateChange.toFixed(2)}`
    );
  });
});
