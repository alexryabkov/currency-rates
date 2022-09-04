import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CurrencyItemComponent } from './components/currency-item/currency-item.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { DateTimeComponent } from './components/date-time/date-time.component';
import { ActionButtonComponent } from './components/action-button/action-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrencyItemComponent,
    CurrenciesComponent,
    DateTimeComponent,
    ActionButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
