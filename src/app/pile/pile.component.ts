import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pile',
  templateUrl: './pile.component.html',
  styleUrls: ['./pile.component.css']
})

export class PileComponent {

  @Input() topCard: Object;
  @Input() pileSize: number;

  constructor() { }

}
