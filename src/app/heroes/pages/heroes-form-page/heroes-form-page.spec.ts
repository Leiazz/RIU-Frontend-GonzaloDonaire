import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesFormPage } from './heroes-form-page';

describe('HeroesFormPage', () => {
  let component: HeroesFormPage;
  let fixture: ComponentFixture<HeroesFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesFormPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroesFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
