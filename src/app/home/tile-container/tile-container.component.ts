import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from 'rxjs';
import { PriceService } from "../price.service";
import { AppState } from "../../app.service";


@Component({
	           selector: 'tile-container',
	           templateUrl: './tile-container.component.html',
	           styleUrls: ['./tile-container.component.css']
           })
export class TileContainerComponent implements OnInit, OnDestroy {

	currencyPairs: Array<string>;
	state: any = {selectedPairs: []};
	randomNumbers: Observable<number>;
	disposables: Subscription;
	selectedPairs: Array<any>;
	state: Object;
	frequency: number = 10;


	constructor(private  priceService: PriceService, private appState: AppState) {


		this.state = this.appState.get();

		if(!this.state.hasOwnProperty('selectedPairs')){
			this.state = {
				selectedPairs : []
			};
			this.appState.set('selectedPairs', this.state.selectedPairs);
		}

	}

	ngOnInit(): void {
		this.currencyPairs = ['USD EUR', 'USD JPY', 'GBP USD', 'USD CAD'];

		this.state = this.appState.get();

		if (this.state.selectedPairs.length == 0) {

			this.state.selectedPairs.push({
				                        key: 'USD EUR',
				                        price1: 300,
				                        price2: 300,
				                        currency1: 'USD',
				                        currency2: 'EUR',
			                        });

			this.appState.set('selectedPairs', this.state.selectedPairs);

		}
	}

	ngOnDestroy(): void {
		this.stop();
	}

	/**
	 * Function to start the price
	 */
	start() {

		console.log('start pressed');
		this.disposables = this.priceService.getPrices$().subscribe(()=> {
			//console.log(Math.random())
			this.state.selectedPairs.forEach(x=> {
				x.price1 = (Math.random() * 100).toFixed(2);
				x.price2 = (Math.random() * 100).toFixed(2);
			})
		});
	}

	stop() {
		if(this.disposables) {
			this.disposables.unsubscribe();
		}
	}

	addPair(selectedPair) {
		//for (let i = 0; i < 10; i++) {
		if (!selectedPair) {
			this.currencyPairs.forEach((pair)=> {
				this.state.selectedPairs.push({
					                              key: pair,
					                              currency1: pair.split(' ')[0],
					                              currency2: pair.split(' ')[1],
					                              price1: 0,
					                              price2: 0
				                              });
			});
		} else {
			this.state.selectedPairs.push({
				                              key: selectedPair,
				                              currency1: selectedPair.split(' ')[0],
				                              currency2: selectedPair.split(' ')[1],
				                              price1: 0,
				                              price2: 0
			                              });
		}
		this.appState.set('selectedPairs', this.state.selectedPairs);


	}

	clearAll(){
		this.stop();
		this.state.selectedPairs = [];
		this.appState.set('selectedPairs', this.state.selectedPairs);
	}

}

