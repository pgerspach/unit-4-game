$(document).ready(function() {
  var gameStruct;

  function defineGameArray() {
    gameStruct = {
      characters: {
        //Object of character objects. This design is intended to make the addition/removal of characters to/from the game easy as editing just this part.
        gandalf: {
          class: "gandalf",
          health: 230,
          baseAttack: 9,
          attack: 9,
          counter: 13,
          text: "Gandalf",
          image: "assets/images/gandalf.jpg"
        },
        sauron: {
          class: "sauron",
          health: 180,
          baseAttack: 11,
          attack: 11,
          counter: 19,
          text: "Sauron",
          image: "assets/images/sauron.jpg"
        },
        aragorn: {
          class: "aragorn",
          health: 200,
          baseAttack: 8,
          attack: 8,
          counter: 14,
          text: "Aragorn",
          image: "assets/images/aragorn.png"
        },
        legolas: {
          class: "legolas",
          health: 190,
          baseAttack: 7,
          attack: 8,
          counter: 17,
          text: "Legolas",
          image: "assets/images/legolas.jpg"
        },
        urukHai: {
          // to add Uruk-hai to game all you have to do is uncomment
          class: "urukHai",
          health: 145,
          baseAttack: 11,
          attack: 10,
          counter: 19,
          text: "Uruk-Hai",
          image: "assets/images/uruk-hai.jpg"
        }
        // hobbits: {
        //   class: "hobbits",
        //   health: 250,
        //   baseAttack: 8,
        //   attack: 6,
        //   counter: 16,
        //   text: "Frodo, Sam, Pip, + Merry",
        //   image: "assets/images/hobbits.jpg"
        // }
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
            "HP: " + String(gameThis.characters[char].health)
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
  var oppLeft = 0;
  gameStart();
  // Build characters in each section (select,user,enemy choice, defender)
  function gameStart() {
    defineGameArray();
    $(".defender").html("");
    $(".characterIcons").html("");
    $(".userCharacter").html("");
    $(".enemiesToChoose").html("");
    $(".dTitleText").attr("style", "display:block");
    $(".attackWrap").attr("style", "display:block");
    $(".playerHead").attr("style", "display:block");
    $(".playContent").attr("style", "display:block");

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
    $(".cSelect.character").hover(
      function() {
        var thisChar = $(this)
          .attr("class")
          .split(" ")[1];
        console.log(thisChar);
        $(".charPoints." + thisChar).html(
          "POWER: " + String(gameStruct.characters[thisChar].attack)
        );
      },
      function() {
        var thisChar = $(this)
          .attr("class")
          .split(" ")[1];
        console.log(thisChar);

        $(".charPoints." + thisChar).html(
          "HP: " + String(gameStruct.characters[thisChar].health)
        );
      }
    );

    $(".user.character").hover(
      function() {
        var thisChar = $(this)
          .attr("class")
          .split(" ")[1];
        console.log(thisChar);
        $(".charPoints." + thisChar).html(
          "POWER: " + String(gameStruct.characters[thisChar].attack)
        );
      },
      function() {
        var thisChar = $(this)
          .attr("class")
          .split(" ")[1];
        console.log(thisChar);

        $(".charPoints." + thisChar).html(
          "HP: " + String(gameStruct.characters[thisChar].health)
        );
      }
    );

    $(".opponent.character").hover(
      function() {
        var thisChar = $(this)
          .attr("class")
          .split(" ")[1];
        console.log(thisChar);
        $(".charPoints." + thisChar).html(
          "COUNTER: " + String(gameStruct.characters[thisChar].counter)
        );
      },
      function() {
        var thisChar = $(this)
          .attr("class")
          .split(" ")[1];
        console.log(thisChar);

        $(".charPoints." + thisChar).html(
          "HP: " + String(gameStruct.characters[thisChar].health)
        );
      }
    );

    $(".enemy.character").hover(
      function() {
        var thisChar = $(this)
          .attr("class")
          .split(" ")[1];
        console.log(thisChar);
        $(".charPoints." + thisChar).html(
          "COUNTER: " + String(gameStruct.characters[thisChar].counter)
        );
      },
      function() {
        var thisChar = $(this)
          .attr("class")
          .split(" ")[1];
        console.log(thisChar);

        $(".charPoints." + thisChar).html(
          "HP: " + String(gameStruct.characters[thisChar].health)
        );
      }
    );
  }

  $(".characterIcons").on("click", function(event) {
    //select user character, hide others
    var classList = $(event.target)
      .attr("class")
      .split(" ");
    //console.log(classList);
    //console.log(classList[1]);
    gameStruct.show([classList[1]], "user");
    gameStruct.hide(gameStruct.allChar(), "cSelect");
    for (let name in gameStruct.allChar()) {
      if (gameStruct.allChar()[name] != classList[1]) {
        gameStruct.show([gameStruct.allChar()[name]], "enemy");
      }
    }
    oppLeft = Object.keys(gameStruct.characters).length - 1;
    //console.log("Opponents Left: "+oppLeft);
  });

  //   $(".character.user").on("click", function(event) {});

  $(".enemiesToChoose").on("click", function(event) {
    //select user opponent, hide others
    if (!attackMode && gameOn) {
      var classList = $(event.target)
        .attr("class")
        .split(" ");
      //console.log(classList);
      //console.log(classList[1]);
      gameStruct.show([classList[1]], "opponent");
      gameStruct.hide([classList[1]], "enemy");
      attackMode = true;
      $(".attackWrap").attr("style", "display:flex");
      $(".dTitleText").attr("style", "display:flex");

      $(".result").attr("style", "display:none");
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
      gameStruct.characters[oppTag].health = Math.floor(
        Number($(".opponent.active").attr("value")) -
          gameStruct.characters[userTag].attack
      );
      $(".opponent.active").attr(
        "value",
        String(gameStruct.characters[oppTag].health)
      );
      $(".charPoints." + oppTag + ".opponent").html(
        "HP: " + String($(".opponent.active").attr("value"))
      );
      if (!didWin(userTag, oppTag)) {
        oppCounter(userTag, oppTag);

        didLose(userTag, oppTag);
      }
    }
  });

  function didWin(userTag, oppTag) {
    if (Math.floor(Number($(".opponent.active").attr("value")) <= 0)) {
      $(".result").html(oppTag.toUpperCase() + " has been defeated!");
      $(".result").attr("style", "display:block");
      gameStruct.hide([oppTag], "opponent");
      attackMode = false;
      $(".attackWrap").attr("style", "display:none");
      $(".dTitleText").attr("style", "display:none");
      oppLeft -= 1;
      console.log("Opponents Left: " + oppLeft);

      if (oppLeft <= 0) {
        $(".result").html($(".result").html() + " YOU WIN!!");
        $(".rstButton").attr("style", "display:flex");
        $(".reSomething").html("REPLAY");
      }
      return true;
    } else {
      return false;
    }
  }

  function oppCounter(userTag, oppTag) {
    gameStruct.characters[userTag].attack =
      gameStruct.characters[userTag].attack +
      gameStruct.characters[userTag].baseAttack;
    gameStruct.characters[userTag].health = Math.floor(
      Number($(".user.active").attr("value")) -
        gameStruct.characters[oppTag].counter
    );

    $(".user.active").attr(
      "value",
      String(gameStruct.characters[userTag].health)
    );
    $(".charPoints." + userTag + ".user").html(
      "HP: " + String($(".user.active").attr("value"))
    );
  }

  function didLose(userTag, oppTag) {
    if (Math.floor(Number($(".user.active").attr("value")) <= 0)) {
      $(".result").html(
        userTag.toUpperCase() + " has been defeated! YOU LOSE!"
      );
      $(".result").attr("style", "display:block");
      gameStruct.hide([userTag], "user");
      gameStruct.hide([oppTag], "opponent");

      attackMode = false;
      gameOn = false;

      $(".rstButton").attr("style", "display:flex");
      $(".reSomething").html("RESTART");

      $(".dTitleText").attr("style", "display:none");
      $(".attackWrap").attr("style", "display:none");
      $(".playerHead").attr("style", "display:none");
      $(".playContent").attr("style", "display:none");
    }
  }

  $(".rstButton").on("click", function() {
    gameStart();
  });
});
