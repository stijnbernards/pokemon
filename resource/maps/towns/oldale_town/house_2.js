var map = [
    [
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,0,0,0,0],
        [0,0,0,0,0,1,1,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,8,0,0,0,0,0,0,1],
        [1,1,1,[7, function() { pokemonCore.maps.mapLastCoord[12] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(7);}],[7, function() { pokemonCore.maps.mapLastCoord[12] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(7);}],1,1,1,1,1,1],
    ],
    "towns/oldale_town/house_2.png"
];

var npc = [
    new pokemonCore.npc(
        null,
        "1",
        ["When POK&eacuteMON battle, they eventually level up and become stronger."],
        null,
        null,
        null,
        [5, 5],
        false,
        false
    ),
    new pokemonCore.npc(
        null,
        "2",
        ["If the POK&eacuteMON with you become stronger, you'll be able to go farther away from here."],
        null,
        null,
        null,
        [8, 5],
        false,
        false
    ),
]