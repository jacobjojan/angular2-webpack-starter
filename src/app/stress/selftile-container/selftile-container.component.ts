import {
	Component,
	OnDestroy,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Input,
	NgZone,
	OnInit,
	AfterViewInit
} from "@angular/core";
import { PriceService } from "../price.service";
import { AppState } from "../../app.service";
import { TileModel } from "../price.model";

@Component({
	           selector: 'self-tile-container',
	           templateUrl: './selftile-container.component.html',
	           styleUrls: ['./selftile-container.component.css'],
	           changeDetection: ChangeDetectionStrategy.OnPush
           })
export class SelfTileContainerComponent implements OnInit, AfterViewInit, OnDestroy {
	@Input()
	initialQuantity: number = 0;
	initTime: number = 0;
	currencyPairs: Array<string>;
	state: any = {selectedPairs: Array<TileModel>()};
	selectedPairs: Array<any>;
	_isWorker: boolean = false;
	public frequency: number = 50;
	private tileId: number = 0;

	constructor(private priceService: PriceService,
	            private appState: AppState,
	            private cd: ChangeDetectorRef,
	            private zone: NgZone) {

		this.state = this.appState.get();
		if (!this.state.hasOwnProperty('selectedPairs')) {
			this.state = {
				selectedPairs: Array<TileModel>()
			};
			this.appState.set('selectedPairs', this.state.selectedPairs);
		}
		this.currencyPairs = ['EUR USD', 'CAD AUD'];
		this.state = this.appState.get();
	}

	@Input()
	set isWorker(isWorker: boolean) {
		// console.log('isWorker setter called with ' + isWorker);
		this.clearAll();
		this._isWorker = isWorker;
		this.priceService.toggleWorker(isWorker);
	}

	get isWorker(): boolean {
		return this._isWorker;
	}

	tileIdTrackFn(index: number, tile: TileModel): number {
		return tile.tileId;
	}

	ngOnInit(): void {
		console.log('SelfTile Container initial quantity = ' + this.initialQuantity);
		this.initTime = window.performance.now();
		this.addPairs(this.initialQuantity);

		//// Change proposed by google
		// this.cd.detach();
		// this.zone.runOutsideAngular(() => {
		// 	setInterval(() => {
		// 		this.cd.markForCheck();
		// 		this.cd.detectChanges();
		// 	}, 50);
		// });
	}

	ngAfterViewInit(): void {
		let loadTime = (window.performance.now() - this.initTime);
		console.log('load time = ' + loadTime + ' ms');
	}

	ngOnDestroy(): void {
		this.clearAll();
	}

	public getNextTileId() {
		return ++this.tileId;
	}

	addPairs(numberToAdd) {
		if (numberToAdd < 1) {
			return;
		}
		let maxTileId = 0;
		for (let i = 0; i < numberToAdd; i++) {
			let t: TileModel = this.getNewTile(this.currencyPairs[0]);
			this.state.selectedPairs.push(t);
			if (i === numberToAdd - 1) {
				maxTileId = t.tileId;
			}
		}
		this.appState.set('selectedPairs', this.state.selectedPairs);
		setTimeout(() => (this.priceService.addTile(maxTileId)), 0);
	}

	addPair(selectedPair) {
		let t: TileModel = this.getNewTile(selectedPair);
		this.state.selectedPairs.push(t);
		this.priceService.addTile(t.tileId);
		this.appState.set('selectedPairs', this.state.selectedPairs);
	}

	getNewTile(selectedPair): TileModel {
		return new TileModel(this.getNextTileId(), selectedPair);
	}

	clearAll() {
		this.state.selectedPairs = Array<TileModel>();
		this.tileId = 0;
		this.priceService.resetTiles();
		this.appState.set('selectedPairs', this.state.selectedPairs);
	}
}

