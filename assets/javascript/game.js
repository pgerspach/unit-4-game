$(document).ready(function() {

    var charGandalf = '<div class="character gandalf" value="g"><h3 class="charTitle"> Gandalf</h3><img class="charImg" src="assets/images/gandalf.jpg" width:"200px" height:"200px" alt="Here lies gandalf"><h3 class="charPoints"> 230</h3></div>';
    var charSauron = '<div class="character sauron" value="s"><h3 class="charTitle"> Sauron</h3><img class="charImg" src="assets/images/sauron.jpg" width:"200px" height:"200px" alt="Here lies sauron"><h3 class="charPoints"> 230</h3></div>';
    var charAragorn = '<div class="character aragorn" value="a"><h3 class="charTitle"> Aragorn</h3><img class="charImg" src="assets/images/aragorn.png" width:"200px" height:"200px" alt="Here lies aragorn"><h3 class="charPoints"> 230</h3></div>';
    var charLegolas = '<div class="character legolas" value="l"><h3 class="charTitle"> Legolas</h3><img class="charImg" src="assets/images/legolas.jpg" width:"200px" height:"200px" alt="Here lies legolas"><h3 class="charPoints"> 230</h3></div>';

    var charactersObject={
        gandalf:{
            htmlCode: charGandalf,

            userChose: function(){
                $(".userCharacter").html(this.htmlCode);
                console.log(this);
            },  
            enemy: function(){
                $(".enemiesToChoose").html($(".enemiesToChoose").html()+this.htmlCode);
            }
        },
        sauron:{
            htmlCode:charSauron,
            userChose: function(){
                $(".userCharacter").html(this.htmlCode);
                console.log(this);
            },
            enemy: function(){
                $(".enemiesToChoose").html($(".enemiesToChoose").html()+this.htmlCode);
            }
        },
        aragorn:{
            htmlCode:charAragorn,
            userChose: function(){
                $(".userCharacter").html(this.htmlCode);
                console.log(this);
            },
            enemy: function(){
                $(".enemiesToChoose").html($(".enemiesToChoose").html()+this.htmlCode);
            }

        },
        legolas:{
            htmlCode:charLegolas,
            userChose: function(){
                $(".userCharacter").html(this.htmlCode);
                console.log(this);
            },
            enemy: function(){
                $(".enemiesToChoose").html($(".enemiesToChoose").html()+this.htmlCode);
            }
        },

        allEnemiesOn: function(){
            $(".characterIcons").html(charGandalf+charSauron+charAragorn+charLegolas);
        },

        allEnemiesOff: function(){
            $(".characterIcons").html("");

        }

        
    };
    charactersObject.allEnemiesOn();
    
    $(".character").on("click", function(){

        if($(this).attr("value")==="g"){
            charactersObject.gandalf.userChose();
            charactersObject.allEnemiesOff();
            charactersObject.legolas.enemy();
            charactersObject.sauron.enemy();
            console.log("HERE");
            charactersObject.aragorn.enemy();
        }
        else if($(this).attr("value")==="s"){
            charactersObject.sauron.userChose();
            charactersObject.allEnemiesOff();
            charactersObject.legolas.enemy();
            charactersObject.aragorn.enemy();
            charactersObject.gandalf.enemy();
        }
        else if($(this).attr("value")==="a"){
            charactersObject.aragorn.userChose();
            charactersObject.allEnemiesOff();
            charactersObject.legolas.enemy();
            charactersObject.sauron.enemy();
            charactersObject.gandalf.enemy();
        }
        else  if($(this).attr("value")==="l"){
            charactersObject.legolas.userChose();
            charactersObject.allEnemiesOff();
            charactersObject.aragorn.enemy();
            charactersObject.sauron.enemy();
            charactersObject.gandalf.enemy();
        }


    })

});