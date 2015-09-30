//Core file
$(document).ready(function(){
    pokemonCore.displayGrid = true;
    pokemonCore.init();
    var pokemon =
        {
            pokemon: new pokemonCore.pokemon.instantiate(252),
            rarity: 10,
            level: [2,3,4]
        };
    setTimeout(function(){
        //pokemonCore.battle.startBattleScreen(pokemon);
    }, 500);
});