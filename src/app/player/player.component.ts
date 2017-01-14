import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TricksService } from '../tricks.service';
import { AppComponent} from '../app.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  hand = [];                                 //The hand object array for the player.
  @Input() isOpponentsTurn: boolean;         //Check if player's turn has ended.
  @Input() deck: Object[];                   //Receives deck object array from parent for dealing and drawing.
  @Input() topCard;                          //Received topCard object to determine card plays.
  @Output() playerDone = new EventEmitter(); //Tells the parent when the turn has finished.
  @Output() playerWon = new EventEmitter();  //Tells the parent when the player has run out of cards.

  constructor(private tricks: TricksService) { }

  ngOnInit() {
    //Deal first cards from the deck to the player's hand through the Tricks service.
    this.tricks.dealCards(this.hand, this.deck);
  }

  receiveCardFromParent() {
    //Draw a card to the player's hand.
    this.hand.push(this.tricks.drawCard(this.deck));
  }

  placeCard(i: number) {
    //Prevent player from placing any more cards during opponent's turn.
    if (!this.isOpponentsTurn) {
      //If either the selected card is a matched value or color of the top card in the pile.
      if (this.topCard.value == this.hand[i].value || this.topCard.color == this.hand[i].color) {
        //Takes the selected card from the hand.
        let selectedCard = this.hand.splice(i, 1);
        //Tells the parent that the player has run out of cards, and won the match.
        if (this.hand.length == 0) {
          //Notifies the parent that the player has run out of cards, and won the match.
          this.playerWon.emit();
        } else {
          //Notifies the parent that the opponent's turn has ended,
          //and sends the selected card from the hand to the deck.
          this.playerDone.emit(selectedCard);
        }
      }
    }
  }


}
