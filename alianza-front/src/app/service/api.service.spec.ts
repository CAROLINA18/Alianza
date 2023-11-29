import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let fixture: ComponentFixture<ApiService>
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
