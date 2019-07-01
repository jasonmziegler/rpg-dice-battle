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
    
    //may need to split into player data and gameData
    var data = {
        startingPlayer: 0,
        players: [0, 1],
        rolls: [[],[]],
        // actionType may be necessary for when consolidating the button click function to a single function.
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

     var determineOppositePlayer = function (player) {
        return ((player === 0) ? 1 :  0);
     }
    
    return {
        getData: function() {
            return data;
        },
        getSides: function () {
            return data.sides;
        },
        getOppositePlayer: function(player) {
            return determineOppositePlayer(player);
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
        getRolls: function () {
            // This functions gets rolls from the model controller
            return data.rolls;
        },
        setRolls: function (rolls, player) { 
            // This function sets rolls in the model controller
            data.rolls[player] = rolls;
        },
        getHitPoints: function () { 
            // This function gets hitpoints from the model controller 
            return data.hitPoints;
        },
        setHitPoints: function (hitPoints, player) {
            // This function sets hitpoints in the model controller
            data.hitPoints[player] = hitPoints;
        },
        getSpecialPoints: function () {
            // This function returns the special point array
            return data.specialPoints;
        },
        setSpecialPoints: function (specialPoints, player) {
            // update function to deal with changing special point data
            data.specialPoints[player] = specialPoints;
        },
        getAttackResult: function (defendingPlayer) {
            let attackingPlayer = determineOppositePlayer(defendingPlayer);
            return sumDice(data.rolls[attackingPlayer]) - sumDice(data.rolls[defendingPlayer]);
        },
        evalutateResult: function (result, defendingPlayer, buttonType) {
                let attackingPlayer = determineOppositePlayer(defendingPlayer);
                console.log(buttonType);            
                if (result !== 0) {
                    if (result >= 1) {
                        // if Attack > Defend then 
                        //// subtract HP from Defending Player
                        data.hitPoints[defendingPlayer] -= result;
                        // return result message
                        if (buttonType === ".spell-button-heal") {
                            return `Player 1 fails to cast heal and suffers ${result} damage.`
                        } else {
                            return `Player ${attackingPlayer+1} damages Player ${defendingPlayer+1} for ${result} damage.`;
                        }                                
                    } else {
                        // if Attack < Defend then 
                        //// add SP to Defending player
                        
                        //check for heal
                        if (buttonType === ".spell-button-heal") {
                            data.hitPoints[defendingPlayer] += Math.abs(result);
                            return `Player 1 heals for ${Math.abs(result)}.`;
                        } else {
                            data.specialPoints[defendingPlayer] += Math.abs(result);
                            return `Player ${defendingPlayer+1} gains ${Math.abs(result)} Special Points`;
                        }                        
                    }
                } else {
                    // if Attack = to Heal/Defend 
                    /// return no change result message
                    if (buttonType === ".spell-button-heal") {
                        return `Player ${defendingPlayer+1} casts Heal and nullifies the damage dealt by ${attackingPlayer+1}.`
                    } else {
                       return `Player ${defendingPlayer+1} is unscathed.`;
                    }                    
                }
        },
        evaluateEndCondition: function (defendingPlayer) {
            //console.log(data.hitPoints[defendingPlayer]);
            if (data.hitPoints[defendingPlayer] >= 0) {
                return false;
            } else {
                return `GAME OVER - Player ${defendingPlayer+1} has been slain.`;
            }
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
        },
        updateHitPoints: function(player) {
            //this method will update players hitpoints
        },
        updateSpecialPoints: function(player) {
            // this method will update the players Special Points
        },
        displayToLog: function (message) {
            // this method will create a text node with a given string and display it to the game log
        },
        displayActiveAttackButtons: function () {
            // this method will display the buttons that are available to the current attacking player
        },
        displayActiveDefenceButtons: function () {
            // this method will display the buttons that are available to the current defending player
        }
    }
})();

