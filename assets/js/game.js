


// GET READY
$(document).ready(function() {

  // GLOBAL VARIABLES
  // ##########################################
  var fighters;

  var champion;
  var defender;
  var enemies = [];
  var rounds;


  // HTML VARIABLES
  // ##########################################
  var areaFighters = $('.area-fighters');
  var areaPlay = $('.area-play');
  var rowFighters = $('.row-fighters');
  var rowPlay = $('.row-play');
  var colPlay = $('.col-play');
  var colEnemies = $('.col-enemies');
  var rowAttack = $('.row-attack');
  var champEl = $('.champion');
  var defEl = $('.defender');


  // FUNCTIONS
  // ##########################################

  // print characters
  function printFighters(){
    for (var i = 0; i < fighters.length; i++) {
      var el = $('<div class="col"><div class="fighter" data-fighter="'+fighters[i].id+'" data-fighter-pos="'+i+'">'+fighters[i].name+'</div></div>');
      el.appendTo('.row-fighters');
    }
  }

  // select champion (user)
  function selectChamp(fighterPos){
    champion = fighters[fighterPos];
    for (var i = 0; i < fighters.length; i++) {
      if (i !== fighterPos){
        enemies.push(fighters[i]);
      }
    }
    rounds = enemies.length;
    areaFighters.fadeOut(1000,printChampion);
  }

  // print champion onto HTML
  function printChampion(){
    champEl.html(champion.name);
    colPlay.removeClass('hide').addClass('show');
    areaPlay.fadeIn(1000, function(){
      printEnemies();  
    });
  }

  // print enemies onto HTML
  function printEnemies(){
    for (var i = 0; i < enemies.length; i++) {
      var en = $('<div class="fighter enemy" data-fighter-pos="'+fighters.indexOf(enemies[i])+'">'+enemies[i].name+'</div>');
      en.appendTo(colEnemies);
      colEnemies.removeClass('hide').addClass('show');
    }
  }

  // select defender (user)
  function selectDef(enPos){
    defender = fighters[enPos];
    var defEl = $('.enemy[data-fighter-pos="'+enPos+'"');
    defEl.hide();
    printDef();
  }

  // print defender
  function printDef(){
    defEl.html(defender.name);
    rowAttack.removeClass('hide').addClass('show');
  }

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
        alert('Select New Defender');
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
    var playAgain = confirm('Woo! You Win! Play Again?');

    if(playAgain){
      reset();
    }
  }

  // handle loss
  function handleLoss(){
    var playAgain = confirm('Womp. You Lose. Play Again?');

    if(playAgain){
      reset();
    }
  }

  // reset/init game
  function reset(){
    areaPlay.fadeOut(1000,function(){
      colPlay.removeClass('show').addClass('hide');
      colEnemies.removeClass('show').addClass('hide');
      rowAttack.removeClass('show').addClass('hide');

      rowFighters.empty();
      defEl.empty();
      champEl.empty();
      $('.enemy').remove();

      init();
    });
  }

  function init(){

    areaFighters.fadeIn(1000);

    fighters = [
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
      }
    ];

    champion = '';
    defender = '';
    enemies = [];
    rounds = 0;

    printFighters();
  }






  // RUN THE TRAPPPPPPPPPPPP
  // ##########################################

  // start game
  init();
  var fighter = rowFighters.find('.fighter');
  


  // user selects a fighter
  $(document).on('click', '.row-fighters .fighter', function(){
    var pos = $(this).data('fighter-pos');
    selectChamp(pos);
  });

  // user selects a defender
  $(document).on('click','.enemy', function(){
    var pos = $(this).data('fighter-pos');
    selectDef(pos);
  });

  // user attacks
  $(document).on('click', '.attack', function(){
    attack(champion,defender);
  });
});