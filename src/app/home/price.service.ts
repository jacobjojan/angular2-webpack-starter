import { Injectable } from '@angular/core';
import { Observable } from "rxjs";


@Injectable()
export class PriceService {
	randomPrices$: Observable<number>;
	currencyPairs: Array<string>;
	workerPrices$: Observable<any>;
	private worker: Worker;
	private workerInitalized: boolean;

	constructor() {
		this.currencyPairs = ['USD EUR', 'USD JPY', 'GBP USD', 'USD CAD'];

		this.randomPrices$ = Observable
			.range(1, 10000)
			.concatMap(function (x) {
				return Observable.of(x).delay(50)
			});
		this.workerInitalized = false;

		this.initWorker();
	}

	getPrices$(): Observable<number> {
		return this.randomPrices$;
	}

	public getWorkerPrices$(): Observable<any> {

		this.worker.postMessage({command: 'start'});
		return this.workerPrices$
	}

	public stopWorkerPrices(): void {
		this.worker.postMessage({command: 'stop'});
	}

	private initWorker(): void {
		if (!this.workerInitalized) {
			this.worker = new Worker('../../workers/worker.js');
			this.workerPrices$ = Observable.fromEvent(this.worker, 'message');
			// `on-message` callback to receive data from worker
			/*this.worker.addEventListener('message', (e: MessageEvent) => {
			 console.log(e.data);
			 });*/
			this.workerInitalized = true;
		}
	}
}
