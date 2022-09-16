import Deck from './deck.js'

const dealerHandValue = document.querySelector('.dealer-hand-value')
const playerHandValue = document.querySelector('.player-hand-value')
const hit = document.querySelector('.hit')
const stand = document.querySelector('.stand')
const dealerHand = document.querySelector('.dealer-hand')
const playerHand = document.querySelector('.player-hand')
const count = document.querySelector('.count')
const theDeck = new Deck()

let inRound

initialHand()
function initialHand() {
    inRound = true
    const playerCard = theDeck.pop()
    const computerCard = theDeck.pop()

    playerHand.appendChild(playerCard.getHTML())

}

startGame()
function startGame() {
    const deck = new Deck()
    deck.shuffle()
    inRound = false

    newRound()
}

function newRound(){
    inRound = false
    dealerHand.innerHTML = ''
    playerHand.innerHTML = ''
    count.innerHTML = ''
}
