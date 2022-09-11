import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
})
export class DateTimeComponent implements OnInit, OnDestroy {
  time = new Date();
  subscription = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.subscription = timer(1000, 1000).subscribe(() => this.updateTime());
  }

  updateTime() {
    console.log('Update timer');
    this.time = new Date();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
