
var playerController = (function() {
    
    const SIDES = 6;
    const FOCUS = 2;
    const HEAL = 2;
    const FIRE = 3;
    const DIAMOND = 3;
    const FOCUSCOST = 1;
    const HEALCOST = 2;
    const FIRECOST = 3;
    const DIAMONDCOST = 4;
    
    var data = {
        startingPlayer: 0,
        players: [0, 1],
        rolls: [[],[]],
        actionType: ["",""],
        hitPoints: [ 20, 20],
        specialPoints: [0, 0],
        sides: SIDES,
        focus: FOCUS,
        heal: HEAL,
        fire: FIRE,
        diamond: DIAMOND,
        focusCost: FOCUSCOST,
        healCost: HEALCOST,
        fireCost: FIRECOST,
        diamondCost: DIAMONDCOST
        

    }

    var sumDice = function (diceArray) {
        let numDice = diceArray.length;
        let diceTotal = 0;
        for (let i =0; i < numDice; i++) {
            diceTotal += diceArray[i];
        }
        return diceTotal;
     }
    
    return {
        getData: function() {
            return data;
        },
        rollDice: function (numDice, sides) {
            let diceArray = [];
            for (let i = 0; i < numDice; i++) {
                let dice = Math.floor(Math.random() * sides) +1;
                diceArray.push(dice);
            }
            return diceArray;
        },
        getDiceSum: function (diceArray) {
            return sumDice(diceArray);
         },
         convertNumberToText: function (num) {
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
        },
        updateSpecialPoints: function () {
            // update function to deal with changing special point data
        },
        getAttackResult: function (defendingPlayer) {
            let attackingPlayer = (defendingPlayer === 0) ? 1 : 0;
            return sumDice(data.rolls[attackingPlayer]) - sumDice(data.rolls[defendingPlayer]);
          }
    };
})();

var UIController = (function() {

    var DOMstrings = {
        logDisplay: ".log-display",
        player1Name: ".player-0-name",
        player2Name: ".player-1-name",
        player1Special: ".player-0-special",
        player2Special: ".player-0-special",
        player1Health: ".player-0-health",
        player2Health: ".player-1-health",
        focusCost: ".focus-cost",
        diamondCost: ".diamond-cost",
        healCost: "heal-cost",
        fireCost: "fire-cost",
        buttons: { 
            attackButtons: ".attack-button",
            focusButtons: ".attack-button-focus",
            defendButtons: ".defend-button",
            diamondButtons: ".defend-button-diamond",
            healButtons: ".spell-button-heal",
            fireButtons: ".spell-button-fire"
        }
    };

    return {
        getDOMstrings: function() {
            return DOMstrings;
        },

        hideAllOptions: function(allButtons) {
           //AllButtons is an object with node lists of the types of interactive buttons. 
            //the following for loop sets each display value to none
            //which hides all of the buttons.
            //console.log(allButtons);
            for (const property in allButtons) {
                if (allButtons.hasOwnProperty(property)) {
                    let propertyButtonNodes = document.querySelectorAll(allButtons[property]);
                        for (let x=0; x< propertyButtonNodes.length; x++) {
                            //console.log(propertyButtonNodes);
                            propertyButtonNodes[x].parentNode.style.display = 'none';
                    }
                }
            } 
        }
    }
})();

