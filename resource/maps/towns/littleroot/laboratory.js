var map = [
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,1,0,0,0,0,0,0,0,0,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,0,0,0,0,0,0,1,1,0],
        [1,1,1,1,0,0,0,0,0,0,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,1,1],
        [0,0,0,1,0,0,8,0,0,0,0,0,0],
        [1,1,1,1,1,1,[7, function(){ pokemonCore.maps.mapLastCoord[5] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(0); }],[7, function(){ pokemonCore.maps.mapLastCoord[5] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(0); }],1,1,1,1,1]
    ],
    "towns/littleroot/laboratory.png"
];
var npc = null;