import { TestBed } from '@angular/core/testing';

import { ProjectDetailResoverService } from './project-detail.resover.service';

describe('ProjectDetail.ResoverService', () => {
  let service: ProjectDetailResoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectDetailResoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
