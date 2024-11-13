import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';

const PAGE_NOT_FOUND_ROUTES: Routes = [
  {
    path: '',
    component: PageNotFoundComponent,
  },
];

export default PAGE_NOT_FOUND_ROUTES;
