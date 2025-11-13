let dealerHandValue = 0;
let playerHandValue = 0;

let dealerHand = [];
let playerHand = [];
let gameActive = false;
let revealDealerCard = false;

let deck = createDeck();

const dealerHandDiv = document.getElementById('dealer-hand');
const playerHandDiv = document.getElementById('player-hand');
const playerValueP = document.getElementById('player-value');
const dealerValueP = document.getElementById('dealer-value');


function createDeck() {
    const suits = ['H', 'D', 'C', 'S'];
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
    let deck = [];
    
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ value: value, suit: suit });
        }
    }
    
    return deck;
}

createDeck()

console.log(deck)


function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
};

console.log(shuffleDeck(deck));

function calculateHandValue(hand) {
    let value = 0;
    let aceCount = 0;

    for (let card of hand) {
        if (typeof card.value === 'number') {
            value += card.value;
        } else if (['J', 'Q', 'K'].includes(card.value)) {
            value += 10;
        } else if (card.value === 'A') {
            aceCount += 1;
            value += 11; // Initially count Ace as 11
        }
    }

    // Adjust for Aces if value exceeds 21
    while (value > 21 && aceCount > 0) {
        value -= 10; // Count one Ace as 1 instead of 11
        aceCount -= 1;
    }

    return value;
};

function updateHands() {
    const dealerHandDiv = document.getElementById('dealer-hand');
    const playerHandDiv = document.getElementById('player-hand');
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateScores() {
    dealerHandValue = calculateHandValue(dealerHand);
    playerHandValue = calculateHandValue(playerHand);
    console.log('Dealer Hand Value:', dealerHandValue);
    console.log('Player Hand Value:', playerHandValue);
};

function checkBust() {
    if (playerHandValue > 21) { 
        console.log('Player Busts!');
        revealDealerCard = true;
        renderHand();
        dealerValueP.textContent = `Dealer Value: ${calculateHandValue(dealerHand)}`;
        gameActive = false;
    }};

function renderHand() {
    if (gameActive) {
        dealerHandDiv.innerHTML = '';
dealerHand.forEach((card, index) => {
    const cardImg = document.createElement('img');

    // If it's the second card and we're not revealing yet
    if (index === 1 && !revealDealerCard) {
        cardImg.src = 'Cards/Back-2.png'; // your card back image
    } else {
        cardImg.src = `Cards/${card.value}-${card.suit}.png`;
    }

    cardImg.alt = 'Dealer card';
    cardImg.className = 'card';
    dealerHandDiv.appendChild(cardImg);
});

        playerHandDiv.innerHTML = '';
        for (let card of playerHand) {
            const cardImg = document.createElement('img');
            cardImg.src = `Cards/${card.value}-${card.suit}.png`;
            cardImg.alt = 'Player card';
            cardImg.className = 'card';
            playerHandDiv.appendChild(cardImg);
        }
    }};
    

async function startGame() {
    gameActive = true;
    deck = shuffleDeck(createDeck());
    console.log('Game Started');
    const card = deck.pop();
    dealerHand.push(card);
    await delay(500);
    renderHand();
    dealerValueP.textContent = `Dealer Value: ${calculateHandValue(dealerHand)}`;
    playerHand.push(deck.pop());
    await delay(500);
    renderHand();
    playerValueP.textContent = `Player Value: ${calculateHandValue(playerHand)}`;
    dealerHand.push(deck.pop());
    await delay(500);
    renderHand(); //to be hidden later
    playerHand.push(deck.pop());
    await delay(500);
    renderHand();
    playerValueP.textContent = `Player Value: ${calculateHandValue(playerHand)}`;
    updateHands();
    updateScores();
    console.log('Dealer Hand:', dealerHand);
    console.log('Player Hand:', playerHand);
};

function nextRound() {
    dealerHand = [];
    playerHand = [];
    playerHandValue = 0;
    dealerHandValue = 0;
    startGame();
};

const btn = document.getElementById('action');
btn.addEventListener('click', function()

{
    if (btn.textContent === 'Next Round'){
        revealDealerCard = false;
        nextRound();
        };

    
    if (btn.textContent === 'Start') {
        startGame();
        btn.textContent = 'Next Round';
    } 

    if (document.getElementById('Round-message').textContent !== '') {
        document.getElementById('Round-message').textContent = ''};

    
    
});


const hitButton = document.getElementById('hit-button');
hitButton.addEventListener('click', async function() {
    if (gameActive) {
        playerHand.push(deck.pop());
        await delay(500);
        renderHand();
        updateHands();
        updateScores();
        playerValueP.textContent = `Player Value: ${calculateHandValue(playerHand)}`;
        checkBust();
        if (!gameActive) {
            console.log('Dealer Wins!');
            const roundMessage = document.getElementById('Round-message');
            roundMessage.textContent = 'Dealer Wins!';
        }else console.log('Player hits');
        console.log('Player Hand:', playerHand);
    }
});

const stickButton = document.getElementById('stick-button');
stickButton.addEventListener('click', async function() {
    if (gameActive) {
        revealDealerCard = true;
        renderHand();
        dealerValueP.textContent = `Dealer Value: ${calculateHandValue(dealerHand)}`;
        // Dealer's turn logic here
        while (calculateHandValue(dealerHand) < 17) {
            dealerHand.push(deck.pop());
            await delay(500);
            renderHand();
            dealerValueP.textContent = `Dealer Value: ${calculateHandValue(dealerHand)}`;
        }
        updateHands();
        updateScores();
        console.log('Player sticks');
        console.log('Dealer Hand:', dealerHand);
        if (dealerHandValue > 21 || playerHandValue > dealerHandValue) {
            console.log('Player Wins!');
            const roundMessage = document.getElementById('Round-message');
            roundMessage.textContent = 'Player Wins!';
        } else if (playerHandValue < dealerHandValue) {
            console.log('Dealer Wins!');
            const roundMessage = document.getElementById('Round-message');
            roundMessage.textContent = 'Dealer Wins!';
        } else {
            console.log('Draw!');
            const roundMessage = document.getElementById('Round-message');
            roundMessage.textContent = 'Draw!';
        }
        gameActive = false;
    }
});