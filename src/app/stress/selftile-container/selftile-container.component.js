import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, NgZone } from "@angular/core";
import { PriceService } from "../price.service";
import { AppState } from "../../app.service";
import { TileModel } from '../price.model';
var SelfTileContainerComponent = (function () {
    function SelfTileContainerComponent(priceService, appState, cd, zone) {
        this.priceService = priceService;
        this.appState = appState;
        this.cd = cd;
        this.zone = zone;
        this.initialQuantity = 0;
        this.initTime = 0;
        this.state = { selectedPairs: Array() };
        this._isWorker = false;
        this.frequency = 50;
        this.tileId = 0;
        this.state = this.appState.get();
        if (!this.state.hasOwnProperty('selectedPairs')) {
            this.state = {
                selectedPairs: Array()
            };
            this.appState.set('selectedPairs', this.state.selectedPairs);
        }
        this.currencyPairs = ['EUR USD', 'CAD AUD'];
        this.state = this.appState.get();
    }
    Object.defineProperty(SelfTileContainerComponent.prototype, "isWorker", {
        get: function () {
            return this._isWorker;
        },
        set: function (isWorker) {
            // console.log('isWorker setter called with ' + isWorker);
            this.clearAll();
            this._isWorker = isWorker;
            this.priceService.toggleWorker(isWorker);
        },
        enumerable: true,
        configurable: true
    });
    SelfTileContainerComponent.prototype.tileIdTrackFn = function (index, tile) {
        return tile.tileId;
    };
    SelfTileContainerComponent.prototype.ngOnInit = function () {
        console.log('SelfTile Container initial quantity = ' + this.initialQuantity);
        this.initTime = window.performance.now();
        this.addPairs(this.initialQuantity);
        //// Change proposed by google
        // this.cd.detach();
        // this.zone.runOutsideAngular(() => {
        // 	setInterval(() => {
        // 		this.cd.markForCheck();
        // 		this.cd.detectChanges();
        // 	}, 50);
        // });
    };
    SelfTileContainerComponent.prototype.ngAfterViewInit = function () {
        var loadTime = (window.performance.now() - this.initTime);
        console.log('load time = ' + loadTime + ' ms');
    };
    SelfTileContainerComponent.prototype.ngOnDestroy = function () {
        this.clearAll();
    };
    SelfTileContainerComponent.prototype.getNextTileId = function () {
        return ++this.tileId;
    };
    SelfTileContainerComponent.prototype.addPairs = function (numberToAdd) {
        var _this = this;
        if (numberToAdd < 1) {
            return;
        }
        var maxTileId = 0;
        for (var i = 0; i < numberToAdd; i++) {
            var t = this.getNewTile(this.currencyPairs[0]);
            this.state.selectedPairs.push(t);
            if (i === numberToAdd - 1) {
                maxTileId = t.tileId;
            }
        }
        this.appState.set('selectedPairs', this.state.selectedPairs);
        setTimeout(function () { return (_this.priceService.addTile(maxTileId)); }, 0);
    };
    SelfTileContainerComponent.prototype.addPair = function (selectedPair) {
        var t = this.getNewTile(selectedPair);
        this.state.selectedPairs.push(t);
        this.priceService.addTile(t.tileId);
        this.appState.set('selectedPairs', this.state.selectedPairs);
    };
    SelfTileContainerComponent.prototype.getNewTile = function (selectedPair) {
        return new TileModel(this.getNextTileId(), selectedPair);
    };
    SelfTileContainerComponent.prototype.clearAll = function () {
        this.state.selectedPairs = Array();
        this.tileId = 0;
        this.priceService.resetTiles();
        this.appState.set('selectedPairs', this.state.selectedPairs);
    };
    return SelfTileContainerComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Number)
], SelfTileContainerComponent.prototype, "initialQuantity", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], SelfTileContainerComponent.prototype, "isWorker", null);
SelfTileContainerComponent = __decorate([
    Component({
        selector: 'self-tile-container',
        templateUrl: './selftile-container.component.html',
        styleUrls: ['./selftile-container.component.css'],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [PriceService,
        AppState,
        ChangeDetectorRef,
        NgZone])
], SelfTileContainerComponent);
export { SelfTileContainerComponent };
//# sourceMappingURL=selftile-container.component.js.map