
var playerController = (function() {
    const SIDES = 6;
    // let player1DiceNode, player2DiceNode, logDisplay;
    
    var data = {
        rolls: [[],[]],
        hitPoints: [ 20, 20],
        specialPoints: [0, 0]
        
    }

    // function rollDice(numDice, sides) {
    //     let diceArray = [];
    //     for (let i = 0; i < numDice; i++) {
    //         let dice = Math.floor(Math.random() * sides) +1;
    //         diceArray.push(dice);
    //     }
    //     return diceArray;
    // }

    // function sumDice(diceArray) {
    //     let numDice = diceArray.length;
    //     let diceTotal = 0;
    //     for (let i =0; i < numDice; i++) {
    //         diceTotal += diceArray[i];
    //     }
    //     return diceTotal;
    // }

    // function resolveAttack() {
    //     return sumDice(rolls[attackingPlayer]) - sumDice(rolls[defendingPlayer]);
    // }

    // function alternateAttackingPlayer() {
    //     // switch active player
    //     attackingPlayer = (attackingPlayer === 0) ? 1 : 0;
    //     defendingPlayer = (attackingPlayer === 0) ? 1 : 0;
    //     rolls = [[],[]];
    // }

    
    return {};
})();

var UIController = (function() {

    var DOMstrings = {
        player1Name: ".player-0-name",
        player2Name: ".player-1-name",
        player1Special: ".player-0-special",
        player2Special: ".player-0-special",
        player1Health: ".player-0-health",
        player2Health: ".player-1-health",
        attackButton: ".attack-button",
        defendButton: ".defend-button"
    };
    

    // function hideAllOptions() {
    //     document.querySelectorAll(".attack-button")[0].parentNode.style.display = 'none';
    //     document.querySelectorAll(".attack-button")[1].parentNode.style.display = 'none';
    //     document.querySelectorAll(".defend-button")[0].parentNode.style.display = 'none';
    //     document.querySelectorAll(".defend-button")[1].parentNode.style.display = 'none';
    // }

    // function convertNumberToText(num) {
    //     switch(num) {
    //         case 1:
    //         return "one";
    //   case 2:
    //         return "two";
    //   case 3:
    //         return "three";
    //   case 4:
    //         return "four";
    //   case 5:
    //         return "five";
    //   case 6:
    //         return "six";
    //   default:
    //         return "one";
    //     }
    // }
    return {
        getDOMstrings: function() {
            return DOMstrings;
        },
        hideAllOptions: function() {
            document.querySelectorAll(DOMstrings.attackButton)[0].parentNode.style.display = 'none';
            document.querySelectorAll(DOMstrings.attackButton)[1].parentNode.style.display = 'none';
            document.querySelectorAll(DOMstrings.defendButton)[0].parentNode.style.display = 'none';
            document.querySelectorAll(DOMstrings.defendButton)[1].parentNode.style.display = 'none';
        }
    }
})();

