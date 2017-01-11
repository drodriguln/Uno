import { Component, OnInit, Input } from '@angular/core';
import { TricksService } from './tricks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TricksService]
})

export class AppComponent {

  deck: Object[] = [];
  pile: Object[] = [];
  topCard: Object = {color: null, value: null, file: 'card_back.png'};

  constructor(private tricks: TricksService) { }

  ngOnInit() {
    this.tricks.buildDeck(this.deck);
    this.tricks.shuffle(this.deck);
  }

  addToPile(card) {
    this.pile.push(card[0]);
    this.topCard = card[0];
  }

}