var controller = (function(UICtrl, PlayerCtrl) {
    var handleResult = function(player, buttonType) {
        result = PlayerCtrl.getAttackResult(player);
        console.log("result", result);
        // this will call the log result function
        console.log(PlayerCtrl.evalutateResult(result, player, buttonType));
    }

    var handleGameOver = function(player) {
        let gameOver = PlayerCtrl.evaluateEndCondition(player);
                if (gameOver) {
                    console.log(gameOver);
                    return true; ////// end game 
                } else { //// else next round
                    // alternateAttackingPlayer();
                    // hideAllOptions(allButtons);
                    // attackPhase();
                }
    }
    var attackPhase = function(defendingPlayer) {
        // need to make determineOppositePlayer a public function
        console.log('defending Player', defendingPlayer);
        let attackingPlayer = PlayerCtrl.getOppositePlayer(defendingPlayer);
        console.log('attacking player', attackingPlayer);
        console.log("Begin Attack Phase");
        // identify active player in UI
        // document.querySelector(`.player-${defendingPlayer}-name`).classList.remove('active');
        // document.querySelector(`.player-${attackingPlayer}-name`).classList.add('active');
        // // reveal available attack options
        // // reveal any available options .style.display = 'block';
        // // when button clicked the result is logged and then phase 2 defending players turn
        //document.querySelectorAll(".attack-button")[attackingPlayer].parentNode.style.display = 'block';
        // if (specialPoints[attackingPlayer] > 0) {
        //     document.querySelectorAll(".attack-button-focus")[attackingPlayer].parentNode.style.display = 'block';
        // }
        // if (specialPoints[attackingPlayer] >= 3) {
        //     document.querySelectorAll(".spell-button-fire")[attackingPlayer].parentNode.style.display = 'block';
        // }
    }

    var defendPhase = function(attackingPlayer) {
        console.log('attacking player', attackingPlayer);
        let defendingPlayer = PlayerCtrl.getOppositePlayer(attackingPlayer);
        console.log('Defending Player', defendingPlayer);
        console.log("Begin Defend Phase");
        // document.querySelector(`.player-${attackingPlayer}-name`).classList.remove('active');
        // document.querySelector(`.player-${defendingPlayer}-name`).classList.add('active');
        // // reveal available defending options
        // document.querySelectorAll(".defend-button")[defendingPlayer].parentNode.style.display = 'block';
        
        // if (specialPoints[defendingPlayer] >=2) {
        //     document.querySelectorAll(".spell-button-heal")[defendingPlayer].parentNode.style.display = 'block';
        // }

        // if (specialPoints[defendingPlayer] >= 4) {
        //     document.querySelectorAll(".defend-button-diamond")[defendingPlayer].parentNode.style.display = 'block';
        // }
    }

    var setupEventListeners = function(data, DOM) {
        
        //console.log(DOM);
        logDisplay = document.querySelector(DOM.logDisplay);
        
        //could loop through every action type and create an event listener for both of the button for each type using a for in loop, using a single add event listener function
        // todo change loop variable to "player" instead of generic i
        for (let i = 0; i < data.players.length; i++) {
            
            document.querySelectorAll(DOM.buttons.attackButtons)[i].addEventListener("click", function() {
                // data.rolls[i] = PlayerCtrl.rollDice(1,data.sides);
                let roll = PlayerCtrl.rollDice(1,PlayerCtrl.getSides());
                
                // TODO: Need to turn this into a create string function and let something else handle display to UI
                let logNode = document.createElement("p");
                logNode.appendChild(document.createTextNode(`Player ${i+1} Attacks for `));
                for (let j = 0; j < roll.length; j++) {
                    // convert roll to text
                    let diceString = PlayerCtrl.convertNumberToText(roll[j]);
                    // create dice icon 
                    let newDiceIcon = document.createElement("i");
                    newDiceIcon.className = `fas fa-dice-${diceString}`;
                    // add dice icon to log Node Entry
                    logNode.appendChild(newDiceIcon);
                }
                // add result to logNode entry
                logNode.appendChild(document.createTextNode("(" + PlayerCtrl.getDiceSum(roll) + ")"));
                // insert Log Node into DOM Game Log 
                PlayerCtrl.setRolls(roll, i);
                logDisplay.insertBefore(logNode, logDisplay.firstChild);
                defendPhase(i);
            });

            document.querySelectorAll(DOM.buttons.focusButtons)[i].addEventListener("click", function() {
                //subtract the cost of the ability to special points
                let specialPoints = PlayerCtrl.getSpecialPoints();
                specialPoints -= data.focusCost;
                PlayerCtrl.setSpecialPoints(specialPoints, i);
                // Update UI to reflect change in model data
                // TODO: move update special Points in UI to view controller
                document.querySelector(`.player-${i}-special`).textContent = specialPoints;

                let roll = PlayerCtrl.rollDice(data.focus, PlayerCtrl.getSides());
                let logNode = document.createElement("p");
                logNode.appendChild(document.createTextNode(`Player ${i+1} Attacks with Focus for `));
                for (let j = 0; j < roll.length; j++) {
                    // convert roll to text
                    let diceString = PlayerCtrl.convertNumberToText(roll[j]);
                    //<i class="fas fa-dice-one"></i>
                    let newDiceIcon = document.createElement("i");
                    newDiceIcon.className = `fas fa-dice-${diceString}`;
                    logNode.appendChild(newDiceIcon);
                }
                logNode.appendChild(document.createTextNode("(" + PlayerCtrl.getDiceSum(roll) + ")"));
                // Update data with current roll
                PlayerCtrl.setRolls(roll, i);
                logDisplay.insertBefore(logNode, logDisplay.firstChild);
                //begin defend phase
                // hideAllOptions(allButtons);
                defendPhase(i);
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
                // begin defend phase
                //hideAllOptions(allButtons);
                defendPhase(i);
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
                handleResult(i, DOM.buttons.defendButtons);
                
                if (!handleGameOver(i)) {
                    //alternateAttackingPlayer();
                    //hideAllOptions(allButtons);
                    attackPhase(i);
                } else {
                    hideAllOptions(allButtons);
                }
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
                handleResult(i, DOM.buttons.diamondButtons);
                
                if (!handleGameOver(i)) {
                    //alternateAttackingPlayer();
                    //hideAllOptions(allButtons);
                    attackPhase(i);
                } else {
                    hideAllOptions(allButtons);
                }   
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
                handleResult(i, DOM.buttons.healButtons);
                if (!handleGameOver(i)) {
                    //alternateAttackingPlayer();
                    //hideAllOptions(allButtons);
                    attackPhase(i);
                } else {
                    hideAllOptions(allButtons);
                }
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
            return data;
        },
        gameLoop: function(data) {
            // First Player show available buttons
            attackPhase(data.startingPlayer);
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
//controller.gameLoop(controller.init());