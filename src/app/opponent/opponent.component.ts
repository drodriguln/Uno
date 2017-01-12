import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { TricksService } from '../tricks.service';

@Component({
    selector: 'app-opponent',
    templateUrl: './opponent.component.html',
    styleUrls: ['./opponent.component.css']
})
export class OpponentComponent implements OnInit {

    hand = [];

    @Input() isOpponentsTurn;
    @Input() pileSize;
    @Input() deck;
    @Input() topCard;
    @Output() opponentDone = new EventEmitter();

    constructor(private tricks: TricksService) { }

    ngOnInit() {
        this.tricks.dealCards(this.hand, this.deck);
    }

    ngOnChanges() {
        if ( this.isOpponentsTurn == true && (this.topCard.color != null && this.topCard.value != null) ) {
            for (let i = 0; i < this.hand.length; i++) {
                if (this.topCard.value == this.hand[i].value || this.topCard.color == this.hand[i].color) {
                    this.isOpponentsTurn = false;
                    this.opponentDone.emit(this.hand.splice(i, 1));
                    break;
                }
            }
        }
    }

}
