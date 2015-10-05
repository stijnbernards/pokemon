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
    new pokemonCore.npc(
        null,
        "w",
        ["When a POK&eacute;MON battle starts, the one at the left of the list goes out first.", "So, when you get more POK&eacuteMON in your party, try switching aroun the order", "of your POK&eacuteMON."],
        null,
        null,
        null,
        [7, 5],
        false,
        false
    ),
]