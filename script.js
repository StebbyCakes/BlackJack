import Deck from './deck.js'

const CARD_VALUE_MAP = {
    "2" : 2,
    "3" : 3,
    "4" : 4,
    "5" : 5,
    "6" : 6,
    "7" : 7,
    "8" : 8,
    "9" : 9,
    "10" : 10,
    "J" : 11,
    "Q" : 12,
    "K" : 13,
    "A" : 14,
}

const dealerHandValue = document.querySelector('.dealer-hand-value')
const playerHandValue = document.querySelector('.player-hand-value')
const dealerHand = document.querySelector('.dealer-hand')
const playerHand = document.querySelector('.player-hand')
const count = document.querySelector('.count')

document.getElementById("hitBtn").addEventListener('click', () => {
    if (stop) {
        startGame()
        return
    }


    if(inRound) {
        newRound()
    } else {
        fullHand()
    }
})

let inRound, theDeck, stop

startGame()
function startGame() {
    theDeck = new Deck()
    theDeck.shuffle()
    console.log(theDeck)

    inRound = false
    stop = false

    newRound()
}

function newRound(){
    inRound = false
    dealerHand.innerHTML = ''
    playerHand.innerHTML = ''
    count.innerText = ''

}

fullHand()
function fullHand() {
    inRound = true
    console.log(theDeck)
    const playerCard = theDeck.pop()
    const dealerCard = theDeck.pop()
    playerHand.appendChild(playerCard.getHTML())
    dealerHand.appendChild(dealerCard.getHTML())
    // console.log(playerHand)

    // const playerValue = playerHand.CARD_VALUE_MAP
    // console.log(playerValue)

    updateDeck()

    if (isRoundWinner(playerCard, dealerCard)) {
        alert("Win")
        let playerHandValue = CARD_VALUE_MAP[playerCard.value]
        console.log(playerHandValue)
    } else if (isRoundWinner(dealerCard, playerCard)){
        alert("Lose")
    } else {
        alert("Draw")
    }

    if (isGameOver(theDeck)) {
        alert("Game Over")
        stop = true
    }

}


function updateDeck() {
    theDeck.innerHTML = theDeck.numberOfCards
}

function isRoundWinner(cardOne, cardTwo) {
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}

function isGameOver(deck) {
    return deck.numberOfCards === 0
}
