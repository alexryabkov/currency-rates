import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showExtraCurrencies = false;
  private subject = new Subject<boolean>();

  constructor() {}

  toggleExtraCurrencies(): void {
    this.showExtraCurrencies = !this.showExtraCurrencies;
    this.subject.next(this.showExtraCurrencies);
  }

  onToggle(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
