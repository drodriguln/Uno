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
    @Input() topCard;                            //Received topCard object to determine card plays.
    @Output() opponentDone = new EventEmitter(); //Tells the parent when the turn has finished.

    constructor(private tricks: TricksService) { }

    ngOnInit() {
      //Deal first cards from the deck to the player's hand through the Tricks service.
      this.tricks.dealCards(this.hand, this.deck);
    }

    //Checks for every change made in the program.
    ngOnChanges() {
        //If the parent has been notified the player's turn has finished,
        //and a topCard has been played (avoids initialization issue).
        if ( this.isOpponentsTurn == true && (this.topCard.color != null && this.topCard.value != null) ) {
          //Shuffles the opponent's hand so the first valid card is different.
          this.tricks.shuffleCards(this.hand);
            //Check each card in the opponent's hand for potential card plays.
            for (let i = 0; i < this.hand.length; i++) {
                //If either the selected card is a matched value or color of the top card in the pile.
                if (this.topCard.value == this.hand[i].value || this.topCard.color == this.hand[i].color) {
                  //Delays the card placement process by one second to simulate hesitation.
                  setTimeout( () => {
                    //Flags and notifies the parent that the opponent's turn has ended,
                    //and sends the selected card from the hand to the deck.
                    this.isOpponentsTurn = false;
                    this.opponentDone.emit(this.hand.splice(i, 1));
                  }, 1000);
                  //Break out of the control block to avoid multiple card plays.
                  break;
                }
            }
        }
    }

}
