
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
        sumDice: function (diceArray) {
            let numDice = diceArray.length;
            let diceTotal = 0;
            for (let i =0; i < numDice; i++) {
                diceTotal += diceArray[i];
            }
            return diceTotal;
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
        
        //could loop through every action type and create an event listener for both of the button for each type using a for in loop
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
                logNode.appendChild(document.createTextNode("(" + PlayerCtrl.sumDice(data.rolls[i]) + ")"));
                // insert Log Node into DOM Game Log 
                logDisplay.insertBefore(logNode, logDisplay.firstChild);
            });

            document.querySelectorAll(DOM.buttons.focusButtons)[i].addEventListener("click", function() {
                data.specialPoints[i] -= data.focusCost;
                document.querySelector(".player-0-special").textContent = data.specialPoints[i];
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
                logNode.appendChild(document.createTextNode("(" + PlayerCtrl.sumDice(data.rolls[i]) + ")"));
                logDisplay.insertBefore(logNode, logDisplay.firstChild);
                //begin defend phase
                // hideAllOptions(allButtons);
                // defendPhase();
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