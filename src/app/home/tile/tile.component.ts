import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector:'tile',
	template:`<div>
                <div> Pair: {{ displayName }} </div>
				<div> Price: {{ price }} </div>
			  </div>`
})
export class TileComponent implements OnInit{
	@Input()
	price: number = 0;
	@Input()
	displayName: string = 'NA';

	ngOnInit(){
		//this.price = 20;
	}

}
