import {
	Component,
	Input,
	OnInit,
	OnDestroy,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	NgZone
} from "@angular/core";
import { PriceService } from "../price.service";
import { Subscription } from "rxjs";
import { TileModel } from "../price.model";
import "rxjs/add/operator/timeInterval";

@Component({
	           selector: 'self-tile',
	           templateUrl: './selftile.component.html',
	           styleUrls: ['./selftile.component.css'],
	           changeDetection: ChangeDetectionStrategy.Default
           })
export class SelfTileComponent implements OnInit, OnDestroy {
	private tileSubscription: Subscription;
	@Input()
	public model: TileModel;
	public interval: number;

	constructor(private priceService: PriceService, private cd: ChangeDetectorRef,
	            private zone: NgZone) {
		cd.detach();
	}

	ngOnInit() {
		// console.log('Tile component created for tileId = ' + this.model.tileId);
		this.zone.runOutsideAngular(() => {
			this.tileSubscription = this.priceService.getTilePrice$(this.model.tileId)
				.timeInterval()
				.subscribe((x) => {
					NgZone.assertNotInAngularZone();
					this.interval = x.interval;
					this.model.updatePrice(x.value);
					this.cd.detectChanges();
				});
		});
	}

	ngOnDestroy() {
		if (this.tileSubscription && this.tileSubscription.unsubscribe) {
			this.tileSubscription.unsubscribe();
		}
	}

}
