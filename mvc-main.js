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
        hitPoints: [ 20, 20],
        specialPoints: [0, 0],
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
                type: "offense",
                dicePower: FOCUS,
                spCost: FOCUSCOST
            },
            heal: {
                name: "Heal",
                verb: "casts a Heal spell",
                dicePower: HEAL,
                type: "defense",
                spCost: HEALCOST
            },
            fire: {
                name: "Fire Ball",
                verb: "casts Fire Ball spell",
                type: "offense",
                dicePower: FIRE,
                spCost: FIRECOST
            },
            diamond: {
                name: "Diamond Skin",
                verb: "casts Diamond Skin",
                type: "defense",
                dicePower: DIAMOND,
                spCost: DIAMONDCOST
            }
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
        getStartingPlayer: function() {
            return data.startingPlayer;
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
                //console.log(buttonType);            
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
            if (data.hitPoints[defendingPlayer] > 0) {
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
            attack: ".attack-button",
            focus: ".attack-button-focus",
            defend: ".defend-button",
            diamond: ".defend-button-diamond",
            heal: ".spell-button-heal",
            fire: ".spell-button-fire"
        }
    };

    return {
        getDOMstrings: function() {
            return DOMstrings;
        },

        hideAllOptions: function() {
            //AllButtons is an object with node lists of the types of interactive buttons. 
            //the following for loop sets each display value to none
            let allButtons = DOMstrings.buttons;
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
            let playerToUpdate = `player${player+1}Health`;
            let healthPointsDisplay = DOMstrings[playerToUpdate];
            document.querySelector(healthPointsDisplay).textContent = (hitPoints > 0 ? hitPoints : "Deceased");
        },
        updateSpecialPoints: function(player, specialPoints) {
            // this method will update the players Special Points
            let playerToUpdate = `player${player+1}Special`;
            let specialPointsDisplay = DOMstrings[playerToUpdate];
            document.querySelector(specialPointsDisplay).textContent = specialPoints;
        },
        toggleActivePlayer: function (player) {
            document.querySelector(`.player-${player}-name`).classList.toggle('active');
        },
        setActivePlayer: function (player) {
            document.querySelector(`.player-${player}-name`).classList.add('active');
        },
        removeActivePlayer: function (player) {
            document.querySelector(`.player-${player}-name`).classList.remove('active');
        },
        displayToLog: function (logNode) {
            // this method will create a text node with a given string and display it to the game log
            logDisplay = document.querySelector(DOMstrings.logDisplay);
            logDisplay.insertBefore(logNode, logDisplay.firstChild);
        },
        displayActiveAttackButtons: function (attackingPlayer, specialPoints) {
            // when button clicked the result is logged and then phase 2 defending players turn
            document.querySelectorAll(DOMstrings.buttons.attack)[attackingPlayer].parentNode.style.display = 'block';            
            if (specialPoints > 0) {
                document.querySelectorAll(DOMstrings.buttons.focus)[attackingPlayer].parentNode.style.display = 'block';
            }
            if (specialPoints >= 3) {
                document.querySelectorAll(DOMstrings.buttons.fire)[attackingPlayer].parentNode.style.display = 'block';
            }
        },
        displayActiveDefendButtons: function (defendingPlayer, specialPoints) {
            //reveal available defending options
            document.querySelectorAll(DOMstrings.buttons.defend)[defendingPlayer].parentNode.style.display = 'block';
            if (specialPoints >=2) {
                document.querySelectorAll(DOMstrings.buttons.heal)[defendingPlayer].parentNode.style.display = 'block';
            }
            if (specialPoints >= 4) {
                document.querySelectorAll(DOMstrings.buttons.diamond)[defendingPlayer].parentNode.style.display = 'block';
            }
        }
    }
})();

