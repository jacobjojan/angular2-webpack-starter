//https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
import { DummyPriceWorker } from './dummyPrice.worker'

let disposible;

const dummyPriceWorker = new DummyPriceWorker();


onmessage = (e: MessageEvent) => {

	//As we have only one case here...
	switch (e.data.command) {

		case 'start':
			if (!disposible) {
				disposible = dummyPriceWorker.getPrices$()
					.subscribe(price => { (<any>postMessage)(price); });
			}
			break;
		case 'stop':
			if(disposible && disposible.unsubscribe){
				disposible.unsubscribe();
			}
			break;
		case 'add':


	}
}