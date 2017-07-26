new Vue({
  el: '#app',
  data: {
    player: {
      health: 100
    },
    monster: {
      health: 100
    },
    game: {
      new: true,
      active: false,
      logs: false,
      end: false,
      winner: ''
    },
    logs: []
  },
  methods: {
    gameStart: function() {
      this.game.new = false;
      this.game.active = true;
      this.game.logs = false;
      this.game.end = false;

      this.player.health = 100;
      this.monster.health = 100;

      this.logs = [];

    },
    attack: function() {
      playerDamage = Math.round(Math.random() * 10);
      monsterDamage = Math.round(Math.random() * 10);

      if(this.game.logs == false){
        this.game.logs = true;
      }

      this.player.health = this.player.health - monsterDamage;
      this.monster.health = this.monster.health - playerDamage;

      this.logs.push({"object": "player", "message": "Player hits monster for " + playerDamage});
      this.logs.push({"object": "monster", "message": "Monster hits player for " + monsterDamage});

      this.checkWinner();
    },
    specialAttack: function() {
      playerDamage = Math.round(Math.random() * 20);
      monsterDamage = Math.round(Math.random() * 20);

      if(this.game.logs == false){
        this.game.logs = true;
      }

      this.player.health = this.player.health - monsterDamage;
      this.monster.health = this.monster.health - playerDamage;

      this.logs.push({"object": "player", "message": "Player hits monster with fireball for " + playerDamage});
      this.logs.push({"object": "monster", "message": "Monster hits player with vicious claws for " + monsterDamage});

      this.checkWinner();
    },
    heal: function() {
      playerHeal = Math.round(Math.random() * 20);
      monsterDamage = Math.round(Math.random() * 10);

      if(this.game.logs == false){
        this.game.logs = true;
      }

      this.player.health = this.player.health + playerHeal - monsterDamage;

      this.logs.push({"object": "player", "message": "Player heals for " + playerHeal});
      this.logs.push({"object": "monster", "message": "Monster hits player for " + monsterDamage});

      this.checkWinner();
    },
    checkWinner: function() {
      if(this.player.health < 1 || this.monster.health < 1){
        if(this.player.health > this.monster.health){
          this.game.winner = "Player is the winner!";
        } else if(this.player.health == this.monster.health) {
          this.game.winner = "Tie!";
        } else {
          this.game.winner = "Monster is the winner!";
        }
        this.end();
      }
    },
    surrender: function() {
      this.game.winner = "Monster is the winner!";
      this.end();
    },
    end: function() {
      this.game.end = true;
      this.game.new = true;
      this.game.active = false;
    }
  }
});
