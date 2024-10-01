import { TestBed } from '@angular/core/testing';

import { FlowbitesService } from './flowbite.service';

describe('FlowbitService', () => {
  let service: FlowbitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowbitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
