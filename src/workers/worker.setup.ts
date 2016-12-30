//https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
import { RandomPriceWorker } from './dummyPrice.worker'
import { Subscription } from "rxjs";

let disposable: Subscription;

const randomPriceWorker = new RandomPriceWorker();

onmessage = (e: MessageEvent) => {
	// console.log(
	// 	'Worker command '+ e.data.command +
	// 	(e.data.params ? ', params[0] ' + e.data.params[0] : '')
	// );

	switch (e.data.command) {
		case 'start':
			randomPriceWorker.startTicksSubscription();
			randomPriceWorker.addTiles(e.data.params[0]);
			if(disposable && disposable.unsubscribe){
				disposable.unsubscribe();
			}
			disposable = randomPriceWorker.ticks$
				// .do( x => console.log('WorkerSetup ticks$ do ' + JSON.stringify(x)))
				.subscribe(
					priceUpdate => { (<any>postMessage)(priceUpdate); }
				);
			break;
		case 'stop':
			randomPriceWorker.stopTicksSubscription();
			randomPriceWorker.resetTiles();
			if(disposable && disposable.unsubscribe){
				disposable.unsubscribe();
			}
			break;
		case 'add':
			randomPriceWorker.addTiles(e.data.params[0]);
			break;
		case 'reset':
			randomPriceWorker.resetTiles();
			break;
	}

};