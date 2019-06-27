/* Game Description

Battle against the monster. 


The object is to defeat the opponent by rolling higher than them.

The difference between the attack die and the defense die is the damage dealt.

The first player to deal 20 dmg wins.
*/

//Playing the Game
// Each player starts with 20 hp.
// Dice roll to see who goes first.
// Assuming player goes first.
// Player rolls an attack die. 
// Then the monster rolls a defense die.
// If you are successful at defending the difference accumulates as Special Power.
// Special Powers are revealed as your SP accumulates.
// Evade (2 defense dice ) Cost: 6, Focus (2 attack dice) cost: 6, Heal Cost: 4(restore d6 HP), IronSkin (3 defense dice) cost: 8, Fireball (3 Attack dice) cost: 8

const SIDES = 6;
const FOCUS = 2;
const HEAL = 2;
const FIRE = 3;
const DIAMOND = 3;
//rolls[0] for player 0 and rolls[1] for player 1
let rolls = [[],[]];
let hitPoints = [ 20, 20];
let specialPoints = [0, 0];
let attackingPlayer = 0;
//  defending player is always the opposite of the attacking player
let defendingPlayer = (attackingPlayer === 0) ? 1 : 0;

let player1DiceNode, player2DiceNode, logDisplay;

let attackButtons = document.querySelectorAll(".attack-button");
let focusButtons = document.querySelectorAll(".attack-button-focus");
let defendButtons = document.querySelectorAll(".defend-button");
let diamondButtons = document.querySelectorAll(".defend-button-diamond");
let healButtons = document.querySelectorAll(".spell-button-heal");
let fireButtons = document.querySelectorAll(".spell-button-fire");
let allButtons = {
    attackButtons: attackButtons,
    focusButtons: focusButtons,
    defendButtons: defendButtons,
    diamondButtons: diamondButtons,
    healButtons: healButtons,
    fireButtons: fireButtons
};


function rollDice(numDice, sides) {
    let diceArray = [];
    for (let i = 0; i < numDice; i++) {
        let dice = Math.floor(Math.random() * sides) +1;
        diceArray.push(dice);
    }
    return diceArray;
}

function sumDice(diceArray) {
    let numDice = diceArray.length;
    let diceTotal = 0;
    for (let i =0; i < numDice; i++) {
        diceTotal += diceArray[i];
    }
    return diceTotal;
 }


 function resolveAttack() {
   return sumDice(rolls[attackingPlayer]) - sumDice(rolls[defendingPlayer]);
 }


function hideAllOptions(allButtons) {
    //AllButtons is an object with node lists of the types of interactive buttons. 
    //the following for loop sets each display value to none
    //which hides all of the buttons.
    for (const property in allButtons) {
        if (allButtons.hasOwnProperty(property)) {
                for (let x=0; x< allButtons[property].length; x++) {
                allButtons[property][x].parentNode.style.display = 'none';
            }
        }
    }
}


function convertNumberToText(num) {
    switch(num) {
        case 1:
            return "one";
        case 2:
            return "two";
        case 3:
            return "three";
        case 4:
            return "four";
        case 5:
            return "five";
        case 6:
            return "six";
        default:
            return "one";
    }
}


