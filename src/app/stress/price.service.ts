import { PriceUpdate } from "./price.model";
import { Injectable } from "@angular/core";
import { Observable, Subject, BehaviorSubject, Subscription } from "rxjs";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/merge";
import "rxjs/add/observable/interval";
import "rxjs/add/observable/range";
import "rxjs/add/operator/map";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/share";
import "rxjs/add/operator/publish";
import { PriceHelper } from "./price-helper";

const PriceWorker = require("worker-loader!../../workers/worker.setup");

@Injectable()
export class PriceService {
	private ticksSubscription: Subscription;
	private workerPrices$: Observable<any>;
	private worker: Worker;
	private lastTileCount: number;
	private workerInitialized: boolean = false;
	public isWorkerEnabled$ = new BehaviorSubject(this.workerInitialized);
	private addTilesSubject$ = new Subject();
	private resetTilesSubject$ = new Subject();
	private tileCount$: Observable<number> = PriceHelper.getTileCount$(
		this.addTilesSubject$,
		this.resetTilesSubject$,
		'PriceService'
	);
	public ticks$: Observable<PriceUpdate> = PriceHelper.getTicks$(this.tileCount$,
	                                                               'PriceService');

	constructor() {
		this.worker = new PriceWorker;
		this.initWorker();
		this.tileCount$.subscribe(lastTileCount => {
			this.lastTileCount = lastTileCount;
		});

		this.isWorkerEnabled$.subscribe((x) => {
			// console.debug('PriceService isWorkerEnabled$ = ' + x +
			//             ' lastTileCount = ' + this.lastTileCount);
			if (x) {
				this.stopTicksSubscription();
				this.startWorker(this.lastTileCount);
			} else {
				this.startTicksSubscription();
				this.stopWorker();
			}
		});
	}

	public getTilePrice$(tileId: number): Observable<PriceUpdate> {
		// console.log('PriceService getTilePrice$ tileId = ' + tileId);

		let svc = this;
		return this.isWorkerEnabled$.switchMap((x) => {
			if (x) {
				// console.debug('PriceService getTilePrice$ switching to worker');
				return svc.workerPrices$.map(msg => msg.data);
			} else {
				// console.debug('PriceService getTilePrice$ switching to non-worker');
				return svc.ticks$;
			}
		})
			.filter(tileUpdate => tileUpdate.tileId === tileId);
	}

	public addTile(tileId: number): void {
		this.addTilesSubject$.next(tileId);

		if (this.isWorkerEnabled$.getValue()) {
			// console.log('PriceService addTile to worker tileId = ' + tileId);
			this.worker.postMessage({command: 'add', params: [tileId]});
		} else {
			// console.log('PriceService addTile to in-memory tileId = ' + tileId);
		}
	}

	public resetTiles(): void {
		this.resetTilesSubject$.next();
		if (this.isWorkerEnabled$.getValue()) {
			this.worker.postMessage({command: 'reset', params: []});
		}
	}

	public startWorker(lastTileCount: number): void {
		if (!this.workerInitialized) {
			this.workerInitialized = true;
			// console.log('PriceService starting worker with tileId = ' + lastTileCount);
			this.worker.postMessage({command: 'start', params: [lastTileCount]});
		}
		else {
			// console.warn('PriceService startWorker cannot start worker since its
			// already initialized');
		}
	}

	public stopWorker(): void {
		if (this.workerInitialized) {
			// console.log('PriceService stopping worker');
			this.worker.postMessage({command: 'stop'});
			this.workerInitialized = false;
		} else {
			// console.debug('PriceService stopWorker cannot stop worker since its not
			// initialized');
		}
	}

	public toggleWorker(enable): void {
		// console.log('PriceService toggle worker = '+enable);
		this.isWorkerEnabled$.next(enable);
	}

	private initWorker(): void {
		if (!this.workerInitialized) {
			//this.worker = new Worker('../../workers/worker.js');
			this.workerPrices$ =
				Observable.fromEvent(this.worker, 'message').publish().refCount();
		} else {
			// console.warn('PriceService initWorker cannot initWorker since its already
			// initialized');
		}
	}

	private startTicksSubscription() {
		this.ticksSubscription = this.ticks$.subscribe(
			// x => console.log(x)
		);
	}

	private stopTicksSubscription() {
		if (this.ticksSubscription && this.ticksSubscription.unsubscribe) {
			this.ticksSubscription.unsubscribe();
		}
	}
}
