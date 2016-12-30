export class PriceUpdate {
	tileId: number;
	price: string;

	constructor(tileId: number, price: string) {
		this.tileId = tileId;
		this.price = price;
	}
}

export class TileModel {
	serverTileId: number;
	cross: string = 'EUR USD';
	currency1: string = 'EUR';
	currency2: string = 'USD';
	tileId: number;
	price: string = '95.11';

	constructor(tileId: number, cross: string) {
		this.tileId = tileId;
		this.cross = cross;
		this.currency1 = cross.split(' ')[0];
		this.currency2 = cross.split(' ')[1];
	}

	updatePrice(update: PriceUpdate){
		this.price = update.price;
		this.serverTileId = update.tileId;
	}
}