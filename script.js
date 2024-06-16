
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ['stick'];
//
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const currentLocation = document.querySelector('#currentLocation');
const body = document.querySelector('body')
console.log(body);
//  ##############################################
// locations objects (3 options)
const locations = [{
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: `You're in town square. You see a sign that says "store". `,
    bgImg: './Image/town.jpg'
},
{
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store !",
    bgImg: './Image/blacksmith.jpg'
},
{
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters !",
    bgImg: './Image/cave.jpg'

},
{
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster !",
    bgImg: './Image/cave.jpg'

}
    , {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: "The monster cries Arghh as he dies you gain xp and gold !",
    bgImg: './Image/cave.jpg'
}
    , {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You win the game !!!",
    bgImg: './Image/cave.jpg'
}
    , {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die !!!",
    bgImg: './Image/cave.jpg'
}
    , {
    name: "easterEgg",
    "button text": ["2", "8", "Go to town square"],
    "button functions": [pick2, pick8, goTown],
    text: "You found a secret game !",
    bgImg: './Image/cave.jpg'

}
]
// Weapons objects (3 options)
const weapons = [
    {
        name: "stick",
        power: 5,
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "battle axe",
        power: 100

    }
];
// monsters array
const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
];

//  ##############################################
// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// update function for locations

function update(location) {
    // disable monster stats
    monsterStats.style.display = "none";
    // onclick functions
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    // button text
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];



    // narrative
    text.innerText = location.text;
    // zone names
    currentLocation.innerText = location["name"];
    currentLocation.style.textTransform = "uppercase";
    currentLocation.style.fontWeight = "bold";
    // background
    body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${location.bgImg})`;




}
//  ##############################################
// location's functions
function goTown() {
    update(locations[0]);


}

function goStore() {
    update(locations[1]);
    console.log(body.style.backGroundImage);



}
function goCave() {
    update(locations[2]);

}


// actions in store
// Health
function buyHealth() {
    if (gold < 10) {
        text.innerText = "Not enough gold !"

    }
    else {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
        console.log(gold)
        console.log(health)
    }

}
// Weapons 
function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        gold.innerText = gold;
        let currentWeapon = inventory.shift();

        text.innerText = `You sold a  ${currentWeapon}`;
        text.innerText += " In your inventory you have : " + " " + inventory;
    }
    else {
        text.innerText = `You can't sell your only weapon !`;

    }

}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = `You now have a ${newWeapon},`;
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have : " + " " + inventory;
            console.log(inventory);
        }
        else { text.innerText = `You need more moula !`; }
    }
    else {
        text.innerText = `You already have the most powerful button!`;
        button2.innerText = "Sell weapon for 15 gold"
        button2.onclick = sellWeapon;
    }



}
// Monsters :
function fightSlime() {
    fighting = 0;
    goFight();




}
function fightBeast() {
    fighting = 1;
    goFight();

}

function fightDragon() {
    fighting = 2;
    goFight();

}

// fight action
function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterHealthText.innerText = monsterHealth;
    monsterNameText.innerText = monsters[fighting].name;


    monsterStats.style.display = "block";



}
// Combat functions


function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " +
        weapons[currentWeapon].name + ".";
    if (isMonsterHit()) {
        health -= getMonsterAttackValue(monsters[fighting].level);


    } else {
        text.innerText += "You miss !!"
    }

    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();


    }
    else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();


    }
    if (Math.random() <= .1 && inventory !== 1) {

        text.innerText += " Your " + inventory.pop() + " breaks !";
        currentWeapon--;


    }




}
function lose() {
    update(locations[5]);
    text.innerText = "You lost !";

}
function winGame() {
    update(locations[6])

}
function defeatMonster() {

    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}
function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";


}
function restart() {
    // reinitialise stats
    let xp = 0;
    let health = 100;
    let gold = 50;
    let currentWeapon = 0;
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
    let inventory = ['stick'];


}
function isMonsterHit() {
    return Math.random() > .2 || health < 20;

}
function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit;
}
// EasterEgg
function easterEgg() {
    update(locations[7]);
}
function pick2() {
    pick(2);



}
function pick8() {
    pick(8);


}
function pick(guess) {
    let numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));

    }
    text.innerText = "You picked " + guess + ". Here are the random numbers : \n";
    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";


    }
    if (numbers.indexOf(guess) !== -1) {
        text.innerText += "Right! You win 20 gold!"
        gold += 20;
        goldText.innerText = gold;


    }
    else {
        text.innerText += "Wrong! You lose 10 health!"
        health -= 10;
        healthText.innerText = health;
        if (health <= 0) {
            lose();
        }
    }
}
