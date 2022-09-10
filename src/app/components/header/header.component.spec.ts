import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let titleElem: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    titleElem = fixture.nativeElement.querySelector('.title');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have as title "Currency Rates to RUB"', () => {
    expect(component.title).toEqual('Currency Rates to RUB');
  });

  it('should display original title "Currency Rates to RUB"', () => {
    expect(titleElem.textContent).toContain(component.title);
  });

  it('should display title "Test Title"', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    expect(titleElem.textContent).toContain(component.title);
  });
});
