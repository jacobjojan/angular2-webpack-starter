import { Routes } from '@angular/router';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { StressComponent } from "./stress/stress.component";


export const ROUTES: Routes = [
  { path: '',      component: StressComponent },
  { path: 'about', component: AboutComponent },
  { path: 'stress', component: StressComponent },
  // { path: 'loaded/:initialQuantity', component: StressComponent },
  {
    path: 'detail', loadChildren: () => System.import('./+detail')
      .then((comp: any) => comp.default),
  },
  { path: '**',    component: NoContentComponent },
];
