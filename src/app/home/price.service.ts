import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';


@Injectable()
export class PriceService {
	randomPrices$: Observable<number>;
	currencyPairs: Array<string>;
	workerPrices$: Observable<any>;
	private worker: Worker;
	private workerInitialized: boolean;
	private addTileSubject$ = new Subject();
	private removeTileSubject$ = new Subject();
	private resetTilesSubject$ = new Subject();
	private tileCount$ = Observable.merge(
		// decrement
		this.removeTileSubject$.asObservable()
			.map(function () {
				return {delta: -1, reset: false};
			}),

		// increment
		this.addTileSubject$.asObservable()
			.map(function () {
				return {delta: +1, reset: false};
			}),

		// reset
		this.resetTilesSubject$.asObservable()
			.map(function () {
				return {delta: 0, reset: true};
			})
	).scan(function (acc, value) {
		return value.reset ? 0 : acc + value.delta;
	}, 0);

	public ticks$ = this.tileCount$
		.switchMap((tileCount, i) => (
			Observable.interval(50)
				.flatMap(() => Observable.range(1, tileCount)))
		)
		.map((x, i) => ({
			tileId: x,
			price: (Math.random() * 100).toFixed(2)
		}))
		.publish().refCount();
		// .share();


	constructor() {
		this.currencyPairs = ['USD EUR', 'USD JPY', 'GBP USD', 'USD CAD'];

		this.randomPrices$ = Observable.interval(50)
			.map(() => (Math.random() * 100));

		this.workerInitialized = false;

		this.initWorker();

		console.log('PriceService created here!!!!');

		this.ticks$.subscribe(
			// val => console.log('tileId = ' + val.tileId + ' price = ' + val.price)
		);
	}

	public getTilePrice$(tileId): Observable<any> {
		console.log('getTilePrice$ tileId = '+tileId);
		return this.ticks$.filter( tileUpdate => tileUpdate.tileId === tileId );
	}

	public addTile(tileId) : void {
		console.log('addTile tileId = '+tileId);
		this.addTileSubject$.next(tileId);
	}

	public removeTile(tileId) : void {
		this.removeTileSubject$.next(tileId);
	}

	public resetTiles() : void {
		this.resetTilesSubject$.next();
	}

	public getPrices$(): Observable<number> {
		return this.randomPrices$;
	}

	public getWorkerPrices$(): Observable<any> {

		this.worker.postMessage({command: 'start'});
		return this.workerPrices$
	}

	public stopWorkerPrices(): void {
		this.worker.postMessage({command: 'stop'});
	}

	public subscribePrice(crossKey: string): void {
		this.worker.postMessage({command: 'subscribe', params: [crossKey]});
	}

	private initWorker(): void {
		if (!this.workerInitialized) {
			this.worker = new Worker('../../workers/worker.js');
			this.workerPrices$ = Observable.fromEvent(this.worker, 'message');
			this.workerInitialized = true;
		}
	}
}
