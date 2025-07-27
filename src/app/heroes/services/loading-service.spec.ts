import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading-service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have loadingList, loadingSave, loadingDelete as signals with default false', () => {
    expect(service.loadingList()).toBeFalse();
    expect(service.loadingSave()).toBeFalse();
    expect(service.loadingDelete()).toBeFalse();
  });

  it('should update loadingList signal', () => {
    service.updateLoadingList(true);
    expect(service.loadingList()).toBeTrue();
    service.updateLoadingList(false);
    expect(service.loadingList()).toBeFalse();
  });

  it('should update loadingSave signal', () => {
    service.updateLoadingSave(true);
    expect(service.loadingSave()).toBeTrue();
    service.updateLoadingSave(false);
    expect(service.loadingSave()).toBeFalse();
  });

  it('should update loadingDelete signal', () => {
    service.updateLoadingDelete(true);
    expect(service.loadingDelete()).toBeTrue();
    service.updateLoadingDelete(false);
    expect(service.loadingDelete()).toBeFalse();
  });
});
