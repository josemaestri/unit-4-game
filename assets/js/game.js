// GLOBAL VARIABLES
// ##########################################
var fighters = [
  {
    id: 'clu',
    name: 'Clu',
    health: 125,
    attack: 5,
    xp: 1
  },
  {
    id: 'tron',
    name: 'Tron/Rinzler',
    health: 150,
    attack: 10,
    xp: 1
  },
  {
    id: 'quorra',
    name: 'Quorra',
    health: 175,
    attack: 15,
    xp: 1
  },
  {
    id: 'zuse',
    name: 'Zuse/Castor',
    health: 200,
    attack: 20,
    xp: 1
  },

];

var champion;
var defender;
var enemies = [];
var rounds = enemies.length;

// HTML VARIABLES
// ##########################################


// FUNCTIONS
// ##########################################

// print characters

// select champion (user)

// print champion onto HTML

// print enemies onto HTML

// select defender (user)
function selectDef(){
  console.log('new player');
}

// print defender

// attack (user)
function attack(champ, def) {

  var damage = champ.xp * champ.attack;

  def.health = def.health - damage;
  champ.xp++;
  
  checkIfDead(def);

  if(!def.isDead){
    defend(def, champ);
  } else{
    rounds--;
    if(rounds > 0){
      selectDef();
    } else{
      handleWin();
    }
  }

  checkIfDead(champ);

  if(champ.isDead){
    handleLoss(); 
  }

  console.log('Champ Health: ' + champ.health);
  console.log('Def Health: ' + def.health);
}

// defend 
function defend(def, champ) {
  var damage = def.xp * def.attack;
  champ.health = champ.health - damage;
}

// check if fighter has died
function checkIfDead(fighter){
  if (fighter.health > 0){
    return true;
  } else {
    fighter.isDead = true;
  }
}

// handle win
function handleWin(){
  console.log('You Win!');
}

// handle loss
function handleLoss(){
  console.log('Womp. You Lose.');
}

// reset game