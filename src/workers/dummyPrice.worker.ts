//RxJS
import { Observable, Subject, Subscription } from "rxjs";
import { PriceUpdate } from '../app/stress/price.model';
import { PriceHelper } from "../app/stress/price-helper";

export class RandomPriceWorker {
	private ticksSubscription: Subscription;
	private addTilesSubject$ = new Subject<number>();
	private resetTilesSubject$ = new Subject();
	private tileCount$: Observable<number> = PriceHelper.getTileCount$(
		this.addTilesSubject$,
		this.resetTilesSubject$,
		'PriceWorker'
	);
	public ticks$: Observable<PriceUpdate> = PriceHelper.getTicks$(this.tileCount$,
	                                                               'PriceWorker');

	constructor() {
		this.startTicksSubscription();
	}

	public getTilePrice$(tileId: number): Observable<PriceUpdate> {
		// console.log('PriceWorker getTilePrice$ tileId = ' + tileId);
		return this.ticks$.filter(tileUpdate => tileUpdate.tileId === tileId);
	}

	public addTiles(numTilesToAdd: number): void {
		// console.log('PriceWorker addTiles numTilesToAdd = ' + numTilesToAdd);
		this.addTilesSubject$.next(numTilesToAdd);
	}

	public addTile(tileId: number): void {
		// console.log('PriceWorker addTile tileId = ' + tileId);
		this.addTilesSubject$.next(1);
	}

	public resetTiles(): void {
		// console.log('PriceWorker resetTiles');
		this.resetTilesSubject$.next();
	}

	public startTicksSubscription() {
		this.ticksSubscription = this.ticks$.subscribe(
			// x => console.log('PriceWorker ticks$ ' + JSON.stringify(x))
		);
	}

	public stopTicksSubscription() {
		if (this.ticksSubscription && this.ticksSubscription.unsubscribe) {
			this.ticksSubscription.unsubscribe();
		}
	}

}