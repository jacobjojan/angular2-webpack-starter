import { Observable } from "rxjs";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publish';
import { PriceUpdate } from "./price.model";
export var PriceHelper = (function () {
    function PriceHelper() {
    }
    PriceHelper.getTileCount$ = function (addTilesSubject$, resetTilesSubject$, tag) {
        return Observable.merge(
        // increment
        addTilesSubject$.asObservable()
            .map(function (x) {
            // console.log(tag + ' addTileSubject$ x = ' + x);
            return { num: x, reset: false };
        }), 
        // reset
        resetTilesSubject$.asObservable()
            .map(function () {
            return { num: 0, reset: true };
        }))
            .scan(function (acc, value) {
            return value.reset ? 0 : value.num;
        }, 0);
    };
    PriceHelper.getTicks$ = function (tileCount$, tag) {
        return tileCount$
            .switchMap(function (tileCount, i) {
            return Observable.interval(50).flatMap(function () {
                return Observable.range(1, tileCount);
            });
        })
            .map(function (tileId) { return new PriceUpdate(tileId, (Math.random() * 100).toFixed(2)); })
            .publish().refCount();
    };
    return PriceHelper;
}());
//# sourceMappingURL=price-helper.js.map