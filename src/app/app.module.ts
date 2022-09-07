import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CurrencyItemComponent } from './components/currency-item/currency-item.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { DateTimeComponent } from './components/date-time/date-time.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrencyItemComponent,
    CurrenciesComponent,
    DateTimeComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
