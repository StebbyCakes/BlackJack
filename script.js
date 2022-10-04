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

let dealerHandValue = document.querySelector('.dealer-hand-value')
let playerHandValue = document.querySelector('.player-hand-value')
const dealerHand = document.querySelector('.dealer-hand')
const playerHand = document.querySelector('.player-hand')
const count = document.querySelector('.count')

document.getElementById("startBtn").addEventListener('click', () => {
    if (stop) {
        startGame()
        return
    }

    if (inRound) {
        newRound()
    } else {
        playerTurn()
    }
})

document.getElementById("hitBtn").addEventListener('click', () => {
    const newPlayerCard = theDeck.pop()
    playerHand.appendChild(newPlayerCard.drawOne())
    playerCardsValue += CARD_VALUE_MAP[newPlayerCard.value]
    playerHandValue.innerText = playerCardsValue
    return playerHandValue

})

document.getElementById("standBtn").addEventListener('click', () => {
    hiddenCard.classList.remove("hidden")
    dealerCardsValue += CARD_VALUE_MAP[dealerCards[0].value]
    dealerTurn()
    dealerHandValue.innerText = dealerCardsValue
    checkBust()

    if (isGameOver(theDeck)) {
        alert("Game Over")
        stop = true
    }    
})


let inRound, theDeck, stop, playerCardsValue, playerCards, dealerCardsValue, dealerCards, playerBust, dealerBust, busted, firstPlayerCard, secondPlayerCard, firstDealerCard, secondDealerCard, hiddenCard

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
        inRound = false
        stop = false
        busted = false
        playerBust = false
        dealerBust = false
    }


    function newRound() {
        inRound = false
        dealerHand.innerHTML = ''
        playerHand.innerHTML = ''
        count.innerText = ''
        playerCardsValue = 0
        dealerCardsValue = 0
    }

    function playerTurn() {
        inRound = true
        firstPlayerCard = theDeck.pop()
        firstDealerCard = theDeck.pop()
        secondPlayerCard = theDeck.pop()
        secondDealerCard = theDeck.pop()
        playerCards = [firstPlayerCard, secondPlayerCard]
        dealerCards = [firstDealerCard, secondDealerCard]
        playerCardsValue = CARD_VALUE_MAP[playerCards[0].value] + CARD_VALUE_MAP[playerCards[1].value]
        dealerCardsValue = CARD_VALUE_MAP[dealerCards[1].value]
        playerHandValue.innerText = playerCardsValue
        dealerHandValue.innerText = dealerCardsValue
        hiddenCard = firstDealerCard.drawOne()
        hiddenCard.classList.add("hidden")

        playerHand.appendChild(firstPlayerCard.drawOne())
        playerHand.appendChild(secondPlayerCard.drawOne())
        dealerHand.appendChild(hiddenCard)
        dealerHand.appendChild(secondDealerCard.drawOne())

        updateDeck()
    }

    function dealerTurn() {
        if (dealerCardsValue < 17) {
            let newDealerCard = theDeck.pop()
            dealerHand.appendChild(newDealerCard.drawOne())
            dealerCardsValue += CARD_VALUE_MAP[newDealerCard.value]
            dealerTurn()
        }
    }


    function updateDeck() {
        theDeck.innerHTML = theDeck.numberOfCards
    }

    function isRoundWinner(playerCardsValue, dealerCardsValue) {
        return playerCardsValue > dealerCardsValue
    }

    function isGameOver(theDeck) {
        return theDeck.numberOfCards === 0
    }