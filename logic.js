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
        document.getElementById("en").innerHTML = "Energy: " + player_stats.energy + "/" + player_stats.maxEnergy;
        document.getElementById("ehp").innerHTML = "Health: " + enemy_stats.health + "/100" 
        document.getElementById("eatk").innerHTML = "Attack: " + enemy_stats.value;
    }

    for (let i = 0; i < deck.length; i++) {
        if (deck[i].role == "blk") {
            deck[i].el.style.color = "blue"
            deck[i].el.style.backgroundColor = "DarkTurquoise"
            deck[i].el.style.border = "4px solid CornflowerBlue"
            deck[i].el.innerHTML = "🔰" + deck[i].value;
        }
        else if (deck[i].role == "atk") {
            deck[i].el.style.color = "red"
            deck[i].el.style.backgroundColor = "LightCoral"
            deck[i].el.style.border = "4px solid IndianRed"
            deck[i].value += player_stats.power;
            deck[i].el.innerHTML = "💥" + deck[i].value;
        }
        else if (deck[i].role == "str") {
            deck[i].value = Math.floor(Math.random() * 3) + 1;
            deck[i].el.style.color = "Brown"
            deck[i].el.style.backgroundColor = "DarkKhaki"
            deck[i].el.style.border = "4px solid Chocolate"
            deck[i].el.innerHTML = "💪" + deck[i].value;
        }
        else if (deck[i].role == "erg") {
            deck[i].value = Math.floor(Math.random() * 3) + 1;
            deck[i].el.style.color = "Orange"
            deck[i].el.style.backgroundColor = "Gold"
            deck[i].el.style.border = "4px solid yellow"
            deck[i].el.innerHTML = "⚡" + deck[i].value;
        }
        else if (deck[i].role == "other") {
            deck[i].el.style.color = "white"
            deck[i].el.style.backgroundColor = "DarkSlateGray"
            deck[i].el.style.border = "4px solid black"
            deck[i].value = "↪";
            deck[i].el.innerHTML = deck[i].value = "↪1";
        }
    }    
}



function clickCard(cardNum) {
    if (canClick == true && player_stats.energy > 0) {
        if (deck[cardNum].role == "other") {
            player_stats.energy -= 1;
            player_lose_energy()
            reshuffle();
        }
        else if (deck[cardNum].role ==  "erg") {
            player_stats.energy += deck[cardNum].value;
        }
        else if (deck[cardNum].role ==  "blk") {
            player_stats.block += deck[cardNum].value
            player_stats.energy -= 1;
            player_lose_energy()
        }
        else if (deck[cardNum].role ==  "str") {
            player_stats.energy -= 1;
            player_stats.power += deck[cardNum].value;
            for (let i = 0; i < deck.length; i++) {
                deck[i].el.innerHTML = "💥" + (deck[i].value + player_stats.power);
            }
            console.log("Power:"+player_stats.power)
            player_lose_energy()
        }
        else if (deck[cardNum].role ==  "atk") {
            enemy_stats.health -= deck[cardNum].value
            player_stats.energy -= 1;
            player_lose_energy()
        }
        deck[cardNum].el.style.display = "None";
        cards -= 1;
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
    let damage = enemy_stats.value;

    // Reduce block as much as possible
    if (player_stats.block > 0) {
        let blockDamage = Math.min(player_stats.block, damage);
        player_stats.block -= blockDamage;
        damage -= blockDamage;
    }

    // If damage remains after block, reduce health
    if (damage > 0) {
        player_stats.health -= damage;
    }

    // Reset player's energy and set enemy's new attack value
    player_stats.energy = player_stats.maxEnergy;
    cards = 5; // Assuming you want to reset the cards to 5 each turn
    enemy_stats.value = Math.floor(Math.random() * 11 + enemy_stats.power);
    enemy_stats.power += 1;

    // Call reshuffle after a cooldown
    setTimeout(reshuffle(), cooldown);
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

function randomNumByChance() {
    let rand = Math.random() * 100;  // Generate a random number between 0 and 100
    if (rand >= 0 && rand <= 50) {
        return 1
    }
    else if (rand <= 80) {
        return 2
    }
    else if (rand <= 90) {
        return 3
    }
    else if (rand <= 99) {
        return 4
    }
    else if (rand <= 100) {
        return 5
    }
    else {
        return 6
    }
}

function shuffle() {
    var randNum;
    counter -= 1;
    for (let i = 0; i < deck.length; i++) {
        randNum = randomNumByChance();
        deck[i].value = Math.floor(Math.random() * 11);
        if (deck[i].value == 0) {deck[i].value ++;} //In case it gets 0
        if (randNum == 1) { deck[i].role = "atk" }
        else if (randNum == 2) { deck[i].role = "blk" }
        else if (randNum == 5) { deck[i].role = "erg" }
        else if (randNum == 4) { deck[i].role = "str" }
        else if (randNum == 6) { deck[i].role = "other" }
    }
    if (counter <= 0) {
        clearInterval(shuffle_time); // Stop the interval
        for (let i = 0; i < deck.length; i++) {
            document.getElementById("card" + (i + 1)).style.opacity = 1;
            document.getElementById("card" + (i + 1)).style.fontSize = "60px"
            setTimeout(function() {
                document.getElementById("card" + (i + 1)).style.opacity = 0.8;
                document.getElementById("card" + (i + 1)).style.fontSize = "50px"
                canClick = true;
            },cooldown)
        }
    }
    update();
}


