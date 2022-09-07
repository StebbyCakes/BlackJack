import Deck from './deck.js'

const hand = document.querySelector('.hand')

const deck = new Deck()
deck.shuffle()
console.log(deck.cards)

hand.appendChild(deck.cards[0].getHTML())