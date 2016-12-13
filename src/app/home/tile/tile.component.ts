import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector:'tile',
	templateUrl: './tile.component.html',
	styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit{
	@Input()
	price1: number = 0;
	@Input()
	price2: number = 0;
	@Input()
	displayName: string = 'NA';
	@Input()
	currency1: string ='NA';
	@Input()
	currency2: string ='NA';

	ngOnInit(){
		//this.price = 20;
	}

}
