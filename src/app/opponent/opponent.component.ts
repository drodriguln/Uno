import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { TricksService } from '../tricks.service';

@Component({
  selector: 'app-opponent',
  templateUrl: './opponent.component.html',
  styleUrls: ['./opponent.component.css']
})
export class OpponentComponent implements OnInit {

  hand = [];                                   //The hand object array for the opponent.
  @Input() isOpponentsTurn: boolean;           //Check if player's turn has ended.
  @Input() deck: Object[];                     //Receives deck object array from parent for dealing and drawing.
  @Input() pile: Object[];                   //Receives pile object from parent for potential use in the drawCard service.
  @Input() topCard;                            //Received topCard object to determine card plays.
  @Output() opponentDone = new EventEmitter(); //Tells the parent when the turn has finished.
  @Output() opponentWon = new EventEmitter();  //Tells the parent when the opponent has run out of cards.

  constructor(private tricks: TricksService) { }

  ngOnInit() {
    //Deal first cards from the deck to the player's hand through the Tricks service.
    this.tricks.dealCards(this.hand, this.deck);
  }

  //Checks for every change made in the program.
  ngOnChanges() {
    //If the parent has been notified the player's turn has finished.
    if (this.isOpponentsTurn) {
      //Shuffles the opponent's hand so the first valid card found is different every play.
      this.tricks.shuffleCards(this.hand);
      //Check each card in the opponent's hand for potential card plays.
      for (let i = 0; i < this.hand.length; i++) {
        //If the selected card is either a matched value or color on the top card in the pile.
        if (this.topCard.value == this.hand[i].value || this.topCard.color == this.hand[i].color) {
          //Tells the parent that the player has run out of cards, and won the match.
          if (this.hand.length == 0) {
            //Notifies the parent that the player has run out of cards, and won the match.
            this.opponentWon.emit();
          } else {
            //Delays the card placement process by one second to simulate hesitation.
            setTimeout( () => {
              //Flags and notifies the parent that the opponent's turn has ended,
              //and sends the selected card from the hand to the deck.
              this.opponentDone.emit(this.hand.splice(i, 1));
            }, 1000);
            break; //Break out of the control block to prevent multiple card plays.
          }
        }
        //If no cards in opponent's hand can be played, draw a card from the deck.
        else if (this.isOpponentsTurn && i == (this.hand.length - 1) ) {
          this.hand.push(this.tricks.drawCard(this.deck, this.pile, this.topCard));
        }
      }
    }
  }

}