var controller = (function(UICtrl, PlayerCtrl) {
    var handleResult = function(player, buttonType) {
        result = PlayerCtrl.getAttackResult(player);
        return PlayerCtrl.evalutateResult(result, player, buttonType);
    }

    var evaluateGameOver = function(player) {
        let gameOver = PlayerCtrl.evaluateEndCondition(player);
                if (gameOver) {
                    let hitPoints = PlayerCtrl.getHitPoints(player);
                    UIController.updateHitPoints(player, hitPoints);
                    return gameOver;
                } else { //// else next round
                    //console.log("Game continues...");
                    return false;
                }
    }

    var handleGameOver = function(player) {
        let gameOver = evaluateGameOver(player);
        if (!gameOver) {
            let nextAttackingPlayer = PlayerCtrl.getOppositePlayer(player);
            attackPhase(nextAttackingPlayer);
        } else {
            UICtrl.hideAllOptions();
            // display gameOver to UI
            let gameOverNode = document.createElement('p');
            gameOverNode.appendChild(document.createTextNode(gameOver));
            UICtrl.displayToLog(gameOverNode);                    
        }
    }
    var attackPhase = function(defendingPlayer) {
        UICtrl.hideAllOptions();
        let attackingPlayer = PlayerCtrl.getOppositePlayer(defendingPlayer);
        let specialPointsAttackingPlayer = PlayerCtrl.getSpecialPoints(attackingPlayer);
        // update hp for both players
        UICtrl.updateHitPoints(attackingPlayer, PlayerCtrl.getHitPoints(attackingPlayer));
        UICtrl.updateHitPoints(defendingPlayer, PlayerCtrl.getHitPoints(defendingPlayer));
        // update special points for both players
        UICtrl.updateSpecialPoints(attackingPlayer, specialPointsAttackingPlayer);
        UICtrl.updateSpecialPoints(defendingPlayer, PlayerCtrl.getSpecialPoints(defendingPlayer));
        // identify active player in UI
        UICtrl.removeActivePlayer(defendingPlayer);
        UICtrl.setActivePlayer(attackingPlayer);
        // reveal available attack options
        UICtrl.displayActiveAttackButtons(attackingPlayer, specialPointsAttackingPlayer);
    }

    var defendPhase = function(attackingPlayer) {
        UICtrl.hideAllOptions();
        let defendingPlayer = PlayerCtrl.getOppositePlayer(attackingPlayer);
        let specialPointsDefendingPlayer = PlayerCtrl.getSpecialPoints(defendingPlayer);
        // update hp for both players
        UICtrl.updateHitPoints(attackingPlayer, PlayerCtrl.getHitPoints(attackingPlayer));
        UICtrl.updateHitPoints(defendingPlayer, PlayerCtrl.getHitPoints(defendingPlayer));
        // update special points for both players
        UICtrl.updateSpecialPoints(attackingPlayer, PlayerCtrl.getSpecialPoints(attackingPlayer));
        UICtrl.updateSpecialPoints(defendingPlayer, specialPointsDefendingPlayer);
        // Update active player
        UICtrl.removeActivePlayer(attackingPlayer);
        UICtrl.setActivePlayer(defendingPlayer);
        // reveal available defending options
        UICtrl.displayActiveDefendButtons(defendingPlayer, specialPointsDefendingPlayer);
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
        
        //let logDisplay = document.querySelector(DOM.logDisplay);
        let playerAmount = PlayerCtrl.getPlayerAmount().length;
        // loop through every action type and create an event listener for both of the button for each type using a for in loop, using a single add event listener function
        // need to dynamically loop through buttons. DOM.buttons[attribute] attribute example "attackButtons" change to "attack"
        // then use the ability.name attribute as the attribute variable.
        // for each ability create add an event listener 
        for (let player = 0; player < playerAmount; player++) {            
            for (let property in DOM.buttons) {                
                document.querySelectorAll(DOM.buttons[property])[player].addEventListener("click", function() {
                    let ability = PlayerCtrl.getAbilities()[property];
                    //need to add updateSpecialPoints (will help with event listener creation loop)
                    let roll = PlayerCtrl.rollDice(ability.dicePower, PlayerCtrl.getSides());
                    PlayerCtrl.setRolls(roll, player);
                    let logNode = createGameLogActionNode(player, ability,roll);
                    UICtrl.displayToLog(logNode);
                    // determine if attack or defense type ability
                    if (ability.type === "defense") {
                        let resultNode = document.createElement('p');
                        resultNode.appendChild(document.createTextNode(handleResult(player, DOM.buttons[property])));
                        UICtrl.displayToLog(resultNode);
                        handleGameOver(player);
                    } else {
                        defendPhase(player);
                    }
                });
            }
        }
    }

    return {

        init: function() {
            var DOM =  UICtrl.getDOMstrings();
            setupEventListeners(DOM);
            UICtrl.hideAllOptions();
            console.log("The application has started.");
        },
        gameLoop: function() {
            // First Player show available buttons
            let startingPlayer = PlayerCtrl.getStartingPlayer() + 1;
            UICtrl.toggleActivePlayer(startingPlayer);
            attackPhase(startingPlayer);
        }
    }
})(UIController, playerController);

controller.init();
controller.gameLoop();