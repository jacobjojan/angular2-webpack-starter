import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { StressComponent } from "./stress/stress.component";
export var ROUTES = [
    { path: '', component: StressComponent },
    { path: 'about', component: AboutComponent },
    { path: 'stress', component: StressComponent },
    // { path: 'loaded/:initialQuantity', component: StressComponent },
    {
        path: 'detail', loadChildren: function () { return System.import('./+detail')
            .then(function (comp) { return comp.default; }); },
    },
    { path: '**', component: NoContentComponent },
];
//# sourceMappingURL=app.routes.js.map