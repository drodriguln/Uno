/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TricksService } from './tricks.service';

describe('TricksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TricksService]
    });
  });

  it('should ...', inject([TricksService], (service: TricksService) => {
    expect(service).toBeTruthy();
  }));
});
