import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogOverviewPageComponent } from './blog-overview-page.component';
import { BlogOverviewCardComponent } from '../../shared/blog-overview-card/blog-overview-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { Router, provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('BlogOverviewPageComponent', () => {
  let component: BlogOverviewPageComponent;
  let fixture: ComponentFixture<BlogOverviewPageComponent>;
  let routerMock: Router;
  // let navigateSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
      imports: [BlogOverviewCardComponent, MatProgressBarModule, MatIconModule],
    });
    fixture = TestBed.createComponent(BlogOverviewPageComponent);
    component = fixture.componentInstance;
    routerMock = TestBed.inject(Router);
    routerMock.initialNavigation();
    fixture.componentRef.setInput('model', {
      data: [
        {
          id: 1,
          title: 'Test Blog',
          contentPreview: 'This is a test blog preview.',
          author: 'Author 1',
          likes: 10,
          comments: 5,
          likedByMe: true,
          createdByMe: false,
          headerImageUrl: 'http://example.com/image.jpg',
        },
      ],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display blog title', () => {
    // act
    const blogTitle = fixture.debugElement.query(
      By.css('[data-testid="title"]'),
    ).nativeElement;

    // assert
    expect(blogTitle.textContent).toContain('Test Blog');
  });

  it('should display blog author', () => {
    // act
    const blogAuthor = fixture.debugElement.query(
      By.css('[data-testid="blog-author"]'),
    ).nativeElement;

    // assert
    expect(blogAuthor.textContent).toContain('Author 1');
  });

  it('should display blog content preview', () => {
    // act
    const blogContentPreview = fixture.debugElement.query(
      By.css('[data-testid="blog-content"]'),
    ).nativeElement;

    // assert
    expect(blogContentPreview.textContent).toContain(
      'This is a test blog preview.',
    );
  });

  it('should display blog liked by me', () => {
    // act
    const blogLikedByMe = fixture.debugElement.query(
      By.css('[data-testid="blog-liked-by-me"]'),
    ).nativeElement;

    // assert
    expect(blogLikedByMe.textContent).toContain('❤️');
  });

  it('should display blog header image', () => {
    // act
    const blogHeaderImage = fixture.debugElement.query(
      By.css('[data-testid="blog-header-image"]'),
    ).nativeElement;

    // assert
    expect(blogHeaderImage.src).toContain('http://example.com/image.jpg');
  });

  // Not working yet
  // it('should navigate to a certain blog when the blog card is clicked', () => {
  //   // arrange
  //   navigateSpy = spyOn(routerMock, 'navigateByUrl');

  //   // act
  //   const blogCardElement = fixture.debugElement.query(By.css('[data-testid="blog-overview-card"]'));
  //   blogCardElement.componentInstance.click();

  //   // assert
  //   const urlTree: UrlTree = routerMock.parseUrl('/detail/1');
  //   expect(navigateSpy).toHaveBeenCalledWith(urlTree, jasmine.any(Object));
  // });
});