function init() {
    // remove active class from Player 1 
    document.querySelector('.player-0-name').classList.remove('active');
    document.querySelector('.player-1-name').classList.remove('active');
    
    // bind all event listeners
   

    allButtons.attackButtons[0].addEventListener("click", function() {
        rolls[0] = rollDice(1,SIDES);
        //console.log("Player 1 Attack Roll", rolls[0]);
        let testNode = document.createElement("p");
        testNode.appendChild(document.createTextNode("Player 1 Attacks for "));
        for (let i = 0; i < rolls[0].length; i++) {
            // convert roll to text
            let diceString = convertNumberToText(rolls[0][i]);
            //<i class="fas fa-dice-one"></i>
            let newDiceIcon = document.createElement("i");
            newDiceIcon.className = `fas fa-dice-${diceString}`;
            testNode.appendChild(newDiceIcon);
        }
        testNode.appendChild(document.createTextNode("(" + sumDice(rolls[0]) + ")"));
        logDisplay.insertBefore(testNode, logDisplay.firstChild);
        //begin defend phase
        hideAllOptions(allButtons);
        defendPhase();

    });

    allButtons.attackButtons[1].addEventListener("click", function() {
        rolls[1] = rollDice(1,SIDES);
        //console.log("Player 2 Attack Roll", rolls[1]);
        let testNode = document.createElement("p");
        testNode.appendChild(document.createTextNode("Player 2 Attacks for "));
        for (let i = 0; i < rolls[1].length; i++) {
            // convert roll to text
            let diceString = convertNumberToText(rolls[1][i]);
            //<i class="fas fa-dice-one"></i>
            let newDiceIcon = document.createElement("i");
            newDiceIcon.className = `fas fa-dice-${diceString}`;
            testNode.appendChild(newDiceIcon);
        }
        testNode.appendChild(document.createTextNode("(" + sumDice(rolls[1]) + ")"));
        logDisplay.insertBefore(testNode, logDisplay.firstChild);
        //begin defend phase
        hideAllOptions(allButtons);
        defendPhase();
    });

    allButtons.focusButtons[0].addEventListener("click", function() {
        rolls[0] = rollDice(FOCUS,SIDES);
        //console.log("Player 2 Attack Roll", rolls[1]);
        let logNode = document.createElement("p");
        logNode.appendChild(document.createTextNode("Player 1 Attacks with Focus for "));
        for (let i = 0; i < rolls[0].length; i++) {
            // convert roll to text
            let diceString = convertNumberToText(rolls[0][i]);
            //<i class="fas fa-dice-one"></i>
            let newDiceIcon = document.createElement("i");
            newDiceIcon.className = `fas fa-dice-${diceString}`;
            logNode.appendChild(newDiceIcon);
        }
        logNode.appendChild(document.createTextNode("(" + sumDice(rolls[0]) + ")"));
        logDisplay.insertBefore(logNode, logDisplay.firstChild);
        //begin defend phase
        hideAllOptions(allButtons);
        defendPhase();
    });

    allButtons.focusButtons[1].addEventListener("click", function() {
        rolls[1] = rollDice(FOCUS,SIDES);
        //console.log("Player 2 Attack Roll", rolls[1]);
        let logNode = document.createElement("p");
        logNode.appendChild(document.createTextNode("Player 2 Attacks with Focus for "));
        for (let i = 0; i < rolls[1].length; i++) {
            // convert roll to text
            let diceString = convertNumberToText(rolls[1][i]);
            //<i class="fas fa-dice-one"></i>
            let newDiceIcon = document.createElement("i");
            newDiceIcon.className = `fas fa-dice-${diceString}`;
            logNode.appendChild(newDiceIcon);
        }
        logNode.appendChild(document.createTextNode("(" + sumDice(rolls[1]) + ")"));
        logDisplay.insertBefore(logNode, logDisplay.firstChild);
        //begin defend phase
        hideAllOptions(allButtons);
        defendPhase();
    });


//    let defendButtons = document.querySelectorAll(".defend-button");
    allButtons.defendButtons[0].addEventListener("click", function() {
        //console.log("Player 1 Defend", defendingPlayer);
        rolls[0] = rollDice(1,SIDES);
        //console.log("Player 1 Defend", rolls[0]);
        let testNode = document.createElement("p");
        testNode.appendChild(document.createTextNode("Player 1 Defends with "));
        let diceContainer = document.querySelector(".player-0-dice");
        for (let i = 0; i < rolls[0].length; i++) {
            // convert roll to text
            let diceString = convertNumberToText(rolls[0][i]);
            let newDiceIcon = document.createElement("i");
            newDiceIcon.className = `fas fa-dice-${diceString}`;
            testNode.appendChild(newDiceIcon);
        }

        testNode.appendChild(document.createTextNode("(" + sumDice(rolls[0]) + ")"));
        // when defend button clicked display dice
        logDisplay.insertBefore(testNode, logDisplay.firstChild);
        result = resolveAttack();
        //console.log("result", result);
        let resultText = document.createElement("p");
        if (result !== 0) {
            if (result >= 1) {
                // if Attack > Defend then 
                //// subtract HP from Defending Player
                hitPoints[0] -= result;
                document.querySelector(".player-0-health").textContent = hitPoints[0];

                resultText.appendChild(document.createTextNode(`Player 2 damages Player 1 for ${result} damage.`));
                logDisplay.insertBefore(resultText, logDisplay.firstChild);

            } else {
                // if Attack < Defend then 
                //// add SP to Defending player
                specialPoints[0] += Math.abs(result);
                document.querySelector(".player-0-special").textContent = specialPoints[0];

                resultText.appendChild(document.createTextNode(`Player 1 gains ${Math.abs(result)} Special Points`));
                logDisplay.insertBefore(resultText, logDisplay.firstChild);
            }
        } else {
            resultText.appendChild(document.createTextNode("Player 1 is unscathed."));
            logDisplay.insertBefore(resultText, logDisplay.firstChild);
        }
        if (hitPoints[0] <= 0) {
            hideAllOptions(allButtons);
            resultText = document.createElement("p");
            resultText.appendChild(document.createTextNode("GAME OVER - Player 1 has been slain."));
            logDisplay.insertBefore(resultText, logDisplay.firstChild);
            return;
        }
        //// check if HP < 1
        ////// end game 
        //// else next round
        alternateAttackingPlayer();
        hideAllOptions(allButtons);
        attackPhase();
    });

    allButtons.defendButtons[1].addEventListener("click", function() {
        rolls[1] = rollDice(1,SIDES);
        //console.log("Player 2 Defend", rolls[1]);
        let testNode = document.createElement("p");
        testNode.appendChild(document.createTextNode("Player 2 Defends with "));
        let diceContainer = document.querySelector(".player-1-dice");
        for (let i = 0; i < rolls[1].length; i++) {
            // convert roll to text
            let diceString = convertNumberToText(rolls[1][i]);
            //<i class="fas fa-dice-one"></i>
            let newDiceIcon = document.createElement("i");
            newDiceIcon.className = `fas fa-dice-${diceString}`;
            testNode.appendChild(newDiceIcon);
        }

        testNode.appendChild(document.createTextNode("(" + sumDice(rolls[1]) + ")"));
        // when defend button clicked display dice
        logDisplay.insertBefore(testNode, logDisplay.firstChild);
        result = resolveAttack();
        //console.log("result", result);
        let resultText = document.createElement("p");
        if (result !== 0) {
            if (result >= 1) {
                // if Attack > Defend then 
                //// subtract HP from Defending Player
                hitPoints[1] -= result;
                document.querySelector(".player-1-health").textContent = hitPoints[1];

                resultText.appendChild(document.createTextNode(`Player 1 damages Player 2 for ${result} damage.`));
                logDisplay.insertBefore(resultText, logDisplay.firstChild);

            } else {
                // if Attack < Defend then 
                //// add SP to Defending player
                specialPoints[1] += Math.abs(result);
                document.querySelector(".player-1-special").textContent = specialPoints[1];

                resultText.appendChild(document.createTextNode(`Player 2 gains ${Math.abs(result)} Special Points`));
                logDisplay.insertBefore(resultText, logDisplay.firstChild);
            }
        } else {
            //console.log("Player 2 is unscathed.")
            resultText.appendChild(document.createTextNode("Player 2 is unscathed."));
            logDisplay.insertBefore(resultText, logDisplay.firstChild);
        }
        if (hitPoints[1] <= 0) {
            hideAllOptions(allButtons);
            resultText = document.createElement("p");
            resultText.appendChild(document.createTextNode("GAME OVER - Player 2 has been slain."));
            logDisplay.insertBefore(resultText, logDisplay.firstChild);
            return;
        }
        //// check if HP < 1
        ////// end game 
        //// else next round
        alternateAttackingPlayer();
        hideAllOptions(allButtons);
        attackPhase();
    });

    allButtons.diamondButtons[0].addEventListener("click", function() {
        specialPoints[0] -= 4;
        document.querySelector(".player-0-special").textContent = specialPoints[0];
        //console.log("Player 1 Defend", defendingPlayer);
        rolls[0] = rollDice(DIAMOND,SIDES);
        //console.log("Player 1 Defend", rolls[0]);
        let testNode = document.createElement("p");
        testNode.appendChild(document.createTextNode("Player 1 defends with Diamond Skin for "));
        let diceContainer = document.querySelector(".player-0-dice");
        for (let i = 0; i < rolls[0].length; i++) {
            // convert roll to text
            let diceString = convertNumberToText(rolls[0][i]);
            let newDiceIcon = document.createElement("i");
            newDiceIcon.className = `fas fa-dice-${diceString}`;
            testNode.appendChild(newDiceIcon);
        }

        testNode.appendChild(document.createTextNode("(" + sumDice(rolls[0]) + ")"));
        // when defend button clicked display dice
        logDisplay.insertBefore(testNode, logDisplay.firstChild);
        result = resolveAttack();
        //console.log("result", result);
        let resultText = document.createElement("p");
        if (result !== 0) {
            if (result >= 1) {
                // if Attack > Defend then 
                //// subtract HP from Defending Player
                hitPoints[0] -= result;
                document.querySelector(".player-0-health").textContent = hitPoints[0];

                resultText.appendChild(document.createTextNode(`Player 2 damages Player 1 for ${result} damage.`));
                logDisplay.insertBefore(resultText, logDisplay.firstChild);

            } else {
                // if Attack < Defend then 
                //// add SP to Defending player
                specialPoints[0] += Math.abs(result);
                document.querySelector(".player-0-special").textContent = specialPoints[0];

                resultText.appendChild(document.createTextNode(`Player 1 gains ${Math.abs(result)} Special Points`));
                logDisplay.insertBefore(resultText, logDisplay.firstChild);
            }
        } else {
            resultText.appendChild(document.createTextNode("Player 1 is unscathed."));
            logDisplay.insertBefore(resultText, logDisplay.firstChild);
        }
        if (hitPoints[0] <= 0) {
            hideAllOptions(allButtons);
            resultText = document.createElement("p");
            resultText.appendChild(document.createTextNode("GAME OVER - Player 1 has been slain."));
            logDisplay.insertBefore(resultText, logDisplay.firstChild);
            return;
        }
        //// check if HP < 1
        ////// end game 
        //// else next round
        alternateAttackingPlayer();
        hideAllOptions(allButtons);
        attackPhase();
    });

    allButtons.diamondButtons[1].addEventListener("click", function() {
        specialPoints[1] -= 4;
        document.querySelector(".player-1-special").textContent = specialPoints[1];
        //console.log("Player 2 Defend", defendingPlayer);
        rolls[1] = rollDice(DIAMOND,SIDES);
        //console.log("Player 2 Defend", rolls[0]);
        let testNode = document.createElement("p");
        testNode.appendChild(document.createTextNode("Player 2 defends with Diamond Skin for "));
        let diceContainer = document.querySelector(".player-1-dice");
        for (let i = 0; i < rolls[1].length; i++) {
            // convert roll to text
            let diceString = convertNumberToText(rolls[1][i]);
            let newDiceIcon = document.createElement("i");
            newDiceIcon.className = `fas fa-dice-${diceString}`;
            testNode.appendChild(newDiceIcon);
        }

        testNode.appendChild(document.createTextNode("(" + sumDice(rolls[1]) + ")"));
        // when defend button clicked display dice
        logDisplay.insertBefore(testNode, logDisplay.firstChild);
        result = resolveAttack();
        //console.log("result", result);
        let resultText = document.createElement("p");
        if (result !== 0) {
            if (result >= 1) {
                // if Attack > Defend then 
                //// subtract HP from Defending Player
                hitPoints[1] -= result;
                document.querySelector(".player-1-health").textContent = hitPoints[1];

                resultText.appendChild(document.createTextNode(`Player 1 damages Player 2 for ${result} damage.`));
                logDisplay.insertBefore(resultText, logDisplay.firstChild);

            } else {
                // if Attack < Defend then 
                //// add SP to Defending player
                specialPoints[1] += Math.abs(result);
                document.querySelector(".player-1-special").textContent = specialPoints[1];

                resultText.appendChild(document.createTextNode(`Player 2 gains ${Math.abs(result)} Special Points`));
                logDisplay.insertBefore(resultText, logDisplay.firstChild);
            }
        } else {
            resultText.appendChild(document.createTextNode("Player 2 is unscathed."));
            logDisplay.insertBefore(resultText, logDisplay.firstChild);
        }
        if (hitPoints[1] <= 0) {
            hideAllOptions(allButtons);
            resultText = document.createElement("p");
            resultText.appendChild(document.createTextNode("GAME OVER - Player 2 has been slain."));
            logDisplay.insertBefore(resultText, logDisplay.firstChild);
            return;
        }
        //// check if HP < 1
        ////// end game 
        //// else next round
        alternateAttackingPlayer();
        hideAllOptions(allButtons);
        attackPhase();
    });

    allButtons.healButtons[0].addEventListener("click", function() {
        specialPoints[0] -= 2;
        document.querySelector(".player-0-special").textContent = specialPoints[0];
        //console.log("Player 1 Defend", defendingPlayer);
        rolls[0] = rollDice(HEAL,SIDES);
        //console.log("Player 1 Defend", rolls[0]);
        let testNode = document.createElement("p");
        testNode.appendChild(document.createTextNode("Player 1 casts Heal for "));
        let diceContainer = document.querySelector(".player-0-dice");
        for (let i = 0; i < rolls[0].length; i++) {
            // convert roll to text
            let diceString = convertNumberToText(rolls[0][i]);
            let newDiceIcon = document.createElement("i");
            newDiceIcon.className = `fas fa-dice-${diceString}`;
            testNode.appendChild(newDiceIcon);
        }

        testNode.appendChild(document.createTextNode("(" + sumDice(rolls[0]) + ")"));
        // when defend button clicked display dice
        logDisplay.insertBefore(testNode, logDisplay.firstChild);
        result = resolveAttack();
        //console.log("result", result);
        let resultText = document.createElement("p");
        if (result !== 0) {
            if (result >= 1) {
                // if Attack > Defend then 
                //// subtract HP from Defending Player
                hitPoints[0] -= result;
                document.querySelector(".player-0-health").textContent = hitPoints[0];

                resultText.appendChild(document.createTextNode(`Player 1 fails to cast heal and suffers ${result} damage.`));
                logDisplay.insertBefore(resultText, logDisplay.firstChild);

            } else {
                // if Attack < Defend then 
                //// add SP to Defending player
                hitPoints[0] += Math.abs(result);
                document.querySelector(".player-0-health").textContent = hitPoints[0];

                resultText.appendChild(document.createTextNode(`Player 1 heals for ${Math.abs(result)}.`));
                logDisplay.insertBefore(resultText, logDisplay.firstChild);
            }
        } else {
            resultText.appendChild(document.createTextNode("Player 1 casts Heal and nullifies the damage dealt by Player 2."));
            logDisplay.insertBefore(resultText, logDisplay.firstChild);
        }
        if (hitPoints[0] <= 0) {
            hideAllOptions(allButtons);
            resultText = document.createElement("p");
            resultText.appendChild(document.createTextNode("GAME OVER - Player 1 has been slain."));
            logDisplay.insertBefore(resultText, logDisplay.firstChild);
            return;
        }
        //// check if HP < 1
        ////// end game 
        //// else next round
        alternateAttackingPlayer();
        hideAllOptions(allButtons);
        attackPhase();
    });

    allButtons.healButtons[1].addEventListener("click", function() {
        specialPoints[1] -= 2;
        document.querySelector(".player-0-special").textContent = specialPoints[1];
        //console.log("Player 1 Defend", defendingPlayer);
        rolls[1] = rollDice(HEAL,SIDES);
        //console.log("Player 1 Defend", rolls[0]);
        let testNode = document.createElement("p");
        testNode.appendChild(document.createTextNode("Player 2 casts Heal for "));
        let diceContainer = document.querySelector(".player-1-dice");
        for (let i = 0; i < rolls[1].length; i++) {
            // convert roll to text
            let diceString = convertNumberToText(rolls[1][i]);
            let newDiceIcon = document.createElement("i");
            newDiceIcon.className = `fas fa-dice-${diceString}`;
            testNode.appendChild(newDiceIcon);
        }

        testNode.appendChild(document.createTextNode("(" + sumDice(rolls[1]) + ")"));
        // when defend button clicked display dice
        logDisplay.insertBefore(testNode, logDisplay.firstChild);
        result = resolveAttack();
        //console.log("result", result);
        let resultText = document.createElement("p");
        if (result !== 0) {
            if (result >= 1) {
                // if Attack > Defend then 
                //// subtract HP from Defending Player
                hitPoints[1] -= result;
                document.querySelector(".player-1-health").textContent = hitPoints[1];

                resultText.appendChild(document.createTextNode(`Player 2 fails to cast heal and suffers ${result} damage.`));
                logDisplay.insertBefore(resultText, logDisplay.firstChild);

            } else {
                // if Attack < Defend then 
                //// add SP to Defending player
                hitPoints[1] += Math.abs(result);
                document.querySelector(".player-1-health").textContent = hitPoints[1];

                resultText.appendChild(document.createTextNode(`Player 2 heals for ${Math.abs(result)}.`));
                logDisplay.insertBefore(resultText, logDisplay.firstChild);
            }
        } else {
            resultText.appendChild(document.createTextNode("Player 2 casts Heal and nullifies the damage dealt by Player 1."));
            logDisplay.insertBefore(resultText, logDisplay.firstChild);
        }
        if (hitPoints[1] <= 0) {
            hideAllOptions(allButtons);
            resultText = document.createElement("p");
            resultText.appendChild(document.createTextNode("GAME OVER - Player 2 has been slain."));
            logDisplay.insertBefore(resultText, logDisplay.firstChild);
            return;
        }
        //// check if HP < 1
        ////// end game 
        //// else next round
        alternateAttackingPlayer();
        hideAllOptions(allButtons);
        attackPhase();
    });

    allButtons.fireButtons[0].addEventListener("click", function() {
        rolls[0] = rollDice(FIRE,SIDES);
        //console.log("Player 2 Attack Roll", rolls[1]);
        let logNode = document.createElement("p");
        logNode.appendChild(document.createTextNode("Player 1 Casts Fire for "));
        for (let i = 0; i < rolls[0].length; i++) {
            // convert roll to text
            let diceString = convertNumberToText(rolls[0][i]);
            //<i class="fas fa-dice-one"></i>
            let newDiceIcon = document.createElement("i");
            newDiceIcon.className = `fas fa-dice-${diceString}`;
            logNode.appendChild(newDiceIcon);
        }
        logNode.appendChild(document.createTextNode("(" + sumDice(rolls[0]) + ")"));
        logDisplay.insertBefore(logNode, logDisplay.firstChild);
        //begin defend phase
        hideAllOptions(allButtons);
        defendPhase();
    });

    allButtons.fireButtons[1].addEventListener("click", function() {
        rolls[1] = rollDice(FIRE,SIDES);
        //console.log("Player 2 Attack Roll", rolls[1]);
        let logNode = document.createElement("p");
        logNode.appendChild(document.createTextNode("Player 2 Casts Fire for "));
        for (let i = 0; i < rolls[1].length; i++) {
            // convert roll to text
            let diceString = convertNumberToText(rolls[1][i]);
            //<i class="fas fa-dice-one"></i>
            let newDiceIcon = document.createElement("i");
            newDiceIcon.className = `fas fa-dice-${diceString}`;
            logNode.appendChild(newDiceIcon);
        }
        logNode.appendChild(document.createTextNode("(" + sumDice(rolls[1]) + ")"));
        logDisplay.insertBefore(logNode, logDisplay.firstChild);
        //begin defend phase
        hideAllOptions(allButtons);
        defendPhase();
    });

    // hide all menus and buttons 
    hideAllOptions(allButtons);
    // reset hp
    hitPoints = [ 20, 20];
    document.querySelector(".player-0-health").textContent = hitPoints[0];
    document.querySelector(".player-1-health").textContent = hitPoints[1];
    // reset sp
    specialPoints = [0, 0];
    document.querySelector(".player-0-special").textContent = specialPoints[0];
    document.querySelector(".player-1-special").textContent = specialPoints[1];
    // clear rolls
    rolls = [[],[]];
    
    logDisplay = document.querySelector(".log-display");
    
}

