import { Component, OnInit } from '@angular/core';
import { TricksService } from './tricks.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [TricksService]
})

export class AppComponent {

  deck: Object[] = [];
  hand: Object[] = [];

    constructor(private tricks: TricksService) { }

    ngOnInit() {
        this.tricks.buildDeck(this.deck);
        this.tricks.shuffle(this.deck);
        this.tricks.dealCards(this.hand, this.deck);
    }

}
