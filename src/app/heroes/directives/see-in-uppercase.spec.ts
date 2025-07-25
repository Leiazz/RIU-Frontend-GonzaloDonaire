import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SeeInUppercase } from './see-in-uppercase';

@Component({
  standalone: true,
  template: `<span appSeeInUppercase>texto de prueba</span>`,
  imports: [SeeInUppercase],
})
class TestHostComponent {}

describe('SeeInUppercase Directive', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = fixture.debugElement.query(By.directive(SeeInUppercase));
    expect(directive).not.toBeNull();
  });

  it('should set text-transform to uppercase', () => {
    const span: HTMLElement = fixture.debugElement.query(
      By.css('span')
    ).nativeElement;
    expect(span.style.textTransform).toBe('uppercase');
  });
});
