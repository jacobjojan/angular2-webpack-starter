import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';



@Component({
	           selector: 'tile-container',
	           templateUrl: './tile-container.component.html',
	           styleUrls: ['./tile-container.component.css']
           })
export class TileContainerComponent implements OnInit {
	currencyPairs: Array<string>;
	state: any = {selectedPairs: []};
	randomNumbers: Observable<number>;
	disposables: Array<any> = [];
	frequency:number = 10;

	ngOnInit() {
		this.currencyPairs = ['USD EUR', 'USD JPY', 'GBP USD', 'USD CAD'];

		this.disposables = [];

		this.state.selectedPairs.push({
			                              key: 'USD EUR',
			                              price: 300
		                              });


		this.randomNumbers = Observable
			.range(1, 10000)
			.concatMap(function (x) {
				return Observable.of(x).delay(10)
			});

	}

	/**
	 * Function to start the price
	 */
	start() {

		console.log('start pressed');
		this.disposables.push(this.randomNumbers.subscribe(()=> {
			//console.log(Math.random())
			this.state.selectedPairs.forEach(x=> {
				x.price = (Math.random() * 100).toFixed(2);
			});

		}));
	}

	stop() {
		this.disposables.forEach(x=>x.dispose());
	}

	addPair() {
		for (let i = 0; i < 10; i++) {
			this.currencyPairs.forEach((pair)=> {
				this.state.selectedPairs.push({
					                              key: pair,
					                              price: 0
				                              });
			});
		}

	}

}

