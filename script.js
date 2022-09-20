import Deck from './deck.js'

const dealerHandValue = document.querySelector('.dealer-hand-value')
const playerHandValue = document.querySelector('.player-hand-value')
const dealerHand = document.querySelector('.dealer-hand')
const playerHand = document.querySelector('.player-hand')
const count = document.querySelector('.count')

document.getElementById("hitBtn").addEventListener('click', () => {
    if(inRound) {
        newRound()
    } else {
        fullHand()
    }
})

let inRound, theDeck

startGame()
function startGame() {
    theDeck = new Deck()
    theDeck.shuffle()
    console.log(theDeck)

    inRound = false

    newRound()
}

fullHand()
function fullHand() {
    inRound = true
    console.log(theDeck)
    const playerCard = theDeck.pop()
    const computerCard = theDeck.pop()
    playerHand.appendChild(playerCard.getHTML())
    dealerHand.appendChild(computerCard.getHTML())

}

function newRound(){
    inRound = false
    dealerHand.innerHTML = ''
    playerHand.innerHTML = ''
    count.innerText = ''

    updateDeck()

}

function updateDeck() {
    theDeck.innerHTML = theDeck.numberOfCards
}