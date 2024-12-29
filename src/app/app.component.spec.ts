// import { TestBed } from '@angular/core/testing';
// import { AppComponent } from './app.component';
// import { provideHttpClient } from '@angular/common/http';
// import {
//   AuthModule,
//   provideAuth,
//   StsConfigLoader,
// } from 'angular-auth-oidc-client';

// describe('AppComponent', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AppComponent, AuthModule],
//       providers: [
//         provideHttpClient(),
//         provideAuth({
//           loader: {
//             provide: StsConfigLoader,
//             useFactory: () => () => ({}),
//           },
//         }),
//       ],
//     }).compileComponents();
//   });

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });
// });
