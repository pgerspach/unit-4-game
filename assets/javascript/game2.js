$(document).ready(function() {
  var charGandalf =
    '<div class="character gandalf" value="230"><h3 class="charTitle"> Gandalf</h3><img class="charImg" src="assets/images/gandalf.jpg" width:"200px" height:"200px" alt="Here lies gandalf"><h3 class="gandalf charPoints"> </h3></div>';
  var charSauron =
    '<div class="character sauron" value="300"><h3 class="charTitle"> Sauron</h3><img class="charImg" src="assets/images/sauron.jpg" width:"200px" height:"200px" alt="Here lies sauron"><h3 class="sauron charPoints"> </h3></div>';
  var charAragorn =
    '<div class="character aragorn" value="180"><h3 class="charTitle"> Aragorn</h3><img class="charImg" src="assets/images/aragorn.png" width:"200px" height:"200px" alt="Here lies aragorn"><h3 class=" aragorn charPoints"> </h3></div>';
  var charLegolas =
    '<div class="character legolas" value="150"><h3 class="charTitle"> Legolas</h3><img class="charImg" src="assets/images/legolas.jpg" width:"200px" height:"200px" alt="Here lies legolas"><h3 class="legolas charPoints"> </h3></div>';

  var charactersObject = {
    gandalf: {
      htmlCode: charGandalf,

      place: function(classLocale) {
        $(classLocale).html($(classLocale).html() + this.htmlCode);
      }
    },
    sauron: {
      htmlCode: charSauron,
      place: function(classLocale) {
        $(classLocale).html($(classLocale).html() + this.htmlCode);
      }
    },
    aragorn: {
      htmlCode: charAragorn,
      place: function(classLocale) {
        $(classLocale).html($(classLocale).html() + this.htmlCode);
      }
    },
    legolas: {
      htmlCode: charLegolas,
      place: function(classLocale) {
        $(classLocale).html($(classLocale).html() + this.htmlCode);
      }
    },

    allEnemiesOn: function() {
      $(".characterIcons").html(
        charGandalf + charSauron + charAragorn + charLegolas
      );
    },

    allEnemiesOff: function() {
      $(".characterIcons").html("");
    }
  };

  charactersObject.allEnemiesOn();
  var gameOn = false;
  var gameFight = false;
  var remEnemies = [];

  $(".character").on("click", function() {
    if (!gameOn) {
      if ($(this).attr("class") === "character gandalf") {
        charactersObject.gandalf.place(".userCharacter");
        charactersObject.allEnemiesOff();
        charactersObject.legolas.place(".enemiesToChoose");
        charactersObject.sauron.place(".enemiesToChoose");
        charactersObject.aragorn.place(".enemiesToChoose");
        remEnemies = [
          charactersObject.legolas,
          charactersObject.sauron,
          charactersObject.aragorn
        ];
      } else if ($(this).attr("class") === "character sauron") {
        charactersObject.sauron.place(".userCharacter");
        charactersObject.allEnemiesOff();
        charactersObject.legolas.place(".enemiesToChoose");
        charactersObject.aragorn.place(".enemiesToChoose");
        charactersObject.gandalf.place(".enemiesToChoose");
        remEnemies = [
          charactersObject.legolas,
          charactersObject.gandalf,
          charactersObject.aragorn
        ];
      } else if ($(this).attr("class") === "character aragorn") {
        charactersObject.aragorn.place(".userCharacter");
        charactersObject.allEnemiesOff();
        charactersObject.legolas.place(".enemiesToChoose");
        charactersObject.sauron.place(".enemiesToChoose");
        charactersObject.gandalf.place(".enemiesToChoose");
        remEnemies = [
          charactersObject.legolas,
          charactersObject.sauron,
          charactersObject.gandalf
        ];
      } else if ($(this).attr("class") === "character legolas") {
        charactersObject.legolas.place(".userCharacter");
        charactersObject.allEnemiesOff();
        charactersObject.aragorn.place(".enemiesToChoose");
        charactersObject.sauron.place(".enemiesToChoose");
        charactersObject.gandalf.place(".enemiesToChoose");
        remEnemies = [
          charactersObject.gandalf,
          charactersObject.sauron,
          charactersObject.aragorn
        ];
      }

      gameOn = true;
      console.log(remEnemies);
    } else {
        console.log("throughelseif");
      for (let enemy of remEnemies) {
        console.log("HELLO");
        if (enemy == this) {
          console.log("HEY YEAH");
        }
      }
    }
  });
});
