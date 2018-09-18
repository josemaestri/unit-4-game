


// GET READY
$(document).ready(function() {

  // GLOBAL VARIABLES
  // ##########################################
  var fighters;

  var champion;
  var defender;
  var enemies = [];
  var rounds;
  var playAgain;


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
      var el = $('<div class="col-md-6 col-lg-3 mb-3"><div class="fighter card text-center bg-transparent p-2" data-fighter="'+fighters[i].id+'" data-fighter-pos="'+i+'"><img class="card-img-top img-responsive img-fluid rounded" src="'+fighters[i].img+'" alt="'+fighters[i].name+'"><div class="card-body"><h5 class="card-title">'+fighters[i].name+'</h5><p class="card-text">Health: '+fighters[i].health+'</p></div></div></div>');
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
    areaFighters.fadeOut(500,printChampion);
  }

  // print champion onto HTML
  function printChampion(){
    champEl.html('<div class="fighter enemy media p-2 m-2 rounded"><div class="media-body"><h5>'+champion.name+'</h5><p>Health: <span class="champion-health fighter-health">'+champion.health+'</span></p></div><img src="'+champion.img+'" alt="" width="45" class="img-responsive rounded" /></div>');
    colPlay.removeClass('hide').addClass('show');
    areaPlay.fadeIn(500, function(){
      printEnemies();  
    });
  }

  // print enemies onto HTML
  function printEnemies(){
    for (var i = 0; i < enemies.length; i++) {
      var en = $('<div class="fighter enemy media p-2 m-2 rounded" data-fighter-pos="'+fighters.indexOf(enemies[i])+'"><div class="media-body"><h5>'+enemies[i].name+'</h5><p>Health: '+enemies[i].health+'</p></div><img src="'+enemies[i].img+'" alt="" width="45" class="img-responsive rounded" /></div>');
      en.appendTo(colEnemies);
      colEnemies.removeClass('hide').addClass('show');
    }
  }

  // select defender (user)
  function selectDef(enPos){
    if(defEl.children().length < 1){
      defender = fighters[enPos];
      var enEl = $('.enemy[data-fighter-pos="'+enPos+'"');
      enEl.hide();
      printDef();
    }
  }

  // print defender
  function printDef(){
    champEl.find('.fighter').removeClass('bg-info');
    defEl.html('<div class="fighter enemy media p-2 m-2 rounded"><div class="media-body"><h5>'+defender.name+'</h5><p>Health: <span class="defender-health fighter-health">'+defender.health+'</span></p></div><img src="'+defender.img+'" alt="" width="45" class="img-responsive rounded" /></div>');
    rowAttack.removeClass('hide').addClass('show');
    // fighterHealth = $('.fighter-health');
    // console.log(fighterHealth);
  }

  function printHealth(fighter){

    if(fighter === champion){
      $('.champion-health').text(fighter.health);
    } else{
      $('.defender-health').text(fighter.health);
    }
  }

  // attack (user)
  function attack(champ, def) {

    var damage = champ.xp * champ.attack;

    def.health = def.health - damage;
    printHealth(def);
    champ.xp++;
    
    checkIfDead(def);

    if(!def.isDead){
      defend(def, champ);
    } else{
      rounds--;
      if(rounds > 0){
        champEl.find('.fighter').addClass('bg-info');
        setTimeout(function(){alert('Select New Defender')},250);
        defEl.empty();
        rowAttack.removeClass('show').addClass('hide');
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
    printHealth(champ);
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
    

    colEnemies.find('.fighter').addClass('disabled');
    defEl.find('.fighter').addClass('disabled');
    champEl.find('.fighter').addClass('bg-info');
    rowAttack.removeClass('show').addClass('hide');

    setTimeout(function(){
      playAgain = confirm('Woo! You Win! Play Again?');
      if(playAgain){
        reset();
      }
    }, 500);


  }

  // handle loss
  function handleLoss(){

    colEnemies.find('.fighter').addClass('disabled');
    champEl.find('.fighter').addClass('disabled');
    defEl.find('.fighter').addClass('bg-info');
    rowAttack.removeClass('show').addClass('hide');

    setTimeout(function(){
     playAgain = confirm('Womp. You Lose. Play Again?'); 
     if(playAgain){
       reset();
     } 
    }, 500);

    
  }

  // reset/init game
  function reset(){
    areaPlay.fadeOut(500,function(){
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

    areaFighters.fadeIn(500);

    fighters = [
      {
        id: 'clu',
        name: 'Clu',
        img: 'assets/img/clu.jpg',
        health: 125,
        attack: 5,
        xp: 1
      },
      {
        id: 'tron',
        name: 'Tron/Rinzler',
        img: 'assets/img/tron.png',
        health: 150,
        attack: 10,
        xp: 1
      },
      {
        id: 'quorra',
        name: 'Quorra',
        img: 'assets/img/quorra.png',
        health: 175,
        attack: 15,
        xp: 1
      },
      {
        id: 'zuse',
        name: 'Zuse/Castor',
        img: 'assets/img/zuse.jpg',
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