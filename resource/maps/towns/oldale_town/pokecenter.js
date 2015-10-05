var map = [
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,[12, function(){pokemonCore.specialInteract.pc();}],1,1,1],
        [1,0,0,0,1,1,1,0,1,1,0,0,0,1],
        [0,0,0,0,1,1,1,[12, function(){pokemonCore.specialInteract.pokecenter();}],1,1,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0,0,1,1,0],
        [1,1,0,0,0,0,0,0,0,0,0,1,1,0],
        [1,0,0,0,0,0,8,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,[7, function() { pokemonCore.maps.mapLastCoord[14] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(7);}],[7, function() { pokemonCore.maps.mapLastCoord[14] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(7);}],1,1,1,1,1,1],
    ],
    "towns/buildings/pokecenter.png"
];

var npc = [
    new pokemonCore.npc(
        null,
        "2",
        ["The POK&eacuteMON WIRELESS CLUB on the second floor has not yet been build."],
        null,
        null,
        null,
        [4, 8],
        false,
        false
    ),
    new pokemonCore.npc(
        null,
        "2",
        ["POK&eacuteMON centers are great!", "You can restore your POK&eacuteMON there and it's all for free!"],
        null,
        null,
        null,
        [4, 8],
        false,
        false
    ),
];

