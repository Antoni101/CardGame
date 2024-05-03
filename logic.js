var shuffle_time;
var counter;
var canClick = true;
var shuffleSpeed = 50;
var cooldown = 250;
var cards = 5;


function playerTurn() {
    reshuffle()
    update()
}

function start() {
    for (let i = 0; i < deck.length; i++) {
        deck[i].el = document.getElementById("card" + (i + 1))
    }
    playerTurn()
}

function update() {
    if (player_stats.health <= 0) {
        alert("You Lost!")
        location.reload()
    } else if (enemy_stats.health <= 0) {
        alert("You Win!")
        location.reload();
    }
    else {
        document.getElementById("hp").innerHTML = "Health: " + player_stats.health + "/100" 
        document.getElementById("bl").innerHTML = "Block: " + player_stats.block
        document.getElementById("en").innerHTML = "Energy: " + player_stats.energy + "/2"
        document.getElementById("ehp").innerHTML = "Health: " + enemy_stats.health + "/100" 
        document.getElementById("eatk").innerHTML = "Attack: " + enemy_stats.value;
    }

    for (let i = 0; i < deck.length; i++) {
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

function clickCard(cardNum) {
    if (canClick == true && player_stats.energy > 0) {
        if (deck[cardNum].role == "other") {
            reshuffle();
        }
        else if (deck[cardNum].role ==  "erg") {
            player_stats.energy += (deck[cardNum].value + 1)
        }
        else if (deck[cardNum].role ==  "blk") {
            player_stats.block += deck[cardNum].value
        }
        else if (deck[cardNum].role ==  "atk") {
            enemy_stats.health -= deck[cardNum].value
        }
        deck[cardNum].el.style.display = "None";
        cards -= 1;
        player_stats.energy -= 1;
        update()
        if (player_stats.energy <= 0 || cards <= 0) {
            enemyTurn();
        }
    }
    else if (player_stats.energy <= 0) {
        enemyTurn()
    }
}

function enemyTurn() {
    while (player_stats.block > 0) {
        player_stats.block -= 1;
        enemy_stats.value -= 1;
    }
    if (player_stats.block <= 0 && enemy_stats.value > 0) {
        player_stats.health -= enemy_stats.value
    }
    player_stats.energy = 2;
    cards = 5;
    enemy_stats.value = Math.floor(Math.random() * enemy_stats.maxDmg);
    enemy_stats.maxDmg += 5;
    player_stats.value += 2;
    setTimeout(reshuffle(),cooldown)
}

function reshuffle() {
    for (let i = 0; i < deck.length; i++) {
        deck[i].el.style.display = "Inline-Block";
    }
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
    var randNum;
    counter -= 1;
    for (let i = 0; i < deck.length; i++) {
        randNum = randomNumByChance();
        deck[i].value = Math.floor(Math.random() * player_stats.value);
        if (deck[i].value == 0) {deck[i].value ++;} //In case it gets 0
        if (randNum == 1) { deck[i].role = "atk" }
        else if (randNum == 2) { deck[i].role = "blk" }
        else if (randNum == 3) { deck[i].role = "erg" }
        else { deck[i].role = "other" }
    }
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
}


