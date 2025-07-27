import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loadingList = signal<boolean>(false);
  private _loadingSave = signal<boolean>(false);
  private _loadingDelete = signal<boolean>(false);
  loadingList = this._loadingList.asReadonly();
  loadingSave = this._loadingSave.asReadonly();
  loadingDelete = this._loadingDelete.asReadonly();

  updateLoadingList(isLoading: boolean): void {
    this._loadingList.set(isLoading);
  }
  updateLoadingSave(isLoading: boolean): void {
    this._loadingSave.set(isLoading);
  }
  updateLoadingDelete(isLoading: boolean): void {
    this._loadingDelete.set(isLoading);
  }
}
