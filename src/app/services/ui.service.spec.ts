import { TestBed } from '@angular/core/testing';

import { UiService } from './ui.service';

describe('UiService', () => {
  let service: UiService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UiService] });
    service = TestBed.inject(UiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#toggleExtraCurrencies() should toggle #showExtraCurrencies false<->true', () => {
    service['showExtraCurrencies'] = false;
    service.toggleExtraCurrencies();
    expect(service['showExtraCurrencies']).toBe(true);
  });

  it('#toggleExtraCurrencies() should toggle #showExtraCurrencies true<->false', () => {
    service['showExtraCurrencies'] = true;
    service.toggleExtraCurrencies();
    expect(service['showExtraCurrencies']).toBe(false);
  });
});
