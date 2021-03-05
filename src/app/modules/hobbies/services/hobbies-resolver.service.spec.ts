import { TestBed } from '@angular/core/testing';

import { HobbiesResolverService } from './hobbies-resolver.service';

describe('HobbiesResolverService', () => {
  let service: HobbiesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HobbiesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
