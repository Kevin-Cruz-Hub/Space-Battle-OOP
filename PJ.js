// SPACE BATTLE CONSOLE GAME
//Make the GAME an OBJECT
let game = {
    round: 1,
    targetShip: 1,
    userChoice: "",
  };
  
  //MY SHIP becomes an OBJECT
  let player = {
    name: "USS Assembly",
    hull: 20,
    firePower: 5,
    accuracy: 0.7,
    attack: function () {
      //This is my attack function using math.random
      let attackChance = Math.random();
      if (attackChance <= this.accuracy) {
        return true;
      } else {
        return false;
      }
    },
  };
  
  // CLASS & constructor for Alien Ship
  class Alien {
    constructor(name, hull, firePower, accuracy) {
      this.name = name;
      this.hull = hull;
      this.firePower = firePower;
      this.accuracy = accuracy;
    }
    attack() {
      //Attack function using math.random
      let attackChance = Math.random();
      if (attackChance <= this.accuracy) {
        return true;
      } else {
        return false;
      }
    }
  }
  
  // Alien Arrays-Will Loop through these values to configure ship
  let Aliens = []; // alien ships
  let aHullVal = [3, 4, 5, 6]; // alien hull values
  let aFirePow = [2, 3, 4]; // alien fire power values
  let aAccuracy = [0.6, 0.7, 0.8]; // alien accuracy values
  

// Function to create alien instances
  let createAliens = () => {
    for (let i = 0; i < 6; i++) {
     //Iterate 6 values
     // Loop that chooses an index from the arrays made above and creates a new Alien instance
     let name = `Alien ${i}`
     let hull = aHullVal[Math.floor(Math.random()*aHullVal.length)]
     let firePower = aFirePow[Math.floor(Math.random()*aFirePow.length)]
     let accuracy = aAccuracy[Math.floor(Math.random()*aAccuracy.length)]
     Aliens[i] = new Alien(name, hull, firePower, accuracy); //The result will be a new alien ship with the new parameters
    }
  };
  
// Logic behind the game
  let toBattle = (ship1, ship2) => {
    // put the ships into an array
    let ships = [ship1, ship2];
    let attack = false;
    let attacking = 0;
    let beingAttacked = 1;
    let temp;
    console.log("%c Attack Begins =================", "font-size: 2rem");
    while (ships[beingAttacked].hull > 0) {
      //While the hull is greater than 0...Keep attacking
      // Attacking Sequence
      if (ships[beingAttacked].hull > 0) {
        // Console log the attack information
        console.log("\n");
        console.log(
          `%c ${ships[attacking].name} attacked ${ships[beingAttacked].name}`,
          "color: blue; border: 2px double white; font-size: 2rem;"
        );
        // Generate the attack on the enemy ship
        attack = ships[attacking].attack();
        if (attack === true) {
          ships[beingAttacked].hull -= ships[attacking].firePower; // ship1 -= ship2, changes once program gets to last else statement
          console.log(
            `%c Attack Successful! ${ships[beingAttacked].name} Hull: ${ships[beingAttacked].hull} HIT`,
            "color: green; font-weight: bold; font-size: 2rem;"
          );
        } else {
          console.log(
            `%c Attack Unsuccessful! ${ships[beingAttacked].name} Hull: ${ships[beingAttacked].hull} MISSED`,
            "color: red; font-size: 2rem;"
          );
        }
        // Check if the ship being attacked is still alive
        if (ships[beingAttacked].hull <= 0) {
          console.log(
            `%c ${ships[beingAttacked].name} has been destroyed`,
            "color: red; border: 1px solid grey; font-size: 2rem;"
          );
          if (ships[beingAttacked] === player) {
            ///If the USS Assembly ship is destroyed THEN alert player Game is Over
            alert("Game Over!!!");
          } else if (
            ships[beingAttacked].name === Aliens[Aliens.length - 1].name
          ) {
            alert(
                alert(`${ships[beingAttacked].name}: destroyed\nAlien fleet has been destroyed\n You have Won!!!`)
            );
          } //If USS Assembly destroys alien fleet, then alert player of victory
          else {
            game.userChoice = prompt(
              `${Aliens[game.targetShip].name} destroyed!!\n${
                player.name
              } Hull: ${
                player.hull
              }\nWould you like to ATTACK the next ship or RETREAT from battle?`,
              ""
            );
            game.targetShip += 1; //PROMPT PLAYER IF THEY WNAT TO CONTINUE OR RETREAT
            userPrompt();
            return;
          }
        }
        else{
            // Switch between the player and alien ship for who is attacking each time the function is ran
            // temp = ship1 = player
            temp = attacking;
            // atacking = beingAttacked = Alien
            attacking = beingAttacked
            // beingAttaked = player
            beingAttacked = temp
        }
      }
    }
  };
  // Function to check user prompts
  let userPrompt = () => {
    let response = game.userChoice.toUpperCase();
    if (response === "ATTACK") {
      toBattle(player, Aliens[game.targetShip]);
    } else if (response === "RETREAT") {
        alert('Game over... You live to fight again')
    }
  };
  
  let startGame = () => {
    // Build alien fleets
    createAliens();
    // First statement when game starts
    game.userChoice = prompt(`On a rainy day you notice a a deep shadow approaching, a fleet of alien ships!!\nHow will you handle them? Attack or Retreat.`)
    // Runs the userPrompt function
    userPrompt();
  };
  
  // Initialize game
  startGame();

