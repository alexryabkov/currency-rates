import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { DateTimeComponent } from './date-time.component';

describe('DateTimeComponent', () => {
  let component: DateTimeComponent;
  let fixture: ComponentFixture<DateTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateTimeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#updateTime', () => {
    it('should return a Subscription with timer update callback', fakeAsync(() => {
      const currTime = component.time;
      const subscription = component.updateTime();
      tick(1000);
      fixture.detectChanges();
      expect(+component.time - +currTime).toBeGreaterThanOrEqual(1000);
      subscription.unsubscribe();
    }));
  });
});
