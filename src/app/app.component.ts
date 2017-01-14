import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { TricksService } from './tricks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TricksService]
})

export class AppComponent {

  announcer: string = 'THE GAME HAS STARTED... YOUR TURN'; //Presents status of match in the view.
  isOpponentsTurn: boolean = false;                        //Check if player's turn has ended.
  deck: Object[] = [];                                     //The deck object array for dealing and drawing for children.
  pile: Object[] = [];                                     //The card pile object where the cards are played.
  topCard;                                                 //Initialize the card last placed in the pile object.

  constructor(private tricks: TricksService, private cdRef:ChangeDetectorRef) { }

//WISHLIST:
// - Reshuffle deck at length = 0
// - (SEEMS TO WORK NOW?) opponent’s skip needs to work.
// - stop game at win
// - try to combine event emitters: "done" and "won"

  ngOnInit() {
    this.tricks.buildDeck(this.deck);                      //Adds 84 of 108 Uno cards to deck object.
    this.tricks.shuffleCards(this.deck);                   //Shuffles items in deck object.
    this.topCard = this.tricks.drawCard(this.deck, this.pile, this.topCard);        //Places next card in deck in the card pile.
    this.pile = [this.topCard];
  }

  specifyWildColor(color: string) {
    this.topCard.color = color;
  }

  //Execute when player has picked a card in the player component.
  playerDone(card) {
    this.pile.push(card[0]);               //Take card form player's hand and place in pile.
    this.topCard = card[0];                //Make player's picked card the pile's top card.
    if (card[0].value == 'Skip') {
      this.announcer = 'YOUR TURN';        //Resets turn status. Defensive programming.
      this.isOpponentsTurn = false;        //Player's turn has restarted.
    } else {
      this.announcer = 'OPPONENT\'S TURN'; //Update turn status.
      this.isOpponentsTurn = true;         //Acknowledge the opponent's turn has started.
    }
    this.cdRef.detectChanges();            //Forces the Angular runtime to accept object changes.
  }

  //Execute when opponent has picked a card in the opponent component.
  opponentDone(card) {
    this.pile.push(card[0]);               //Take card form opponent's hand and place in pile.
    this.topCard = card[0];                //Make opponent's picked card the pile's top card.
    if (card[0].value == 'Skip') {
      this.announcer = 'OPPONENT\'S TURN'; //Update turn status.
      this.isOpponentsTurn = true;         //Acknowledge the player's turn has started.
    } else {
      this.announcer = 'YOUR TURN';        //Update turn status.
      this.isOpponentsTurn = false;        //Acknowledge the opponent's turn has started.
    }
  }

  playerWon(e) {
    console.log('player has won');
    this.announcer = 'YOU HAVE WON THE MATCH'
  }

  opponentWon(e) {
    console.log('opponent has won');
    this.announcer = 'THE OPPONENT HAS WON THE MATCH'
  }

}
