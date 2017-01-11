import { Component, OnInit, Input } from '@angular/core';
import { TricksService } from '../tricks.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  hand: Object[] = [];

  @Input('deck')
  deck: Object[];

  constructor(private tricks: TricksService) { }

  ngOnInit() {
    this.tricks.dealCards(this.hand, this.deck);
  }

}
