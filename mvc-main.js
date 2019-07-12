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
        // Make dice data an object
        sides: SIDES,
        abilities: {
            attack: {
                name: "Attack",
                // may be able to create action buttons
                verb: "Attacks",
                icon: "&#9876;",
                //type used to programatically add event listeners buttons
                type: "offense",
                dicePower: 1,
                spCost: 0
            },
            defend: {
                name: "Defend",
                verb: "Defends",
                type: "defense",
                dicePower: 1,
                spCost: 0
            },
            focus: {
                name: "Focus Attack",
                verb: "attacks with Focus",
                dicePower: FOCUS,
                spCost: FOCUSCOST
            },
            heal: {
                name: "Heal",
                verb: "casts a Heal spell",
                dicePower: HEAL,
                spCost: HEALCOST
            },
            fire: {
                name: "Fire Ball",
                verb: "casts Fire Ball spell",
                dicePower: FIRE,
                spCost: FIRECOST
            },
            diamond: {
                name: "Diamond Skin",
                verb: "casts Diamond Skin",
                dicePower: DIAMOND,
                spCost: DIAMONDCOST
            }
        },
        sides: SIDES,
        focus: FOCUS,
        heal: HEAL,
        fire: FIRE,
        diamond: DIAMOND,
        spCost: {
            focusCost: FOCUSCOST,
            healCost: HEALCOST,
            fireCost: FIRECOST,
            diamondCost: DIAMONDCOST
        }
        

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
        getAbilities: function () {
            return data.abilities;
        },
        getPlayerAmount: function() {
            return data.players;
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
        getHitPoints: function (player) { 
            // This function gets hitpoints from the model controller 
            return data.hitPoints[player];
        },
        setHitPoints: function (hitPoints, player) {
            // This function sets hitpoints in the model controller
            data.hitPoints[player] = hitPoints;
        },
        getSpecialPoints: function (player) {
            // This function returns the special point array
            return data.specialPoints[player];
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
        player2Special: ".player-1-special",
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
        updateHitPoints: function(player, hitPoints) {
            //this method will update players hitpoints
        },
        updateSpecialPoints: function(player, specialPoints) {
            // this method will update the players Special Points
            let playerToUpdate = `player${player+1}Special`;
            let specialPointsDisplay = DOMstrings[playerToUpdate];
            document.querySelector(specialPointsDisplay).textContent = specialPoints;
        },
        displayToLog: function (logNode) {
            // this method will create a text node with a given string and display it to the game log
            logDisplay = document.querySelector(DOMstrings.logDisplay);
            logDisplay.insertBefore(logNode, logDisplay.firstChild);
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

    var createGameLogActionNode = function(player, ability, roll) {
        let logNode = document.createElement("p");
        logNode.appendChild(document.createTextNode(`Player ${player+1} ${ability.verb} for `));
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
        return logNode;
    }
    
    var handleSpecialPoints = function(player, ability) {
        let specialPoints = PlayerCtrl.getSpecialPoints(player);
        specialPoints -= ability.spCost;
        PlayerCtrl.setSpecialPoints(specialPoints, player);
        return specialPoints;
    }

    var setupEventListeners = function(DOM) {
        
        logDisplay = document.querySelector(DOM.logDisplay);
        
        let playerAmount = PlayerCtrl.getPlayerAmount().length;
        //could loop through every action type and create an event listener for both of the button for each type using a for in loop, using a single add event listener function
        // todo change loop variable to "player" instead of generic i
        for (let player = 0; player < playerAmount; player++) {
            
            document.querySelectorAll(DOM.buttons.attackButtons)[player].addEventListener("click", function() {
                let ability = PlayerCtrl.getAbilities().attack;
                let roll = PlayerCtrl.rollDice(ability.dicePower, PlayerCtrl.getSides());
                PlayerCtrl.setRolls(roll, player);
                // insert Log Node into DOM Game Log 
                let logNode = createGameLogActionNode(player, ability, roll);
                UIController.displayToLog(logNode);
                defendPhase(player);
            });

            document.querySelectorAll(DOM.buttons.focusButtons)[player].addEventListener("click", function() {
                
                let ability = PlayerCtrl.getAbilities().focus;
                //subtract the cost of the ability to special points
                let specialPoints = handleSpecialPoints(player, ability);
                // Update UI to reflect change in model data
                UIController.updateSpecialPoints(player, specialPoints);
                let roll = PlayerCtrl.rollDice(ability.dicePower, PlayerCtrl.getSides());
                // Update data with current roll
                PlayerCtrl.setRolls(roll, player);
                let logNode = createGameLogActionNode(player, ability, roll);
                UIController.displayToLog(logNode);
                //begin defend phase
                // hideAllOptions(allButtons);
                defendPhase(player);
            });

            document.querySelectorAll(DOM.buttons.fireButtons)[player].addEventListener("click", function() {
                let ability = PlayerCtrl.getAbilities().fire;
                let specialPoints = handleSpecialPoints(player, ability);
                // this should be a call to the UI Controller
                // document.querySelector(`.player-${player}-special`).textContent = specialPoints;
                UIController.updateSpecialPoints(player, specialPoints);
                let roll = PlayerCtrl.rollDice(ability.dicePower, PlayerCtrl.getSides());
                //console.log("Player 2 Attack Roll", roll);
                let logNode = createGameLogActionNode(player, ability, roll);
                // logDisplay.insertBefore(logNode, logDisplay.firstChild);
                UIController.displayToLog(logNode);
                // begin defend phase
                //hideAllOptions(allButtons);
                defendPhase(player);
            });

            document.querySelectorAll(DOM.buttons.defendButtons)[player].addEventListener("click", function() {
                let ability = PlayerCtrl.getAbilities().defend;
                roll = PlayerCtrl.rollDice(ability.dicePower, PlayerCtrl.getSides());
                
                let logNode = createGameLogActionNode(player, ability,roll);
                UIController.displayToLog(logNode);
                PlayerCtrl.setRolls(roll, player);
                handleResult(player, DOM.buttons.defendButtons);
                
                if (!handleGameOver(player)) {
                    //alternateAttackingPlayer();
                    //hideAllOptions(allButtons);
                    attackPhase(player);
                } else {
                    hideAllOptions(allButtons);
                }
            });

            document.querySelectorAll(DOM.buttons.diamondButtons)[player].addEventListener("click", function() {
                
                let ability = PlayerCtrl.getAbilities().diamond;
                let specialPoints = handleSpecialPoints(player, ability);
                // handle with UI
                // document.querySelector(`.player-${player}-special`).textContent = specialPoints;
                UIController.updateSpecialPoints(player, specialPoints);
                let roll = PlayerCtrl.rollDice(ability.dicePower, PlayerCtrl.getSides());
                PlayerCtrl.setRolls(roll, player);
                let logNode = createGameLogActionNode(player, ability, roll);
                
                UIController.displayToLog(logNode);
                
                handleResult(player, DOM.buttons.diamondButtons);
                
                if (!handleGameOver(player)) {
                    //alternateAttackingPlayer();
                    //hideAllOptions(allButtons);
                    attackPhase(player);
                } else {
                    hideAllOptions(allButtons);
                }   
            });

            document.querySelectorAll(DOM.buttons.healButtons)[player].addEventListener("click", function() {
                
                let ability = PlayerCtrl.getAbilities().heal;
                let specialPoints = handleSpecialPoints(player, ability);
                // document.querySelector(`.player-${player}-special`).textContent = specialPoints;                
                UIController.updateSpecialPoints(player, specialPoints);
                let roll = PlayerCtrl.rollDice(ability.dicePower, PlayerCtrl.getSides());
                PlayerCtrl.setRolls(roll, player);
                let logNode = createGameLogActionNode(player, ability, roll);
                UIController.displayToLog(logNode);
                handleResult(player, DOM.buttons.healButtons);
                if (!handleGameOver(player)) {
                    //alternateAttackingPlayer();
                    //hideAllOptions(allButtons);
                    attackPhase(player);
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
            setupEventListeners(DOM);
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