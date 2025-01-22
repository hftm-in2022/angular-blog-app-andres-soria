import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogOverviewCardComponent } from './blog-overview-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('BlogOverviewCardComponent', () => {
  let component: BlogOverviewCardComponent;
  let fixture: ComponentFixture<BlogOverviewCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        BlogOverviewCardComponent,
      ],
    });
    fixture = TestBed.createComponent(BlogOverviewCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    // arrange
    fixture.componentRef.setInput('blog', { title: 'Test' });
    fixture.detectChanges();

    // act
    const element: HTMLElement = fixture.debugElement.query(
      By.css('[data-testid="title"]'),
    ).nativeElement;

    // assert
    expect(element.innerText).toBe('Test');
  });
});
