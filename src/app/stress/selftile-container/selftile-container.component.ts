import {
	Component, OnInit, OnDestroy, ChangeDetectionStrategy,
	ChangeDetectorRef, Input
} from "@angular/core";
import { Subscription } from 'rxjs';
import { PriceService } from "../price.service";
import { AppState } from "../../app.service";


@Component({
	           selector: 'self-tile-container',
	           templateUrl: './selftile-container.component.html',
	           styleUrls: ['./selftile-container.component.css'],
	           changeDetection: ChangeDetectionStrategy.OnPush
           })
export class SelfTileContainerComponent implements OnInit, OnDestroy {

	currencyPairs: Array<string>;
	state: any = {selectedPairs: []};
	disposable: Subscription;
	selectedPairs: Array<any>;
	_isWorker: boolean = false;
	private frequency: number = 50;
	private tileId: number = 0;

	@Input()
	set isWorker(isWorker:boolean) {
		console.log('isWorker setter called with '+isWorker);
		this._isWorker = isWorker;
	}

	get isWorker(): boolean {
		return this._isWorker;
	}

	constructor(private  priceService: PriceService, private appState: AppState,
	            private cd: ChangeDetectorRef) {


		this.state = this.appState.get();

		if (!this.state.hasOwnProperty('selectedPairs')) {
			this.state = {
				selectedPairs: []
			};
			this.appState.set('selectedPairs', this.state.selectedPairs);
		}

	}

	ngOnInit(): void {

		setInterval(() => {
			this.cd.markForCheck();
		}, 50);

		this.currencyPairs = ['USD EUR', 'USD JPY'];

		this.state = this.appState.get();

		if (this.state.selectedPairs.length == 0) {
			this.addPair('USD EUR');
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
	}

	public getNextTileId() {
		return ++this.tileId;
	}

	stop() {
		if (this.disposable) {
			this.disposable.unsubscribe();
		}
		this.priceService.stopWorkerPrices();
	}

	addPairs(numberToAdd) {
		for(var i=1; i<numberToAdd; i++){
			let t = this.getNewTile(this.currencyPairs[0]);
			this.state.selectedPairs.push(t);
			this.priceService.addTile(t.tileId);
		}
		this.appState.set('selectedPairs', this.state.selectedPairs);
	}

	addPair(selectedPair) {
		let t = this.getNewTile(selectedPair);
		this.state.selectedPairs.push(t);
		this.priceService.addTile(t.tileId);
		this.appState.set('selectedPairs', this.state.selectedPairs);
	}

	getNewTile(selectedPair) {
		return {
			tileId: this.getNextTileId(),
			key: selectedPair,
			streamType: this.isWorker ? 'worker' : 'rx'
		}
	}

	clearAll() {
		this.stop();
		this.state.selectedPairs = [];
		this.tileId = 0;
		this.priceService.resetTiles();
		this.appState.set('selectedPairs', this.state.selectedPairs);
	}
}

