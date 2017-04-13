import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ChangeDetectorRef, ViewChild } from '@angular/core';
import { PlayerComponent } from './player/player.component';
import { OpponentComponent } from './opponent/opponent.component';
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
  colorClass;

  constructor(private tricks: TricksService, private cdRef:ChangeDetectorRef) { }

  @ViewChild(PlayerComponent)
  private player: PlayerComponent;

  @ViewChild(OpponentComponent)
  private opponent: OpponentComponent;

  ngOnInit() {
    this.tricks.buildDeck(this.deck);                      //Adds 84 of 108 Uno cards to deck object.
    this.tricks.shuffleCards(this.deck);                   //Shuffles items in deck object.
    this.topCard = this.tricks.drawCard(this.deck);        //Places next card in deck in the card pile.
    this.tricks.dealCards(this.player.hand, this.deck);
    this.colorClass = this.topCard.color.toLowerCase();
  }

  ngOnChanges() {
    if (this.isOpponentsTurn) {
      this.announcer = 'YOUR TURN';
    } else {
      this.announcer = 'OPPONENT\'S TURN';
    }
    if (this.opponent.hand.length == 0) {
      this.announcer = 'THE OPPONENT HAS WON THE MATCH'
    }
    if (this.player.hand.length == 0) {


    }
  }

  //Execute when player has picked a card in the player component.
  playerDone(card) {
    this.topCard = card[0];                //Make player's picked card the top card.
    this.colorClass = this.topCard.color.toLowerCase();
    this.deck.push(card[0]);
    this.tricks.shuffleCards(this.deck);
    this.isOpponentsTurn = this.tricks.determineTurn(card[0], false);
    let annObject = this.tricks.prepareAnnouncement(this.isOpponentsTurn, this.opponent.hand, this.player.hand);
    let matchWon = annObject.matchWon;
    this.announcer = annObject.text;
    if (matchWon) { this.isOpponentsTurn = !this.isOpponentsTurn; } //Prevents the next turn from occuring after a win.
    this.cdRef.detectChanges();                                     //Forces the Angular runtime to accept object changes.
  }

  //Execute when opponent has picked a card in the opponent component.
  opponentDone(card) {
    this.deck.push(this.topCard); //Move current top card into the deck.
    this.tricks.shuffleCards(this.deck); //Shuffle the edck after adding card.
    this.topCard = card[0]; //Make opponent's picked card the top card.
    this.colorClass = this.topCard.color.toLowerCase(); //Change color of pile panel according to new top card.
    this.isOpponentsTurn = this.tricks.determineTurn(card[0], true); //determine opponents turn based on who played the card and the card value.
    let annObject = this.tricks.prepareAnnouncement(this.isOpponentsTurn, this.opponent.hand, this.player.hand); //Returns {announcer text, match won?}
    let matchWon = annObject.matchWon;
    this.announcer = annObject.text;
    if (matchWon) { this.isOpponentsTurn = !this.isOpponentsTurn; } //Prevents the next turn from occuring after a win.
  }

  //Pops card from deck into the player's hand, then concats it after to push into index 0
  drawPlayerCard() {
    if (!this.isOpponentsTurn) {
      this.player.hand = [this.tricks.drawCard(this.deck)].concat(this.player.hand);
    }
  }

  //Tied to button to sort hand by color.
  sortPlayerHandColor() {
    this.player.hand = this.tricks.sortByKey(this.player.hand, 'color');
  }

  //Tied to button to sort hand by value.
  sortPlayerHandValue() {
    this.player.hand = this.tricks.sortByKey(this.player.hand, 'value');
  }

}
