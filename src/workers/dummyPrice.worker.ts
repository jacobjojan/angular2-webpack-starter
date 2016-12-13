//RxJS
import { Observable } from "rxjs";

export class DummyPriceWorker{
	randomPrices$: Observable<number>;
	currencyPairs:Array<string>;

	constructor(){
		this.currencyPairs = ['USD EUR', 'USD JPY', 'GBP USD', 'USD CAD'];

		this.randomPrices$ = Observable
			.range(1, 10000)
			.concatMap(function (x) {
				return Observable.of(x).delay(50)
			});
	}

	getPrices$() : Observable<number> {
		return this.randomPrices$;
	}
}