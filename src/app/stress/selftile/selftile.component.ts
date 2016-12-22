import {
	Component, Input, OnInit, OnDestroy,
	ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { PriceService } from "../price.service";
import { Subscription } from "rxjs";
import 'rxjs/add/operator/timeInterval';

@Component({
	           selector: 'self-tile',
	           templateUrl: './selftile.component.html',
	           styleUrls: ['./selftile.component.css'],
	           changeDetection: ChangeDetectionStrategy.Default
           })
export class SelfTileComponent implements OnInit, OnDestroy {
	private disposables: Subscription;
	@Input()
	public tileId: number;
	public serverTileId: number;
	@Input()
	public displayName: string = 'NA';
	@Input()
	public streamType: string = 'worker1';
	public currency1: string = 'NA';
	public currency2: string = 'NA';

	public price1: string;
	public price2: string;

	constructor(private priceService: PriceService, private cd: ChangeDetectorRef) {

	}

	ngOnInit() {
		//this.priceService.subscribePrice(this.displayName);
		console.log('start pressed for tileId = '+this.tileId);
		this.currency1 = this.displayName.split(' ')[0];
		this.currency2 = this.displayName.split(' ')[1];

		if (this.streamType === 'worker') {
			// console.log('start pressed');
			this.disposables =
				this.priceService.getWorkerPrices$()
					.subscribe((e: MessageEvent)=> {
					this.price1 = (Math.random() * 100).toFixed(2);
					this.price2 = (Math.random() * 100).toFixed(2);

				});
		} else {
			this.disposables = this.priceService.getTilePrice$(this.tileId)
				.timeInterval()
				.subscribe((x)=> {
					this.serverTileId = x.value.tileId;
					this.price1 = x.interval.toString();
					this.price2 = x.value.price;
				})
			;
		}

		//this.cd.detach();
	}

	ngOnDestroy() {
		this.disposables.unsubscribe();
	}


}
