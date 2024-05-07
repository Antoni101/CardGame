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

player_stats = {
    health: 100,
    block: 0,
    energy: 3,
    power: 1,
    maxEnergy: 3
}

enemy_stats = {
    health: 100,
    value: 10,
    power: 10
}

function player_lose_block() {
    document.getElementById("bl").style.fontSize = "25px";
    document.getElementById("bl").style.color = "blue"
    setTimeout(function() {
        document.getElementById("bl").style.fontSize = "20px";
        document.getElementById("bl").style.color = "lightskyblue";
    },250)
}

function player_lose_energy() {
    document.getElementById("en").style.color = "red"
    setTimeout(function() {
        document.getElementById("en").style.fontSize = "15px";
        document.getElementById("en").style.color = "lightskyblue";
    },250)
}

function player_lose_hp() {
    document.getElementById("hp").style.fontSize = "26px";
    document.getElementById("hp").style.color = "red"
    setTimeout(function() {
        document.getElementById("hp").style.fontSize = "25px";
        document.getElementById("hp").style.color = "lightskyblue";
    },300)
}