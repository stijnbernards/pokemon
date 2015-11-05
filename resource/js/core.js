//Core file
$(document).ready(function(){
    //pokemonCore.displayGrid = true;
    $(".A").bind("click", function(){
        $(document).trigger(jQuery.Event( 'keydown', { keyCode: 32, which: 32 } ));
    });

    $(".up").bind("click", function(){
        $(document).trigger(jQuery.Event( 'keydown', { keyCode: 38, which: 38 } ));
    });

    $(".down").bind("click", function(){
        $(document).trigger(jQuery.Event( 'keydown', { keyCode: 40, which: 40 } ));
    });

    $(".left").bind("click", function(){
        $(document).trigger(jQuery.Event( 'keydown', { keyCode: 37, which: 37 } ));
    });

    $(".right").bind("click", function(){
        $(document).trigger(jQuery.Event( 'keydown', { keyCode: 39, which: 39 } ));
    });

    $(".B").bind("click", function(){
        $(document).trigger(jQuery.Event( 'keydown', { keyCode: 9, which: 9 } ));
    });
    pokemonCore.init();
    var pokemon =
        {
            pokemon: new pokemonCore.pokemon.instantiate(252),
            rarity: 10,
            level: [2,3,4]
        };
    setTimeout(function(){
        //pokemonCore.items.instantiate("pokeball").buy();
        //pokemonCore.battle.startBattleScreen(pokemon);
    }, 500);
});