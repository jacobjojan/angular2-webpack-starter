import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetailComponent } from './detail.component';
console.log('`Detail` bundle loaded asynchronously');
// async components must be named routes for WebpackAsyncRoute
export var routes = [
    { path: '', component: DetailComponent, pathMatch: 'full' }
];
var AboutModule = (function () {
    function AboutModule() {
    }
    return AboutModule;
}());
AboutModule.routes = routes;
AboutModule = __decorate([
    NgModule({
        declarations: [
            // Components / Directives/ Pipes
            DetailComponent
        ],
        imports: [
            CommonModule,
            FormsModule,
            RouterModule.forChild(routes),
        ]
    }),
    __metadata("design:paramtypes", [])
], AboutModule);
export default AboutModule;
//# sourceMappingURL=index.js.map