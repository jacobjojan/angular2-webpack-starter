import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../app.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from "rxjs";

@Component(
	{
		// The selector is what angular internally uses
		// for `document.querySelectorAll(selector)` in our index.html
		// where, in this case, selector is the string 'stress'
		selector: 'stress',  // <stress></stress>
		// We need to tell Angular's Dependency Injection which providers are in
		// our app.
		providers: [],
		// Our list of styles in our component. We may add more to compose many
		// styles together
		styleUrls: ['./stress.component.css'],
		// Every Angular template is first compiled by the browser before Angular
		// runs it's compiler
		templateUrl: './stress.component.html',
		changeDetection: ChangeDetectionStrategy.OnPush
	}
)
export class StressComponent implements OnInit, OnDestroy {
	// Set our default values
	localState = {value: ''};
	sub: Subscription;
	initialQuantity: number = 0;

	constructor(public appState: AppState,
	            private route: ActivatedRoute,
	            private router: Router) {}

	ngOnInit() {
		// (+) converts string 'initialQuantity' to a number
		this.sub = this.route.queryParams.subscribe(
			(params: Params) => this.initialQuantity = +params['initialQuantity'] || 0
		);
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

	submitState(value: string) {
		console.log('submitState', value);
		this.appState.set('value', value);
		this.localState.value = '';
	}
}
