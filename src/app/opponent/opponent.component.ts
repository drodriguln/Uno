import { Component, OnInit, Input } from '@angular/core';
import { TricksService } from '../tricks.service';

@Component({
  selector: 'app-opponent',
  templateUrl: './opponent.component.html',
  styleUrls: ['./opponent.component.css']
})
export class OpponentComponent implements OnInit {

  hand: Object[] = [];

  @Input('deck')
  deck: Object[];

  constructor(private tricks: TricksService) { }

  ngOnInit() {
    this.tricks.dealCards(this.hand, this.deck);
  }

}
