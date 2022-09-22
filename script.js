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
    "J" : 10,
    "Q" : 10,
    "K" : 10,
    "A" : 2,
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
    const firstPlayerCard = theDeck.pop()
    const firstDealerCard = theDeck.pop()
    const secondPlayerCard = theDeck.pop()
    const secondDealerCard = theDeck.pop()


    
    const playerCards = [firstPlayerCard, secondPlayerCard]
    const dealerCards = [firstDealerCard, secondDealerCard]

    const playerCardsValue = CARD_VALUE_MAP[playerCards[0].value] + CARD_VALUE_MAP[playerCards[1].value]
    const dealerCardsValue = CARD_VALUE_MAP[dealerCards[0].value] + CARD_VALUE_MAP[dealerCards[1].value]
     

    // console.log(playerCards[0].value)
    // console.log(playerCards)
    
 
    playerHand.appendChild(playerCards.drawOne())
    dealerHand.appendChild(dealerCards.drawOne())

    // try to appendChild to each card then put them into the hand afterwards. Maybe dont need the firstHand Function this way?

    updateDeck()

    if (isRoundWinner(playerCardsValue, dealerCardsValue)) {
        alert("Win")
        
    } else if (isRoundWinner(dealerCardsValue, playerCardsValue)){
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
    return playerCardsValue > dealerCardsValue
}

function isGameOver(deck) {
    return deck.numberOfCards === 0
}
