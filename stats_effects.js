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
    energy: 2,
    value: 10
}

enemy_stats = {
    health: 100,
    value: 10,
    maxDmg: 10
}

playerEffects() {
    document.getElementById("hp").style.fontSize = "50px";
}