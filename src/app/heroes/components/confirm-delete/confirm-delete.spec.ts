import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDelete } from './confirm-delete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HeroesService } from '../../services/heroes-service';
import { LoadingService } from '../../services/loading-service';
import { Hero } from '../../interfaces/hero';

describe('ConfirmDelete', () => {
  let component: ConfirmDelete;
  let fixture: ComponentFixture<ConfirmDelete>;

  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ConfirmDelete>>;
  let mockOnConfirmAsync: jasmine.Spy<() => Promise<void>>;
  let mockLoadingService: jasmine.SpyObj<LoadingService>;
  const hero: Hero = {
    id: 1,
    name: 'Test Hero',
    power: 'test',
    universe: 'Marvel',
  };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockOnConfirmAsync = jasmine
      .createSpy('onConfirmAsync')
      .and.returnValue(Promise.resolve());
    mockLoadingService = jasmine.createSpyObj('LoadingService', [
      'loadingDelete',
    ]);
    await TestBed.configureTestingModule({
      imports: [ConfirmDelete],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { hero, onConfirmAsync: mockOnConfirmAsync },
        },
        { provide: LoadingService, useValue: mockLoadingService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onConfirmAsync and close dialog on confirm', async () => {
    await component.onConfirmDelete();
    expect(mockOnConfirmAsync).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should disable buttons when loadingDelete is true', () => {
    mockLoadingService.loadingDelete.and.returnValue(true);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons[0].disabled).toBeTrue();
    expect(buttons[1].disabled).toBeTrue();
  });

  it('should enable buttons when loadingDelete is false', () => {
    mockLoadingService.loadingDelete.and.returnValue(false);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons[0].disabled).toBeFalse();
    expect(buttons[1].disabled).toBeFalse();
  });

  it('should show spinner when loadingDelete is true', () => {
    mockLoadingService.loadingDelete.and.returnValue(true);
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should show "Si, eliminar" when loadingDelete is false', () => {
    mockLoadingService.loadingDelete.and.returnValue(false);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelectorAll('button')[1];
    expect(button.textContent).toContain('Si, eliminar');
  });
});
