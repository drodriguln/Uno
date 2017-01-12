import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TricksService } from '../tricks.service';
import { AppComponent} from '../app.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @Input() deck: Object[];
  @Output() playerDone = new EventEmitter();

  hand: Object[] = [];

  constructor(private tricks: TricksService) { }

  ngOnInit() {
    this.tricks.dealCards(this.hand, this.deck);
  }

  placeCard(index: number) {
    this.playerDone.emit(this.hand.splice(index, 1));
  }

}
