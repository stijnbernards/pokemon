var map = [
    [
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,1,1],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,0,0,0,0,0,0],
        [0,0,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,8,0,0,0,0,0,1],
        [1,1,1,[7, function() { pokemonCore.maps.mapLastCoord[11] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(7);}],[7, function() { pokemonCore.maps.mapLastCoord[11] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(7);}],1,1,1,1,1],
    ],
    "towns/oldale_town/house_1.png"
];

var npc = [

]