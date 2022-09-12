import { Component, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
})
export class DateTimeComponent implements OnDestroy {
  time = new Date();
  subscription: Subscription;

  constructor() {
    this.subscription = this.updateTime();
  }

  updateTime() {
    return timer(1000, 1000).subscribe(() => (this.time = new Date()));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
