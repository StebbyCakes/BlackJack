import Deck from './deck.js'

const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 10,
    "Q": 10,
    "K": 10,
    "A": 2,
}


const CARD_COUNTING_MAP = {
    "2": 1,
    "3": 1,
    "4": 1,
    "5": 1,
    "6": 1,
    "7": 0,
    "8": 0,
    "9": 0,
    "10": -1,
    "J": -1,
    "Q": -1,
    "K": -1,
    "A": -1,
}

const dealerHandValue = document.querySelector('.dealer-hand-value')
const playerHandValue = document.querySelector('.player-hand-value')
const dealerHand = document.querySelector('.dealer-hand')
const playerHand = document.querySelector('.player-hand')
const count = document.querySelector('.count')
const startGameElement = document.querySelector('.start-game')
const hit = document.querySelector('.hit')
const stand = document.querySelector('.stand')

document.getElementById("startBtn").addEventListener('click', () => {
    
    if (stop) {
        startGame()
        return
    }

    newRound()
    playerTurn()
    startGameElement.classList.add("disabled")
    hit.classList.remove("disabled")
    stand.classList.remove("disabled")

})

document.getElementById("hitBtn").addEventListener('click', () => {
    const newPlayerCard = theDeck.pop()
    playerHand.appendChild(newPlayerCard.drawOne())
    playerCardsValue += CARD_VALUE_MAP[newPlayerCard.value]
    theCount += CARD_COUNTING_MAP[newPlayerCard.value]
    count.innerText = theCount
    playerHandValue.innerText = playerCardsValue
    checkGameOver()
    if (playerCardsValue > 21) {
        alert("You Busted")
        hiddenCard.classList.remove("hidden")
        dealerCardsValue += CARD_VALUE_MAP[dealerCards[0].value]
        theCount += CARD_COUNTING_MAP[dealerCards[0].value]
        hit.classList.add("disabled")
        stand.classList.add("disabled")
        startGameElement.classList.remove("disabled")
    } 
    return playerHandValue
    

})

document.getElementById("standBtn").addEventListener('click', () => {

    hiddenCard.classList.remove("hidden")
    dealerCardsValue += CARD_VALUE_MAP[dealerCards[0].value]
    theCount += CARD_COUNTING_MAP[dealerCards[0].value]
    dealerTurn()
    dealerHandValue.innerText = dealerCardsValue
    count.innerText = theCount
    checkBust()
    startGameElement.classList.remove("disabled")
    checkGameOver()
    hit.classList.add("disabled")
    stand.classList.add("disabled")

})




let theDeck, stop, playerCardsValue, playerCards, dealerCardsValue, dealerCards, playerBust, dealerBust, busted, firstPlayerCard, secondPlayerCard, firstDealerCard, secondDealerCard, hiddenCard, theCount, noTurn


function checkGameOver() {
    if (isGameOver(theDeck)) {
        alert("Game Over")
        stop = true
    }  
}

function checkBust() {
    if (playerCardsValue > 21) {
        playerBust = true
    } else {
        playerBust = false
    }

    if (dealerCardsValue > 21) {
        dealerBust = true
    } else {
        dealerBust = false
    }

    if (playerBust && dealerBust == true) {
        busted = true
    } else {
        busted = false
    }

    bustControl()
    
}

function bustControl() {

    if(busted == true) {
        alert("Both Players Busted")
    } else if (playerBust == true && dealerBust == false) {
        alert("You Busted")
    } else if(playerBust == false && dealerBust == true) {
         alert("The Dealer Busted")
    } else {
        checkWinner()
    }
}

function checkWinner() {
    if (isRoundWinner(playerCardsValue, dealerCardsValue)) {
        return alert("Win")
    } else if (isRoundWinner(dealerCardsValue, playerCardsValue)) {
        return alert("Lose")
    } else {
            alert("Draw")
    }
}

    
    startGame()
    function startGame() {
        newRound()
        theDeck = new Deck()
        theDeck.shuffle()
        stop = false
        busted = false
        playerBust = false
        dealerBust = false

    }


    function newRound() {
        dealerHand.innerHTML = ''
        playerHand.innerHTML = ''
        playerCardsValue = 0
        dealerCardsValue = 0
    }

    function playerTurn() {
        checkGameOver()
        firstPlayerCard = theDeck.pop()
        firstDealerCard = theDeck.pop()
        secondPlayerCard = theDeck.pop()
        secondDealerCard = theDeck.pop()
        playerCards = [firstPlayerCard, secondPlayerCard]
        dealerCards = [firstDealerCard, secondDealerCard]
        playerCardsValue = CARD_VALUE_MAP[playerCards[0].value] + CARD_VALUE_MAP[playerCards[1].value]
        dealerCardsValue = CARD_VALUE_MAP[dealerCards[1].value]
        theCount = CARD_COUNTING_MAP[playerCards[0].value] + CARD_COUNTING_MAP[playerCards[1].value] + CARD_COUNTING_MAP[dealerCards[1].value]
        playerHandValue.innerText = playerCardsValue
        dealerHandValue.innerText = dealerCardsValue
        hiddenCard = firstDealerCard.drawOne()
        hiddenCard.classList.add("hidden")
        count.innerText = theCount

        playerHand.appendChild(firstPlayerCard.drawOne())
        playerHand.appendChild(secondPlayerCard.drawOne())
        dealerHand.appendChild(hiddenCard)
        dealerHand.appendChild(secondDealerCard.drawOne())

    }

    function dealerTurn() {
        if (dealerCardsValue < 17) {
            let newDealerCard = theDeck.pop()
            dealerHand.appendChild(newDealerCard.drawOne())
            dealerCardsValue += CARD_VALUE_MAP[newDealerCard.value]
            theCount += CARD_COUNTING_MAP[newDealerCard.value]
            dealerTurn()
        }
    }


    function isRoundWinner(playerCardsValue, dealerCardsValue) {
        return playerCardsValue > dealerCardsValue
    }

    function isGameOver(deck) {
        return deck.numberOfCards === 0
    }