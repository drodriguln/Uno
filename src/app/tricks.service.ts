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
  drawCard(deck: Object[]) {
    if (deck.length > 0) {
      return deck.pop();
    }
  }

  //Draw the first 7 cards from the deck.
  dealCards(cards: Object[], deck: Object[]) {
    for (let i = 1; i <= 7; i++) {
      cards.push(deck.pop()); //Add the top card of deck object to the hand.
    }
  }

  //Determines if the player or opponent's recent card play grants another turn.
  determineTurn(card, isOpponentsPlay) {
    if (isOpponentsPlay) {
      if (card.value == 'Skip') {
        return true; //'OPPONENT\'S TURN';
      } else {
        return false; //'YOUR TURN';
      }
    } else {
      if (card.value == 'Skip') {
        return false; //'YOUR TURN';
      } else {
        return true; //'OPPONENT\'S TURN';
      }
    }
  }

  prepareAnnouncement(isOpponentsTurn, opponentsHand, playersHand) {
    if (opponentsHand.length == 0) {
      return {text: 'THE OPPONENT HAS WON THE MATCH!', matchWon: true};
    } else if (playersHand.length == 0) {
      return {text: 'YOU HAVE WON THE MATCH!', matchWon: true};
    } else {
      if (isOpponentsTurn) {
        return {text: 'OPPONENT\'S TURN', matchWon: false};
      } else {
        return {text: 'YOUR TURN', matchWon: false};
      }
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

sortByKey(array, key) {

  //Need to convert 'Skip' value to 10 to allow numerical filtering,
  //then convert back to 'Skip' from 10 before returning array.

  if (key == 'color') {
    return array.sort(function(a, b) {
      var x = a.color;
      var y = b.color;
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  else if (key == 'value') {

    for (let i = 0; i < array.length; i++) {
      if (array[i].value == 'Skip') {
        array[i].value = 10;
      }
    }

    array = array.sort(function(a, b) {
      var x = a.value;
      var y = b.value;
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });

    for (let i = 0; i < array.length; i++) {
      if (array[i].value == 10) {
        array[i].value = 'Skip';
      }
    }

    return array;

  }
}

}
