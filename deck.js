const SUITS = ["♠", "♣", "♥", "♦"]
const VALUES = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
]

export default class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards
    }

    get numberOfCards(){
        return this.cards.length
    }

    pop() {
        return this.cards.shift()
    }

    push() {
        return this.cards.push(card)
    }

    shuffle(){
        for(let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }
}

class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }

    get color(){
        return this.suit === "♠" || this.suit === "♣" ? 'black' : 'red'
    }

    firstHand() {
        const firstCard = document.createElement('div')
        const secondCard = document.createElement('div')
        firstCard.innerText = this.suit
        secondCard = this.suit
        firstCard.classList.add("card", this.color)
        secondCard.classList.add("card", this.color)
        firstCard.dataset.value = `${this.value} ${this.suit}`
        secondCard.dataset.value = `${this.value} ${this.suit}`
        return firstCard, secondCard
    }


   drawOne() {
        const cardDiv = document.createElement('div')
        cardDiv.innerText = this.suit
        cardDiv.classList.add("card", this.color)
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        return cardDiv
    }

}

function freshDeck() {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value)
    })
    })
}
