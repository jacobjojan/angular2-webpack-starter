import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { PriceService } from "../../home/price.service";
import { Subscription } from "rxjs";

@Component({
	selector:'self-tile',
	templateUrl: './selftile.component.html',
	styleUrls: ['./selftile.component.css']
})
export class SelfTileComponent implements OnInit, OnDestroy {
	private disposables: Subscription;
	@Input()
	public displayName: string = 'NA';
	@Input()
	public streamType: string = 'worker1';
	public currency1: string ='NA';
	public currency2: string ='NA';

	public price1: string;
	public price2: string;

	constructor(private priceService: PriceService){

	}

	ngOnInit(){
		//this.priceService.subscribePrice(this.displayName);
		console.log('start pressed');
		this.currency1 = this.displayName.split(' ')[0];
		this.currency2 = this.displayName.split(' ')[1];

		if(this.streamType === 'worker'){
			console.log('start pressed');
			this.disposables = this.priceService.getWorkerPrices$().subscribe((e:MessageEvent)=> {
				//console.log(e.data);
				this.price1 = (Math.random() * 100).toFixed(2);
				this.price2 = (Math.random() * 100).toFixed(2);

			});
		}else {
			this.disposables = this.priceService.getPrices$()
				.timeInterval()
				.subscribe((x)=> {
					this.price1 = x.interval.toString();
					this.price2 = x.value.toFixed(2);
			});
		}
	}

	ngOnDestroy(){
		this.disposables.unsubscribe();
	}


}
