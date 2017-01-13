import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { TricksService } from './tricks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TricksService]
})

export class AppComponent {

  announcer: string = 'The game has started... Your Turn'; //Presents status of match in the view.
  isOpponentsTurn: boolean = false;            //Check if player's turn has ended.
  deck: Object[] = [];                         //The deck object array for dealing and drawing for children.
  pile: Object[] = [];                         //The card pile object where the cards are played.
  topCard: Object;                             //Initialize the card last placed in the pile object.

  constructor(private tricks: TricksService, private cdRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.tricks.buildDeck(this.deck);                      //Adds standard 108 Uno cards to deck object.
    this.tricks.shuffleCards(this.deck);                   //Shuffles items in deck object.
    this.topCard = this.tricks.getFirstTopCard(this.deck); //Places next card in deck in the card pile.
  }

  //Execute when player has picked a card in the player component.
  playerDone(card) {
    this.pile.push(card[0]);             //Take card form player's hand and place in pile.
    this.topCard = card[0];              //Make player's picked card the pile's top card.
    this.announcer = 'Opponent\'s Turn'; //Update turn status.
    this.isOpponentsTurn = true;         //Acknowledge the opponent's turn has started.
    this.cdRef.detectChanges();          //Forces the Angular runtime to accept object changes.
  }

  //Execute when opponent has picked a card in the opponent component.
  opponentDone(card) {
    this.pile.push(card[0]);      //Take card form opponent's hand and place in pile.
    this.topCard = card[0];       //Make opponent's picked card the pile's top card.
    this.announcer = 'Your Turn'; //Update turn status.
    this.isOpponentsTurn = false; //Acknowledge the opponent's turn has ended.
  }

}
