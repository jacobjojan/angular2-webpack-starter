import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from "rxjs";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publish';
import { PriceHelper } from './price-helper';
var PriceService = (function () {
    function PriceService() {
        var _this = this;
        this.workerInitialized = false;
        this.isWorkerEnabled$ = new BehaviorSubject(this.workerInitialized);
        this.addTilesSubject$ = new Subject();
        this.resetTilesSubject$ = new Subject();
        this.tileCount$ = PriceHelper.getTileCount$(this.addTilesSubject$, this.resetTilesSubject$, 'PriceService');
        this.ticks$ = PriceHelper.getTicks$(this.tileCount$, 'PriceService');
        this.initWorker();
        this.tileCount$.subscribe(function (lastTileCount) {
            _this.lastTileCount = lastTileCount;
        });
        this.isWorkerEnabled$.subscribe(function (x) {
            // console.debug('PriceService isWorkerEnabled$ = ' + x +
            //             ' lastTileCount = ' + this.lastTileCount);
            if (x) {
                _this.stopTicksSubscription();
                _this.startWorker(_this.lastTileCount);
            }
            else {
                _this.startTicksSubscription();
                _this.stopWorker();
            }
        });
    }
    PriceService.prototype.getTilePrice$ = function (tileId) {
        // console.log('PriceService getTilePrice$ tileId = ' + tileId);
        var svc = this;
        return this.isWorkerEnabled$.switchMap(function (x) {
            if (x) {
                // console.debug('PriceService getTilePrice$ switching to worker');
                return svc.workerPrices$.map(function (msg) { return msg.data; });
            }
            else {
                // console.debug('PriceService getTilePrice$ switching to non-worker');
                return svc.ticks$;
            }
        })
            .filter(function (tileUpdate) { return tileUpdate.tileId === tileId; });
    };
    PriceService.prototype.addTile = function (tileId) {
        this.addTilesSubject$.next(tileId);
        if (this.isWorkerEnabled$.getValue()) {
            // console.log('PriceService addTile to worker tileId = ' + tileId);
            this.worker.postMessage({ command: 'add', params: [tileId] });
        }
        else {
        }
    };
    PriceService.prototype.resetTiles = function () {
        this.resetTilesSubject$.next();
        if (this.isWorkerEnabled$.getValue()) {
            this.worker.postMessage({ command: 'reset', params: [] });
        }
    };
    PriceService.prototype.startWorker = function (lastTileCount) {
        if (!this.workerInitialized) {
            this.workerInitialized = true;
            // console.log('PriceService starting worker with tileId = ' + lastTileCount);
            this.worker.postMessage({ command: 'start', params: [lastTileCount] });
        }
        else {
        }
    };
    PriceService.prototype.stopWorker = function () {
        if (this.workerInitialized) {
            // console.log('PriceService stopping worker');
            this.worker.postMessage({ command: 'stop' });
            this.workerInitialized = false;
        }
        else {
        }
    };
    PriceService.prototype.toggleWorker = function (enable) {
        // console.log('PriceService toggle worker = '+enable);
        this.isWorkerEnabled$.next(enable);
    };
    PriceService.prototype.initWorker = function () {
        if (!this.workerInitialized) {
            this.worker = new Worker('../../workers/worker.js');
            this.workerPrices$ = Observable.fromEvent(this.worker, 'message').publish().refCount();
        }
        else {
        }
    };
    PriceService.prototype.startTicksSubscription = function () {
        this.ticksSubscription = this.ticks$.subscribe();
    };
    PriceService.prototype.stopTicksSubscription = function () {
        if (this.ticksSubscription && this.ticksSubscription.unsubscribe) {
            this.ticksSubscription.unsubscribe();
        }
    };
    return PriceService;
}());
PriceService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], PriceService);
export { PriceService };
//# sourceMappingURL=price.service.js.map