var controller = (function(UICtrl, PlayerCtrl) {

    var setupEventListeners = function() {
        var DOM =  UICtrl.getDOMstrings();
        let attackButtons = document.querySelectorAll(DOM.attackButton);
        let defendButtons = document.querySelectorAll(DOM.defendButton);

        attackButtons[0].addEventListener("click", ctrlAttack);
        attackButtons[1].addEventListener("click", ctrlAttack);

        defendButtons[0].addEventListener("click", ctrlDefend);
        defendButtons[1].addEventListener("click", ctrlDefend);
    }

    var ctrlAttack = function(player) {
        console.log("Attack Clicked");
        // rolls[0] = rollDice(1,SIDES);
        // //console.log("Player 1 Attack Roll", rolls[0]);
        // let testNode = document.createElement("p");
        // testNode.appendChild(document.createTextNode("Player 1 Attacks for "));
        // for (let i = 0; i < rolls[0].length; i++) {
        //     // convert roll to text
        //     let diceString = convertNumberToText(rolls[0][i]);
        //     //<i class="fas fa-dice-one"></i>
        //     let newDiceIcon = document.createElement("i");
        //     newDiceIcon.className = `fas fa-dice-${diceString}`;
        //     testNode.appendChild(newDiceIcon);
        // }
        // testNode.appendChild(document.createTextNode("(" + sumDice(rolls[0]) + ")"));
        // logDisplay.insertBefore(testNode, logDisplay.firstChild);
        // //begin defend phase
        // defendPhase();

    };

    var ctrlDefend = function() {

        console.log("Defend Clicked");
        // //console.log("Player 1 Defend", defendingPlayer);
        // rolls[0] = rollDice(1,SIDES);
        // console.log("Player 1 Defend", rolls[0]);
        // let testNode = document.createElement("p");
        // testNode.appendChild(document.createTextNode("Player 1 Defends with "));
        // let diceContainer = document.querySelector(".player-0-dice");
        // for (let i = 0; i < rolls[0].length; i++) {
        //     // convert roll to text
        //     let diceString = convertNumberToText(rolls[0][i]);
        //     let newDiceIcon = document.createElement("i");
        //     newDiceIcon.className = `fas fa-dice-${diceString}`;
        //     testNode.appendChild(newDiceIcon);
        // }

        // testNode.appendChild(document.createTextNode("(" + sumDice(rolls[0]) + ")"));
        // // when defend button clicked display dice
        // logDisplay.insertBefore(testNode, logDisplay.firstChild);
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
        //     hideAllOptions();
        //     resultText = document.createElement("p");
        //     resultText.appendChild(document.createTextNode("GAME OVER - Player 1 has been slain."));
        //     logDisplay.insertBefore(resultText, logDisplay.firstChild);
        //     return;
        // }
        // //// check if HP < 1
        // ////// end game 
        // //// else next round
        // alternateAttackingPlayer();
        // attackPhase();
    };

    // function determineStartingPlayer() {
    //     // determine  starting player (Roll for initiative)
    // attackingPlayer = 0;
    // }

    // function attackPhase() {
    //     hideAllOptions();
    //     // identify active player in UI
    //     document.querySelector(`.player-${defendingPlayer}-name`).classList.remove('active');
    //     document.querySelector(`.player-${attackingPlayer}-name`).classList.add('active');
    //     // reveal available attack options
    //     // reveal any available options .style.display = 'block';
    //     // when button clicked the result is logged and then phase 2 defending players turn
    //     document.querySelectorAll(".attack-button")[attackingPlayer].parentNode.style.display = 'block';
    // }

    // function defendPhase() {
    //     hideAllOptions();
    //     document.querySelector(`.player-${attackingPlayer}-name`).classList.remove('active');
    //     document.querySelector(`.player-${defendingPlayer}-name`).classList.add('active');
    //     // reveal available defending options
    //     document.querySelectorAll(".defend-button")[defendingPlayer].parentNode.style.display = 'block';
    // }

    return {

        init: function() {
            setupEventListeners();
            UICtrl.hideAllOptions();
            console.log("The application has started.");
            // // remove active class from Player 1 
            // document.querySelector('.player-0-name').classList.remove('active');
            // document.querySelector('.player-1-name').classList.remove('active');
            
            // // bind all event listeners
            // let attackButtons = document.querySelectorAll(".attack-button");
        
            // attackButtons[0].addEventListener("click", function() {
            //     rolls[0] = rollDice(1,SIDES);
            //     //console.log("Player 1 Attack Roll", rolls[0]);
            //     let testNode = document.createElement("p");
            //     testNode.appendChild(document.createTextNode("Player 1 Attacks for "));
            //     for (let i = 0; i < rolls[0].length; i++) {
            //         // convert roll to text
            //         let diceString = convertNumberToText(rolls[0][i]);
            //         //<i class="fas fa-dice-one"></i>
            //         let newDiceIcon = document.createElement("i");
            //         newDiceIcon.className = `fas fa-dice-${diceString}`;
            //         testNode.appendChild(newDiceIcon);
            //     }
            //     testNode.appendChild(document.createTextNode("(" + sumDice(rolls[0]) + ")"));
            //     logDisplay.insertBefore(testNode, logDisplay.firstChild);
            //     //begin defend phase
            //     defendPhase();
        
            // });
        
            // attackButtons[1].addEventListener("click", function() {
            //     rolls[1] = rollDice(1,SIDES);
            //     //console.log("Player 2 Attack Roll", rolls[1]);
            //     let testNode = document.createElement("p");
            //     testNode.appendChild(document.createTextNode("Player 2 Attacks for "));
            //     for (let i = 0; i < rolls[1].length; i++) {
            //         // convert roll to text
            //         let diceString = convertNumberToText(rolls[1][i]);
            //         //<i class="fas fa-dice-one"></i>
            //         let newDiceIcon = document.createElement("i");
            //         newDiceIcon.className = `fas fa-dice-${diceString}`;
            //         testNode.appendChild(newDiceIcon);
            //     }
            //     testNode.appendChild(document.createTextNode("(" + sumDice(rolls[1]) + ")"));
            //     logDisplay.insertBefore(testNode, logDisplay.firstChild);
            //     //begin defend phase
            //     defendPhase();
            // });
        
            // let defendButtons = document.querySelectorAll(".defend-button");
            // defendButtons[0].addEventListener("click", function() {
            //     //console.log("Player 1 Defend", defendingPlayer);
            //     rolls[0] = rollDice(1,SIDES);
            //     console.log("Player 1 Defend", rolls[0]);
            //     let testNode = document.createElement("p");
            //     testNode.appendChild(document.createTextNode("Player 1 Defends with "));
            //     let diceContainer = document.querySelector(".player-0-dice");
            //     for (let i = 0; i < rolls[0].length; i++) {
            //         // convert roll to text
            //         let diceString = convertNumberToText(rolls[0][i]);
            //         let newDiceIcon = document.createElement("i");
            //         newDiceIcon.className = `fas fa-dice-${diceString}`;
            //         testNode.appendChild(newDiceIcon);
            //     }
        
            //     testNode.appendChild(document.createTextNode("(" + sumDice(rolls[0]) + ")"));
            //     // when defend button clicked display dice
            //     logDisplay.insertBefore(testNode, logDisplay.firstChild);
            //     result = resolveAttack();
            //     //console.log("result", result);
            //     let resultText = document.createElement("p");
            //     if (result !== 0) {
            //         if (result >= 1) {
            //             // if Attack > Defend then 
            //             //// subtract HP from Defending Player
            //             hitPoints[0] -= result;
            //             document.querySelector(".player-0-health").textContent = hitPoints[0];
        
            //             resultText.appendChild(document.createTextNode(`Player 2 damages Player 1 for ${result} damage.`));
            //             logDisplay.insertBefore(resultText, logDisplay.firstChild);
        
            //         } else {
            //             // if Attack < Defend then 
            //             //// add SP to Defending player
            //             specialPoints[0] += Math.abs(result);
            //             document.querySelector(".player-0-special").textContent = specialPoints[0];
        
            //             resultText.appendChild(document.createTextNode(`Player 1 gains ${Math.abs(result)} Special Points`));
            //             logDisplay.insertBefore(resultText, logDisplay.firstChild);
            //         }
            //     } else {
            //         resultText.appendChild(document.createTextNode("Player 1 is unscathed."));
            //         logDisplay.insertBefore(resultText, logDisplay.firstChild);
            //     }
            //     if (hitPoints[0] <= 0) {
            //         hideAllOptions();
            //         resultText = document.createElement("p");
            //         resultText.appendChild(document.createTextNode("GAME OVER - Player 1 has been slain."));
            //         logDisplay.insertBefore(resultText, logDisplay.firstChild);
            //         return;
            //     }
            //     //// check if HP < 1
            //     ////// end game 
            //     //// else next round
            //     alternateAttackingPlayer();
            //     attackPhase();
            // });
        
            // defendButtons[1].addEventListener("click", function() {
            //     rolls[1] = rollDice(1,SIDES);
            //     console.log("Player 2 Defend", rolls[1]);
            //     let testNode = document.createElement("p");
            //     testNode.appendChild(document.createTextNode("Player 2 Defends with "));
            //     let diceContainer = document.querySelector(".player-1-dice");
            //     for (let i = 0; i < rolls[1].length; i++) {
            //         // convert roll to text
            //         let diceString = convertNumberToText(rolls[1][i]);
            //         //<i class="fas fa-dice-one"></i>
            //         let newDiceIcon = document.createElement("i");
            //         newDiceIcon.className = `fas fa-dice-${diceString}`;
            //         testNode.appendChild(newDiceIcon);
            //     }
        
            //     testNode.appendChild(document.createTextNode("(" + sumDice(rolls[1]) + ")"));
            //     // when defend button clicked display dice
            //     logDisplay.insertBefore(testNode, logDisplay.firstChild);
            //     result = resolveAttack();
            //     //console.log("result", result);
            //     let resultText = document.createElement("p");
            //     if (result !== 0) {
            //         if (result >= 1) {
            //             // if Attack > Defend then 
            //             //// subtract HP from Defending Player
            //             hitPoints[1] -= result;
            //             document.querySelector(".player-1-health").textContent = hitPoints[1];
        
            //             resultText.appendChild(document.createTextNode(`Player 1 damages Player 2 for ${result} damage.`));
            //             logDisplay.insertBefore(resultText, logDisplay.firstChild);
        
            //         } else {
            //             // if Attack < Defend then 
            //             //// add SP to Defending player
            //             specialPoints[1] += Math.abs(result);
            //             document.querySelector(".player-1-special").textContent = specialPoints[1];
        
            //             resultText.appendChild(document.createTextNode(`Player 2 gains ${Math.abs(result)} Special Points`));
            //             logDisplay.insertBefore(resultText, logDisplay.firstChild);
            //         }
            //     } else {
            //         //console.log("Player 2 is unscathed.")
            //         resultText.appendChild(document.createTextNode("Player 2 is unscathed."));
            //         logDisplay.insertBefore(resultText, logDisplay.firstChild);
            //     }
            //     if (hitPoints[1] <= 0) {
            //         hideAllOptions();
            //         resultText = document.createElement("p");
            //         resultText.appendChild(document.createTextNode("GAME OVER - Player 2 has been slain."));
            //         logDisplay.insertBefore(resultText, logDisplay.firstChild);
            //         return;
            //     }
            //     //// check if HP < 1
            //     ////// end game 
            //     //// else next round
            //     alternateAttackingPlayer();
            //     attackPhase();
            // });
        
            // // hide all menus and buttons 
            // hideAllOptions();
            // // reset hp
            // hitPoints = [ 20, 20];
            // document.querySelector(".player-0-health").textContent = hitPoints[0];
            // document.querySelector(".player-1-health").textContent = hitPoints[1];
            // // reset sp
            // specialPoints = [0, 0];
            // document.querySelector(".player-0-special").textContent = specialPoints[0];
            // document.querySelector(".player-1-special").textContent = specialPoints[1];
            // // clear rolls
            // rolls = [[],[]];
            
            // logDisplay = document.querySelector(".log-display");
        }
        
    }
    
})(UIController, playerController);

controller.init();