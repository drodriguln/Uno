import { Component, OnInit, Input, Output, OnChanges, EventEmitter, SimpleChange } from '@angular/core';
import { TricksService } from '../tricks.service';

@Component({
  selector: 'app-opponent',
  templateUrl: './opponent.component.html',
  styleUrls: ['./opponent.component.css']
})
export class OpponentComponent implements OnInit {

  hand = [];

  @Input() deck;
  @Input() topCard;
  @Output() opponentDone = new EventEmitter();

  constructor(private tricks: TricksService) { }

  ngOnInit() {
    this.tricks.dealCards(this.hand, this.deck);
  }

  ngOnChanges(changes: SimpleChange) {
    if (this.topCard.color != null && this.topCard.value != null) {
      for (let i = 0; i < this.hand.length; i++) {
        if (this.topCard.value == this.hand[i].value || this.topCard.color == this.hand[i].color) {
          this.opponentDone.emit(this.hand.splice(i, 1));
        }
      }
    }
  }

}
