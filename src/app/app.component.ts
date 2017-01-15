import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { PlayerComponent } from './player/player.component';
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
  topCard;                                                 //Initialize the card last placed in the pile object.

  constructor(private tricks: TricksService, private cdRef:ChangeDetectorRef) { }

  @ViewChild(PlayerComponent)
  private player: PlayerComponent;

//WISHLIST:
// - (DONE) Remove "pile" object in favor of one face up card, and only deck object.
// - (DONE) opponent’s skip needs to work.
// - (DONE) Implement Twitter Bootstrap.
// - (DONE) Fix centering problem in view.
// - (DONE) Sort button for hand by color, value.
// - (NOPE) Autosort, and indicate what the newest-drawn cards are.
// - Fix centering for player's panel heading.
// - stop game at win
// - try to combine event emitters: "done" and "won"

  ngOnInit() {
    this.tricks.buildDeck(this.deck);                      //Adds 84 of 108 Uno cards to deck object.
    this.tricks.shuffleCards(this.deck);                   //Shuffles items in deck object.
    this.topCard = this.tricks.drawCard(this.deck);        //Places next card in deck in the card pile.
  }

  //Execute when player has picked a card in the player component.
  playerDone(card) {
    this.topCard = card[0];                //Make player's picked card the top card.
    this.deck.push(card[0]);
    this.tricks.shuffleCards(this.deck);
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
    this.topCard = card[0];                //Make opponent's picked card the top card.
    this.deck.push(card[0]);
    this.tricks.shuffleCards(this.deck);
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

  drawPlayerCard() {
    if (!this.isOpponentsTurn) {
      this.player.receiveCardFromParent();
    }
  }

  sortPlayerHand() {
    this.player.sortHand();
  }

}
