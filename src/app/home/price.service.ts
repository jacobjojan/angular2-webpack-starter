import { Injectable } from '@angular/core';
import { Observable } from "rxjs";


@Injectable()
export class PriceService {
	randomPrices$: Observable<number>;
	currencyPairs: Array<string>;

	constructor(){
		this.currencyPairs = ['USD EUR', 'USD JPY', 'GBP USD', 'USD CAD'];

		this.randomPrices$ = Observable
				.range(1, 10000)
				.concatMap(function (x) {
					return Observable.of(x).delay(10)
				});
	}

	getPrices$() : Observable<number> {
		return this.randomPrices$;
	}
}
