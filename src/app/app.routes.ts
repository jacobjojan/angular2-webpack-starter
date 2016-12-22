import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';
import { StressComponent } from "./stress/stress.component";


export const ROUTES: Routes = [
  { path: '',      component: StressComponent },
  { path: 'about', component: AboutComponent },
  { path: 'stress', component: StressComponent },
  {
    path: 'detail', loadChildren: () => System.import('./+detail')
      .then((comp: any) => comp.default),
  },
  { path: '**',    component: NoContentComponent },
];
