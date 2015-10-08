var map = [
    [
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,1,[7, function(){ pokemonCore.maps.mapLastCoord[3] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(4); }],1,0,0,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,1,0,0,0],
        [0,0,0,0,0,0,1,1,0,0,0],
        [0,8,0,0,0,0,0,0,0,0,0],
        [1,[7, function(){ pokemonCore.maps.mapLastCoord[3] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(0);}],[7, function(){ pokemonCore.maps.mapLastCoord[3] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(0);}],1,1,1,1,1,1,1,1]
    ],
    "towns/littleroot/rival_home_f1.png"
];
var npc = null;

var onEnterFunc = function(){
    if(typeof pokemonCore.gameChar.hasEntered.rivalf1 == 'undefined'){

    }
}