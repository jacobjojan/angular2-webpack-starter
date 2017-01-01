import { Observable, Subject } from "rxjs";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/merge";
import "rxjs/add/observable/interval";
import "rxjs/add/observable/range";
import "rxjs/add/operator/map";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/share";
import "rxjs/add/operator/publish";
import { PriceUpdate } from "./price.model";

export class PriceHelper {

	public static getTileCount$(addTilesSubject$: Subject<any>,
	                            resetTilesSubject$: Subject<any>,
	                            tag: string): Observable<number> {
		return Observable.merge(
			// increment
			addTilesSubject$.asObservable()
				.map(function (x: number) {
					// console.log(tag + ' addTileSubject$ x = ' + x);
					return {num: x, reset: false};
				}),

			// reset
			resetTilesSubject$.asObservable()
				.map(function () {
					return {num: 0, reset: true};
				})
		)
			.scan((acc, value) => {
				return value.reset ? 0 : value.num;
			}, 0);
	}

	public static getTicks$(tileCount$: Observable<number>,
	                        tag: string): Observable<PriceUpdate> {
		return tileCount$
			.switchMap((tileCount: number, i: number) => {
				return Observable.interval(50).flatMap(() => {
					return Observable.range(1, tileCount);
				});
			})
			.map(
				(tileId: number) => new PriceUpdate(tileId, (Math.random() * 100).toFixed(
					2)))
			.publish().refCount();
	}


}