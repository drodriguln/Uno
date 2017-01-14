import { Injectable } from '@angular/core';

@Injectable()
export class TricksService {

  constructor() { }

  //Shuffle passed-in cards. Algorithm borrowed from StackOverflow question #6274339.
  shuffleCards(cards) {
    for (let i = cards.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [cards[i - 1], cards[j]] = [cards[j], cards[i - 1]];
    }
  }

  //Draw first card for the pile from deck.
  drawCard(deck: Object[], pile: Object[], topCard: Object) {
    if (deck.length < 1) {
      console.log('regular - draw: ' + deck.length);
      return deck.pop(); //Return the top card of deck object.
    } else {
      pile.pop() //Remove top card.
      console.log(deck);
      deck = deck.concat(pile);
      console.log(deck);
      pile.splice(0, pile.length - 2);
      this.shuffleCards(deck);
      console.log(deck);
      console.log('out of cards - draw: new deck=' + deck.length);
      console.log('out of cards - draw: new pile=' + pile.length);
      return deck.pop();
    }
  }

  //Draw the first 7 cards from the deck.
  dealCards(cards: Object[], deck: Object[]) {
    for (let i = 1; i <= 7; i++) {
      cards.push(deck.pop()); //Add the top card of deck object to the hand.
    }
  }

  //Adds 84 Uno cards to the deck object (108 regular cards without 8 reverses, 8 draw two, 4 draw four, and 4 wild cards).
  buildDeck(cards: Object[]) {

    //Declare variable to store color value in the for-loop below.
    let color: string;

    //Add zero-valued cards.
    cards.push({ color: 'Red',    value: 0, file: 'Red_0.png' });
    cards.push({ color: 'Yellow', value: 0, file: 'Yellow_0.png' });
    cards.push({ color: 'Green',  value: 0, file: 'Green_0.png' });
    cards.push({ color: 'Blue',   value: 0, file: 'Blue_0.png' });

    /*
    //Add wild cards.
    for (let i = 1; i <= 4; i++) {
      cards.push({ color: 'Wild', value: 'Wild',      file: 'Wild_Color_Changer.png' });
      cards.push({ color: 'Wild', value: 'Draw Four', file: 'Wild_Pick_Four.png' });
    }
    */

    //Add rest of the cards to the deck based on modulus of for-loop index.
    for (let i = 1; i <= 96; i++) {

      //Change color value after every 24 cards.
      if (i <= 24)      { color = 'Red';    }
      else if (i <= 48) { color = 'Yellow'; }
      else if (i <= 72) { color = 'Green';  }
      else if (i <= 96) { color = 'Blue';   }

      //Assign value based on modulus.
      if (i % 12 == 10) {
        cards.push({ color: color, value: 'Skip',     file: color + '_Skip.png' });
      } else if (i % 12 == 11) {
        //cards.push({ color: color, value: 'Reverse',  file: color + '_Reverse.png' });
      } else if (i % 12 == 0) {
        //cards.push({ color: color, value: 'Draw Two', file: color + '_Picker.png' });
      } else {
        cards.push({ color: color, value: i % 12,     file: color + '_' + (i % 12) + '.png' });
      }

    }

  }

}
