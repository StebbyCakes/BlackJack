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
    "A": 11,
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
const deckCounter = document.querySelector('.deck-counter')
const oneDeck = document.querySelector('.one-deck')
const twoDeck = document.querySelector('.two-deck')

document.getElementById('one-deck').addEventListener('click', () => {
    numberOfDecks = 1
    startGame()
})

document.getElementById('two-deck').addEventListener('click' , () =>{
    numberOfDecks = 3
    startGame()
})


let numberOfDecks = 0
let theDeck, newDeckCopy, playerCardsValue, playerCards, dealerCardsValue, dealerCards, playerBust, dealerBust, firstPlayerCard, secondPlayerCard, firstDealerCard, secondDealerCard, hiddenCard, theCount, oneTime, live

function playBackroundMusic() {
    if (live == false) {
        var background = new Audio('./sounds/background.mp3')
        background.volume = 0.03
        background.play()
        live = false
    } else {
        live = true
    }
}
var fail = new Audio('./sounds/fail.mp3')
var money = new Audio('./sounds/money.mp3')
var swash = new Audio('./sounds/swash.mp3')

document.getElementById("newRound").addEventListener('click', () => {
    playBackroundMusic()
    checkGameOver()
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
    if (newPlayerCard.value == 'A' && playerCardsValue > 21) {
        playerCardsValue -= 10
    } else if (secondPlayerCard.value == 'A' && playerCardsValue > 21 && oneTime == false) {
        playerCardsValue -= 10
        oneTime = true
    }
    theCount += CARD_COUNTING_MAP[newPlayerCard.value]
    count.innerText = theCount
    playerHandValue.innerText = playerCardsValue
    getDeckLength()
    checkGameOver()
    if (playerCardsValue > 21) {
        fail.play()
        hiddenCard.classList.remove("hidden")
        dealerCardsValue += CARD_VALUE_MAP[dealerCards[0].value]
        if (dealerCards[0].value == 'A' && dealerCardsValue > 21) {
            dealerCardsValue -= 10
        }
        getDeckLength()
        theCount += CARD_COUNTING_MAP[dealerCards[0].value]
        dealerHandValue.innerText = dealerCardsValue
        count.innerText = theCount
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
    if (dealerCards[1].value == 'A' && dealerCardsValue > 21) {
        dealerCardsValue -= 10
    }
    dealerTurn()
    dealerHandValue.innerText = dealerCardsValue
    count.innerText = theCount
    getDeckLength()
    checkBust()
    checkGameOver()
    startGameElement.classList.remove("disabled")
    hit.classList.add("disabled")
    stand.classList.add("disabled")

})



function startGame() {
    newRound()
     if (numberOfDecks == 1){
        theDeck = new Deck()
        theDeck.shuffle()
    } else {
        theDeck = new Deck()
        for (let i = 0; i < numberOfDecks - 1; i++){
            newDeckCopy = new Deck()
            theDeck.cards = theDeck.cards.concat(newDeckCopy.cards)
            theDeck.shuffle()
    }
   
}


    playerBust = false
    dealerBust = false
    theCount = 0
    oneTime = false
    hit.classList.add("disabled")
    stand.classList.add("disabled")
    live = true
}


function newRound() {
    dealerHand.innerHTML = ''
    playerHand.innerHTML = ''
    playerCardsValue = 0
    dealerCardsValue = 0
    oneTime = false
}


function playerTurn() {
    firstPlayerCard = theDeck.pop()
    firstDealerCard = theDeck.pop()
    secondPlayerCard = theDeck.pop()
    secondDealerCard = theDeck.pop()
    playerCards = [firstPlayerCard, secondPlayerCard]
    dealerCards = [firstDealerCard, secondDealerCard]
    playerCardsValue = CARD_VALUE_MAP[playerCards[0].value] + CARD_VALUE_MAP[playerCards[1].value]
    dealerCardsValue = CARD_VALUE_MAP[dealerCards[1].value]
    if (firstPlayerCard.value == 'A' && playerCardsValue > 21) {
        playerCardsValue -= 10
    }
    theCount += CARD_COUNTING_MAP[playerCards[0].value] + CARD_COUNTING_MAP[playerCards[1].value] + CARD_COUNTING_MAP[dealerCards[1].value]
    playerHandValue.innerText = playerCardsValue
    dealerHandValue.innerText = dealerCardsValue
    hiddenCard = firstDealerCard.drawOne()
    hiddenCard.classList.add("hidden")
    count.innerText = theCount

    playerHand.appendChild(firstPlayerCard.drawOne())
    playerHand.appendChild(secondPlayerCard.drawOne())
    dealerHand.appendChild(hiddenCard)
    dealerHand.appendChild(secondDealerCard.drawOne())
    getDeckLength()
    checkGameOver()
}

function dealerTurn() {
    if (dealerCardsValue < 17) {
        checkGameOver()
        let newDealerCard = theDeck.pop()
        dealerHand.appendChild(newDealerCard.drawOne())
        dealerCardsValue += CARD_VALUE_MAP[newDealerCard.value]
        if(newDealerCard.value == 'A' && dealerCardsValue > 21) {
            dealerCardsValue -= 10
        }
        theCount += CARD_COUNTING_MAP[newDealerCard.value]
        getDeckLength()
        dealerTurn()
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

    bustControl()
}

function bustControl() {

    
    if (playerBust == true) {
        fail.play()
    } else if(dealerBust == true) {
         money.play()
    } else {
        checkWinner()
    }
}

function checkWinner() {
    if (isRoundWinner(playerCardsValue, dealerCardsValue)) {
        money.play()
    } else if (isRoundWinner(dealerCardsValue, playerCardsValue)) {
        fail.play()
    } else {
        swash.play()
    }
}

function isRoundWinner(playerCardsValue, dealerCardsValue) {
    return playerCardsValue > dealerCardsValue
}


function isGameOver(deck) {
    return deck.numberOfCards === 0
}

function checkGameOver() {
    if (isGameOver(theDeck)) {
        alert("Game Over")
        startGame()
    }  
}

function getDeckLength(){
    return deckCounter.innerText = theDeck.numberOfCards
}