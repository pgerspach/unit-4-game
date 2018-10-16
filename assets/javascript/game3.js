$(document).ready(function() {
  var gameStruct;

  function defineGameArray() {
    gameStruct = {
      characters: {
        //Object of character objects. This design is intended to make the addition/removal of characters to/from the game easy as editing just this part.
        gandalf: {
          class: "gandalf",
          health: 230,
          attack: 45,
          mult: 1.3,
          text: "Gandalf",
          image: "assets/images/gandalf.jpg"
        },
        sauron: {
          class: "sauron",
          health: 190,
          attack: 50,
          mult: 1.1,
          text: "Sauron",
          image: "assets/images/sauron.jpg"
        },
        aragorn: {
          class: "aragorn",
          health: 200,
          attack: 45,
          mult: 1.4,
          text: "Aragorn",
          image: "assets/images/aragorn.png"
        },
        legolas: {
          class: "legolas",
          health: 170,
          attack: 55,
          mult: 1.3,
          text: "Legolas",
          image: "assets/images/legolas.jpg"
        },
        urukHai: {
          // to add Uruk-hai to game all you have to do is uncomment
          class: "urukHai",
          health: 120,
          attack: 38,
          mult: 1.5,
          text: "Uruk-Hai",
          image: "assets/images/uruk-hai.jpg"
        }
      },
      standardIcon: function(section, classInsert, spec) {
        var retString =
          '<div class="' +
          section +
          " " +
          classInsert +
          " " +
          spec +
          '" value="' +
          gameStruct.characters[classInsert].health +
          '"><h3 class="charTitle ' +
          classInsert +
          " " +
          spec +
          '">' +
          gameStruct.characters[classInsert].text +
          ' </h3><img class="charImg ' +
          classInsert +
          " " +
          spec +
          '" src="" width:"200px" height:"200px" alt="Here lies character"><h3 class="charPoints ' +
          classInsert +
          " " +
          spec +
          '"> </h3></div>';
        return retString;
      },

      build: function(section, spec) {
        var gameThis = this;
        var charKeys = Object.keys(this.characters);
        for (let char of charKeys) {
          $("." + section).html(
            $("." + section).html() +
              gameThis.standardIcon(
                "character",
                gameThis.characters[char].class,
                spec
              )
          );
          $(".charImg." + gameThis.characters[char].class).attr(
            "src",
            gameThis.characters[char].image
          );
          $(".charPoints." + gameThis.characters[char].class).html(
            String(gameThis.characters[char].health)
          );
        }
      },
      allChar: function() {
        var charKeys = Object.keys(this.characters);
        var every = [];
        var gameThis = this;
        for (let char of charKeys) {
          every.push(gameThis.characters[char].class);
        }
        return every;
      },
      hide: function(which, where) {
        for (let char of which) {
          $(".character." + this.characters[char].class + "." + where).attr(
            "class",
            "character " +
              this.characters[char].class +
              " " +
              where +
              " " +
              "inactive"
          );
        }
      },
      show: function(which, where) {
        for (let char of which) {
          $(".character." + this.characters[char].class + "." + where).attr(
            "class",
            "character " +
              this.characters[char].class +
              " " +
              where +
              " " +
              "active"
          );
        }
      }
    };
  }

  var gameOn = false;
  var attackMode = false; //Not attack mode until a defender has been chosen

  gameStart();
  // Build characters in each section (select,user,enemy choice, defender)
  function gameStart() {
    defineGameArray();
    $(".defender").html("");
    $(".characterIcons").html("");
    $(".userCharacter").html("");
    $(".enemiesToChoose").html("");

    gameStruct.build("characterIcons", "cSelect");
    gameStruct.build("userCharacter", "user");
    gameStruct.build("enemiesToChoose", "enemy");
    gameStruct.build("defender", "opponent");

    // Initially hide all characters everywhere except user select
    gameStruct.hide(gameStruct.allChar(), "user");
    gameStruct.hide(gameStruct.allChar(), "enemy");
    gameStruct.hide(gameStruct.allChar(), "opponent");
    $(".rstButton").attr("style", "display:none");
    $(".result").html("");
    //var enemiesLeft=[];
    attackMode = false; //Not attack mode until a defender has been chosen
    gameOn = true;
  }

  $(".characterIcons").on("click", function(event) {
    //select user character, hide others
    var classList = $(event.target)
      .attr("class")
      .split(" ");
    console.log(classList);
    console.log(classList[1]);
    gameStruct.show([classList[1]], "user");
    gameStruct.hide(gameStruct.allChar(), "cSelect");
    for (let name in gameStruct.allChar()) {
      if (gameStruct.allChar()[name] != classList[1]) {
        gameStruct.show([gameStruct.allChar()[name]], "enemy");
      }
      //enemiesLeft.push(gameStruct.allChar()[name]);
    }
  });

  //   $(".character.user").on("click", function(event) {});

  $(".enemiesToChoose").on("click", function(event) {
    //select user opponent, hide others
    if (!attackMode && gameOn) {
      var classList = $(event.target)
        .attr("class")
        .split(" ");
      console.log(classList);
      console.log(classList[1]);
      gameStruct.show([classList[1]], "opponent");
      gameStruct.hide([classList[1]], "enemy");
      attackMode = true;
    }
  });

  $(".attackButton").on("click", function(event) {
    //after everything has been selected, look for attack button to be pressed
    if (attackMode) {
      var userTag = $(".user.active")
        .attr("class")
        .split(" ")[1];
      var oppTag = $(".opponent.active")
        .attr("class")
        .split(" ")[1];
      var oppAttack = gameStruct.characters[oppTag].attack;
      var userAttack = gameStruct.characters[userTag].attack;
      var oppHealth = gameStruct.characters[oppTag].health;
      var userHealth = gameStruct.characters[userTag].health;
      console.log(oppTag);

      $(".opponent.active").attr(
        "value",
        String(
          Math.floor(Number($(".opponent.active").attr("value")) - userAttack)
        )
      );
      $(".charPoints." + oppTag + ".opponent").html(
        String($(".opponent.active").attr("value"))
      );
      if (Math.floor(Number($(".opponent.active").attr("value")) <= 0)) {
        $(".result").html(oppTag.toUpperCase() + " has been defeated!");
        gameStruct.hide([oppTag], "opponent");
        attackMode = false;
      } else {
        gameStruct.characters[userTag].attack =
          gameStruct.characters[userTag].attack *
          gameStruct.characters[userTag].mult;
        $(".user.active").attr(
          "value",
          String(
            Math.floor(Number($(".user.active").attr("value")) - oppAttack)
          )
        );
        $(".charPoints." + userTag + ".user").html(
          String($(".user.active").attr("value"))
        );
        if (Math.floor(Number($(".user.active").attr("value")) <= 0)) {
          $(".result").html(
            userTag.toUpperCase() + " has been defeated! YOU LOSE!"
          );
          gameStruct.hide([userTag], "user");
          gameStruct.hide([oppTag], "opponent");

          attackMode = false;
          gameOn = false;
          $(".rstButton").attr("style", "display:block");
        }
      }
    }
  });
  $(".rstButton").on("click", function(event) {
    //after everything has been selected, look for attack button to be pressed
    gameStart();
  });
});
