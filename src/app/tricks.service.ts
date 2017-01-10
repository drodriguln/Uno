import { Injectable } from '@angular/core';

@Injectable()
export class TricksService {

    constructor() { }

    //Shuffle cards.
    shuffle(cards) {
        for (let i = cards.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [cards[i - 1], cards[j]] = [cards[j], cards[i - 1]];
        }
    }

    //Draw the first 7 cards from the deck.
    dealCards(cards: Object[], deck: Object[]) {
      for (let i = 1; i <= 7; i++) {
        cards.push(deck.pop());
      }
    }

    //Adds 108 Uno cards to the deck object.
    buildDeck(cards: Object[]) {

      //Declare variable to store color value in the for-loop below.
      let color: string;

      //Add zero-valued cards.
      cards.push({ color: 'Red',    value: 0, file: 'red_0.png' });
      cards.push({ color: 'Yellow', value: 0, file: 'yellow_0.png' });
      cards.push({ color: 'Green',  value: 0, file: 'green_0.png' });
      cards.push({ color: 'Blue',   value: 0, file: 'blue_0.png' });

      //Add wild cards.
      for (let i = 1; i <= 4; i++) {
        cards.push({ color: 'Wild', value: 'Wild',      file: 'wild_color_changer.png' });
        cards.push({ color: 'Wild', value: 'Draw Four', file: 'wild_pick_four.png' });
      }

      //Add rest of the cards to the deck based on modulus of for-loop index.
      for (let i = 1; i <= 96; i++) {

        //Change color value after every 24 cards.
        if (i <= 24)      { color = 'Red';    }
        else if (i <= 48) { color = 'Yellow'; }
        else if (i <= 72) { color = 'Green';  }
        else if (i <= 96) { color = 'Blue';   }

        //Assign value based on modulus.
        if (i % 12 == 10) {
          cards.push({ color: color, value: 'Skip',     file: color + '_skip.png' });
        } else if (i % 12 == 11) {
          cards.push({ color: color, value: 'Reverse',  file: color + '_reverse.png' });
        } else if (i % 12 == 12) {
          cards.push({ color: color, value: 'Draw Two', file: color + '_pick_two.png' });
        } else {
          cards.push({ color: color, value: i % 12,     file: color + '_' + (i % 12) + '.png' });
        }

      }

    }

}