var controller = (function(UICtrl, PlayerCtrl) {

    var setupEventListeners = function(data, DOM) {
        
        //console.log(DOM);
        logDisplay = document.querySelector(DOM.logDisplay);
        
        //could loop through every action type and create an event listener for both of the button for each type using a for in loop, using a single add event listener function
        for (let i = 0; i < data.players.length; i++) {
            
            document.querySelectorAll(DOM.buttons.attackButtons)[i].addEventListener("click", function() {
                data.rolls[i] = PlayerCtrl.rollDice(1,data.sides);
                
                let logNode = document.createElement("p");
                logNode.appendChild(document.createTextNode(`Player ${i+1} Attacks for `));
                for (let j = 0; j < data.rolls[i].length; j++) {
                    // convert roll to text
                    let diceString = PlayerCtrl.convertNumberToText(data.rolls[i][j]);
                    // create dice icon 
                    let newDiceIcon = document.createElement("i");
                    newDiceIcon.className = `fas fa-dice-${diceString}`;
                    // add dice icon to log Node Entry
                    logNode.appendChild(newDiceIcon);
                }
                // add result to logNode entry
                logNode.appendChild(document.createTextNode("(" + PlayerCtrl.getDiceSum(data.rolls[i]) + ")"));
                // insert Log Node into DOM Game Log 
                logDisplay.insertBefore(logNode, logDisplay.firstChild);
            });

            document.querySelectorAll(DOM.buttons.focusButtons)[i].addEventListener("click", function() {
                data.specialPoints[i] -= data.focusCost;
                document.querySelector(`.player-${i}-special`).textContent = data.specialPoints[i];
                data.rolls[i] = PlayerCtrl.rollDice(data.focus, data.sides);
                let logNode = document.createElement("p");
                logNode.appendChild(document.createTextNode(`Player ${i+1} Attacks with Focus for `));
                for (let j = 0; j < data.rolls[i].length; j++) {
                    // convert roll to text
                    let diceString = PlayerCtrl.convertNumberToText(data.rolls[i][j]);
                    //<i class="fas fa-dice-one"></i>
                    let newDiceIcon = document.createElement("i");
                    newDiceIcon.className = `fas fa-dice-${diceString}`;
                    logNode.appendChild(newDiceIcon);
                }
                logNode.appendChild(document.createTextNode("(" + PlayerCtrl.getDiceSum(data.rolls[i]) + ")"));
                logDisplay.insertBefore(logNode, logDisplay.firstChild);
                //begin defend phase
                // hideAllOptions(allButtons);
                // defendPhase();
            });

            document.querySelectorAll(DOM.buttons.fireButtons)[i].addEventListener("click", function() {
                data.specialPoints[i] -= data.fireCost;
                document.querySelector(`.player-${i}-special`).textContent = data.specialPoints[i];
                data.rolls[i] = PlayerCtrl.rollDice(data.fire,data.sides);
                //console.log("Player 2 Attack Roll", rolls[1]);
                let logNode = document.createElement("p");
                logNode.appendChild(document.createTextNode(`Player ${i+1} Casts Fire for `));
                for (let j = 0; j < data.rolls[i].length; j++) {
                    // convert roll to text
                    let diceString = PlayerCtrl.convertNumberToText(data.rolls[i][j]);
                    //<i class="fas fa-dice-one"></i>
                    let newDiceIcon = document.createElement("i");
                    newDiceIcon.className = `fas fa-dice-${diceString}`;
                    logNode.appendChild(newDiceIcon);
                }
                logNode.appendChild(document.createTextNode("(" + PlayerCtrl.getDiceSum(data.rolls[i]) + ")"));
                logDisplay.insertBefore(logNode, logDisplay.firstChild);
                //begin defend phase
                // hideAllOptions(allButtons);
                // defendPhase();
            });

            document.querySelectorAll(DOM.buttons.defendButtons)[i].addEventListener("click", function() {
                //console.log("Player 1 Defend", defendingPlayer);
                data.rolls[i] = PlayerCtrl.rollDice(1,data.sides);
                //console.log("Player 1 Defend", rolls[0]);
                let logNode = document.createElement("p");
                logNode.appendChild(document.createTextNode(`Player ${i+1} Defends with `));
                //let diceContainer = document.querySelector(".player-0-dice");
                for (let j = 0; j < data.rolls[i].length; j++) {
                    // convert roll to text
                    let diceString = PlayerCtrl.convertNumberToText(data.rolls[i][j]);
                    let newDiceIcon = document.createElement("i");
                    newDiceIcon.className = `fas fa-dice-${diceString}`;
                    logNode.appendChild(newDiceIcon);
                }
        
                logNode.appendChild(document.createTextNode("(" + PlayerCtrl.getDiceSum(data.rolls[i]) + ")"));
                // when defend button clicked display dice
                logDisplay.insertBefore(logNode, logDisplay.firstChild);
                result = PlayerCtrl.getAttackResult(i);
                console.log("result", result);
                // let resultText = document.createElement("p");
                // if (result !== 0) {
                //     if (result >= 1) {
                //         // if Attack > Defend then 
                //         //// subtract HP from Defending Player
                //         hitPoints[0] -= result;
                //         document.querySelector(".player-0-health").textContent = hitPoints[0];
        
                //         resultText.appendChild(document.createTextNode(`Player 2 damages Player 1 for ${result} damage.`));
                //         logDisplay.insertBefore(resultText, logDisplay.firstChild);
        
                //     } else {
                //         // if Attack < Defend then 
                //         //// add SP to Defending player
                //         specialPoints[0] += Math.abs(result);
                //         document.querySelector(".player-0-special").textContent = specialPoints[0];
        
                //         resultText.appendChild(document.createTextNode(`Player 1 gains ${Math.abs(result)} Special Points`));
                //         logDisplay.insertBefore(resultText, logDisplay.firstChild);
                //     }
                // } else {
                //     resultText.appendChild(document.createTextNode("Player 1 is unscathed."));
                //     logDisplay.insertBefore(resultText, logDisplay.firstChild);
                // }
                // if (hitPoints[0] <= 0) {
                //     hideAllOptions(allButtons);
                //     resultText = document.createElement("p");
                //     resultText.appendChild(document.createTextNode("GAME OVER - Player 1 has been slain."));
                //     logDisplay.insertBefore(resultText, logDisplay.firstChild);
                //     return;
                // }
                //// check if HP < 1
                ////// end game 
                //// else next round
                // alternateAttackingPlayer();
                // hideAllOptions(allButtons);
                // attackPhase();
            });

            document.querySelectorAll(DOM.buttons.diamondButtons)[i].addEventListener("click", function() {
                data.specialPoints[i] -= data.diamondCost;
                document.querySelector(`.player-${i}-special`).textContent = data.specialPoints[i];
                //console.log("Player 1 Defend", defendingPlayer);
                data.rolls[i] = PlayerCtrl.rollDice(data.diamond,data.sides);
    
                let logNode = document.createElement("p");
                logNode.appendChild(document.createTextNode(`Player ${i+1} defends with Diamond Skin for `));
                //let diceContainer = document.querySelector(".player-0-dice");
                for (let j = 0; j < data.rolls[i].length; j++) {
                    // convert roll to text
                    let diceString = PlayerCtrl.convertNumberToText(data.rolls[i][j]);
                    let newDiceIcon = document.createElement("i");
                    newDiceIcon.className = `fas fa-dice-${diceString}`;
                    logNode.appendChild(newDiceIcon);
                }
        
                logNode.appendChild(document.createTextNode("(" + PlayerCtrl.getDiceSum(data.rolls[i]) + ")"));
                // when defend button clicked display dice
                logDisplay.insertBefore(logNode, logDisplay.firstChild);
                // result = resolveAttack();
                // //console.log("result", result);
                // let resultText = document.createElement("p");
                // if (result !== 0) {
                //     if (result >= 1) {
                //         // if Attack > Defend then 
                //         //// subtract HP from Defending Player
                //         hitPoints[0] -= result;
                //         document.querySelector(".player-0-health").textContent = hitPoints[0];
        
                //         resultText.appendChild(document.createTextNode(`Player 2 damages Player 1 for ${result} damage.`));
                //         logDisplay.insertBefore(resultText, logDisplay.firstChild);
        
                //     } else {
                //         // if Attack < Defend then 
                //         //// add SP to Defending player
                //         specialPoints[0] += Math.abs(result);
                //         document.querySelector(".player-0-special").textContent = specialPoints[0];
        
                //         resultText.appendChild(document.createTextNode(`Player 1 gains ${Math.abs(result)} Special Points`));
                //         logDisplay.insertBefore(resultText, logDisplay.firstChild);
                //     }
                // } else {
                //     resultText.appendChild(document.createTextNode("Player 1 is unscathed."));
                //     logDisplay.insertBefore(resultText, logDisplay.firstChild);
                // }
                // if (hitPoints[0] <= 0) {
                //     hideAllOptions(allButtons);
                //     resultText = document.createElement("p");
                //     resultText.appendChild(document.createTextNode("GAME OVER - Player 1 has been slain."));
                //     logDisplay.insertBefore(resultText, logDisplay.firstChild);
                //     return;
                // }
                //// check if HP < 1
                ////// end game 
                //// else next round
                // alternateAttackingPlayer();
                // hideAllOptions(allButtons);
                // attackPhase();
            });

            document.querySelectorAll(DOM.buttons.healButtons)[i].addEventListener("click", function() {
                data.specialPoints[i] -= data.healCost;
                document.querySelector(`.player-${i}-special`).textContent = data.specialPoints[i];
                //console.log("Player 1 Defend", defendingPlayer);
                data.rolls[i] = PlayerCtrl.rollDice(data.heal, data.sides);
                //console.log("Player 1 Defend", rolls[0]);
                let logNode = document.createElement("p");
                logNode.appendChild(document.createTextNode(`Player ${i+1} casts Heal for `));
        
                for (let j = 0; j < data.rolls[i].length; j++) {
                    // convert roll to text
                    let diceString = PlayerCtrl.convertNumberToText(data.rolls[i][j]);
                    let newDiceIcon = document.createElement("i");
                    newDiceIcon.className = `fas fa-dice-${diceString}`;
                    logNode.appendChild(newDiceIcon);
                }
        
                logNode.appendChild(document.createTextNode("(" + PlayerCtrl.getDiceSum(data.rolls[i]) + ")"));
                // when defend button clicked display dice
                logDisplay.insertBefore(logNode, logDisplay.firstChild);
                // result = resolveAttack();
                // //console.log("result", result);
                // let resultText = document.createElement("p");
                // if (result !== 0) {
                //     if (result >= 1) {
                //         // if Attack > Defend then 
                //         //// subtract HP from Defending Player
                //         hitPoints[0] -= result;
                //         document.querySelector(".player-0-health").textContent = hitPoints[0];
        
                //         resultText.appendChild(document.createTextNode(`Player 1 fails to cast heal and suffers ${result} damage.`));
                //         logDisplay.insertBefore(resultText, logDisplay.firstChild);
        
                //     } else {
                //         // if Attack < Defend then 
                //         //// add SP to Defending player
                //         hitPoints[0] += Math.abs(result);
                //         document.querySelector(".player-0-health").textContent = hitPoints[0];
        
                //         resultText.appendChild(document.createTextNode(`Player 1 heals for ${Math.abs(result)}.`));
                //         logDisplay.insertBefore(resultText, logDisplay.firstChild);
                //     }
                // } else {
                //     resultText.appendChild(document.createTextNode("Player 1 casts Heal and nullifies the damage dealt by Player 2."));
                //     logDisplay.insertBefore(resultText, logDisplay.firstChild);
                // }
                // if (hitPoints[0] <= 0) {
                //     hideAllOptions(allButtons);
                //     resultText = document.createElement("p");
                //     resultText.appendChild(document.createTextNode("GAME OVER - Player 1 has been slain."));
                //     logDisplay.insertBefore(resultText, logDisplay.firstChild);
                //     return;
                // }
                //// check if HP < 1
                ////// end game 
                //// else next round
                // alternateAttackingPlayer();
                // hideAllOptions(allButtons);
                // attackPhase();
            });
        }
        

    }

    return {

        init: function() {
            let data = PlayerCtrl.getData();
            var DOM =  UICtrl.getDOMstrings();
            data.startingPlayer = data.players[0];
            setupEventListeners(data,DOM);
            //UICtrl.hideAllOptions(DOM.buttons);
            console.log("The application has started.");
        },
        gameLoop: function() {
            // First Player show available buttons
            // Player Clicks Button
            // Hide All Options
            // Check for Human Player 2 if A make selection from a set of choices depends on available sp.
            // Second Player Defends
            // Hide All Options
            // Calculate Results
            // Check for win Condition
            // Switch Players
            // loop
        }
        
    }
    
})(UIController, playerController);

controller.init();