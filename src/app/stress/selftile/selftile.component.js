import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { PriceService } from "../price.service";
import { TileModel } from "../price.model";
import 'rxjs/add/operator/timeInterval';
var SelfTileComponent = (function () {
    function SelfTileComponent(priceService, cd, zone) {
        this.priceService = priceService;
        this.cd = cd;
        this.zone = zone;
        cd.detach();
    }
    SelfTileComponent.prototype.ngOnInit = function () {
        var _this = this;
        // console.log('Tile component created for tileId = ' + this.model.tileId);
        this.zone.runOutsideAngular(function () {
            _this.tileSubscription = _this.priceService.getTilePrice$(_this.model.tileId)
                .timeInterval()
                .subscribe(function (x) {
                _this.interval = x.interval;
                _this.model.updatePrice(x.value);
                _this.cd.detectChanges();
            });
        });
    };
    SelfTileComponent.prototype.ngOnDestroy = function () {
        if (this.tileSubscription && this.tileSubscription.unsubscribe) {
            this.tileSubscription.unsubscribe();
        }
    };
    return SelfTileComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", TileModel)
], SelfTileComponent.prototype, "model", void 0);
SelfTileComponent = __decorate([
    Component({
        selector: 'self-tile',
        templateUrl: './selftile.component.html',
        styleUrls: ['./selftile.component.css'],
        changeDetection: ChangeDetectionStrategy.Default
    }),
    __metadata("design:paramtypes", [PriceService, ChangeDetectorRef,
        NgZone])
], SelfTileComponent);
export { SelfTileComponent };
//# sourceMappingURL=selftile.component.js.map