// create nextRound() function
function alternateAttackingPlayer() {
    // switch active player
    attackingPlayer = (attackingPlayer === 0) ? 1 : 0;
    defendingPlayer = (attackingPlayer === 0) ? 1 : 0;
    rolls = [[],[]];
}


function attackPhase() {
    // identify active player in UI
    document.querySelector(`.player-${defendingPlayer}-name`).classList.remove('active');
    document.querySelector(`.player-${attackingPlayer}-name`).classList.add('active');
    // reveal available attack options
    // reveal any available options .style.display = 'block';
    // when button clicked the result is logged and then phase 2 defending players turn
    document.querySelectorAll(".attack-button")[attackingPlayer].parentNode.style.display = 'block';
    if (specialPoints[attackingPlayer] > 0) {
        document.querySelectorAll(".attack-button-focus")[attackingPlayer].parentNode.style.display = 'block';
    }
    if (specialPoints[attackingPlayer] >= 3) {
        document.querySelectorAll(".spell-button-fire")[attackingPlayer].parentNode.style.display = 'block';
    }
}


function defendPhase() {
    document.querySelector(`.player-${attackingPlayer}-name`).classList.remove('active');
    document.querySelector(`.player-${defendingPlayer}-name`).classList.add('active');
    // reveal available defending options
    document.querySelectorAll(".defend-button")[defendingPlayer].parentNode.style.display = 'block';
    
    if (specialPoints[defendingPlayer] >=2) {
        document.querySelectorAll(".spell-button-heal")[defendingPlayer].parentNode.style.display = 'block';
    }

    if (specialPoints[defendingPlayer] >= 4) {
        document.querySelectorAll(".defend-button-diamond")[defendingPlayer].parentNode.style.display = 'block';
    }
}


function determineStartingPlayer() {
    // determine  starting player (Roll for initiative)
attackingPlayer = 0;
}

init(allButtons);
determineStartingPlayer();
hideAllOptions(allButtons);
attackPhase();

// add event listener to new game function
// init function for when new game clicked


// function clearDiceNode(player) {
//     playerDiceNode = document.querySelector(`.player-${player}-dice`);
//     while (playerDiceNode.firstChild) {
//         playerDiceNode.removeChild(playerDiceNode.firstChild);
//     }
// }