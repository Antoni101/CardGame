var shuffle_time;
var counter;
var canClick = true;
var shuffleSpeed = 50;
var cooldown = 250;
var cards = 5;

card1 = { value: 5, role: "atk", el:null  }; 
card2 = { value: 5, role: "blk", el:null  };
card3 = { value: 5, role: "atk", el:null  }; 
card4 = { value: 5, role: "atk", el:null  };
card5 = { value: 5, role: "erg", el:null  };


deck = [
    card1,
    card2,
    card3,
    card4,
    card5
];

Pstats = {
    health: 100,
    block: 0,
    energy: 2,
    value: 10
}

Estats = {
    health: 100,
    value: 10,
    maxDmg: 10
}

function start() {
    randomizeCards()
    refresh();
    update()
}

function refresh() {
    if (Pstats.health <= 0) {
        alert("You Lost!")
        location.reload();
    } else if (Estats.health <= 0) {
        alert("You Win!")
        location.reload();
    }
    else {
        document.getElementById("hp").innerHTML = "Health: " + Pstats.health + "/100" 
        document.getElementById("bl").innerHTML = "Block: " + Pstats.block
        document.getElementById("en").innerHTML = "Energy: " + Pstats.energy + "/2"
        document.getElementById("ehp").innerHTML = "Health: " + Estats.health + "/100" 
        document.getElementById("eatk").innerHTML = "Attack: " + Estats.value;
    }
}

function update() {
    for (let i = 0; i < deck.length; i++) {
        deck[i].el = document.getElementById("card" + (i + 1))
        deck[i].el.style.display = "inline-block";
        document.getElementById("card" + (i + 1)).innerHTML = deck[i].value;
        if (deck[i].role == "blk") {
            deck[i].el.style.color = "blue"
            deck[i].el.style.backgroundColor = "DarkTurquoise"
            deck[i].el.style.border = "4px solid CornflowerBlue"
        }
        else if (deck[i].role == "atk") {
            deck[i].el.style.color = "red"
            deck[i].el.style.backgroundColor = "LightCoral"
            deck[i].el.style.border = "4px solid IndianRed"
        }
        else if (deck[i].role == "erg") {
            deck[i].value = Math.floor(Math.random() * 3) + 1;
            deck[i].el.innerHTML = deck[i].value;
            deck[i].el.style.color = "Orange"
            deck[i].el.style.backgroundColor = "Gold"
            deck[i].el.style.border = "4px solid yellow"
        }
        else if (deck[i].role == "other") {
            deck[i].el.style.color = "white"
            deck[i].el.style.backgroundColor = "DarkSlateGray"
            deck[i].el.style.border = "4px solid black"
            deck[i].value = "↺";
            deck[i].el.innerHTML = deck[i].value = "↺";
        }
    }    
}

function randomNumByChance() {
    let rand = Math.random() * 100;  // Generate a random number between 0 and 100
    if (rand <= 5) { //5% Chance
        return 4;
    }
    else if (rand <= 15) { //10% Chance
        return 3;
    }
    else if (rand <= 50) { //30% Chance
        return 2;
    }
    else { //50% Chance
        return 1;
    }
}

function randomizeCards() {
    var randNum;
    for (let i = 0; i < deck.length; i++) {
        randNum = randomNumByChance();
        deck[i].value = Math.floor(Math.random() * Pstats.value);
        if (deck[i].value == 0) {deck[i].value ++;} //In case it gets 0
        if (randNum == 1) { deck[i].role = "atk" }
        else if (randNum == 2) { deck[i].role = "blk" }
        else if (randNum == 3) { deck[i].role = "erg" }
        else { deck[i].role = "other" }
    }
}

function clickCard(cardNum) {
    if (canClick == true && Pstats.energy > 0) {
        if (deck[cardNum].role == "other") {
            reshuffle();
        }
        else if (deck[cardNum].role ==  "erg") {
            Pstats.energy += (deck[cardNum].value + 1)
            refresh()
        }
        else if (deck[cardNum].role ==  "blk") {
            Pstats.block += deck[cardNum].value
            refresh()
        }
        else if (deck[cardNum].role ==  "atk") {
            Estats.health -= deck[cardNum].value
            refresh()
        }
        deck[cardNum].el.style.display = "None";
        cards -= 1;
        Pstats.energy -= 1;
        refresh()
        if (Pstats.energy <= 0 || cards <= 0) {
            enemyTurn();
        }
    }
    else if (Pstats.energy <= 0) {
        enemyTurn()
    }
}

function enemyTurn() {
    while (Pstats.block > 0) {
        Pstats.block -= 1;
        Estats.value -= 1;
    }
    if (Pstats.block <= 0 && Estats.value > 0) {
        Pstats.health -= Estats.value
    }
    Pstats.energy = 2;
    cards = 5;
    Estats.value = Math.floor(Math.random() * Estats.maxDmg);
    Estats.maxDmg += 5;
    Pstats.value += 2;
    setTimeout(reshuffle(),cooldown)
}

function reshuffle() {
    if (canClick == true) {
        counter = 25
        for (let i = 0; i < deck.length; i++) {
            document.getElementById("card" + (i + 1)).style.opacity = 0.1;
            canClick = false;
        }
        shuffle_time = setInterval(shuffle, shuffleSpeed); // Pass 'shuffle' as a reference
    }
}

function shuffle() {
    randomizeCards();
    counter -= 1;
    if (counter <= 0) {
        clearInterval(shuffle_time); // Stop the interval
        for (let i = 0; i < deck.length; i++) {
            document.getElementById("card" + (i + 1)).style.opacity = 1;
            document.getElementById("card" + (i + 1)).style.fontSize = "85px"
            setTimeout(function() {
                document.getElementById("card" + (i + 1)).style.opacity = 0.8;
                document.getElementById("card" + (i + 1)).style.fontSize = "75px"
                canClick = true;
            },cooldown)
        }
    }
    update();
    refresh()
}


