import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from 'rxjs';
import { PriceService } from "../../home/price.service";
import { AppState } from "../../app.service";


@Component({
	           selector: 'self-tile-container',
	           templateUrl: './selftile-container.component.html',
	           styleUrls: ['./selftile-container.component.css']
           })
export class SelfTileContainerComponent implements OnInit, OnDestroy {

	currencyPairs: Array<string>;
	state: any = {selectedPairs: []};
	randomNumbers: Observable<number>;
	disposables: Subscription;
	selectedPairs: Array<any>;
	//state: Object;
	frequency: number = 50;

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
				                        key: 'USD EUR'
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

		/*console.log('start pressed');
		this.disposables = this.priceService.getPrices$().subscribe(()=> {
			//console.log(Math.random())
			this.state.selectedPairs.forEach(x=> {
				x.price1 = (Math.random() * 100).toFixed(2);
				x.price2 = (Math.random() * 100).toFixed(2);
			})
		});*/
	}

	public startWorker() {

		/*console.log('start pressed');
		this.disposables = this.priceService.getWorkerPrices$().subscribe((e:MessageEvent)=> {
			//console.log(e.data);
			this.state.selectedPairs.forEach(x=> {
				x.price1 = (Math.random() * 100).toFixed(2);
				x.price2 = (Math.random() * 100).toFixed(2);
			})
		});*/
	}

	stop() {
		/*if(this.disposables) {
			this.disposables.unsubscribe();
		}
		this.priceService.stopWorkerPrices();*/
	}

	addPair(selectedPair) {
		//for (let i = 0; i < 10; i++) {
		if (!selectedPair) {
			this.currencyPairs.forEach((pair)=> {
				this.state.selectedPairs.push({
					                              key: pair,
					                              streamType:'worker1'
				                              });
			});
		} else {
			this.state.selectedPairs.push({
				                              key: selectedPair,
				                              streamType:'worker1'
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

