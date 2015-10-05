var map = [
    [
        [1,1,1,1,1,1,1,1,1,1,[7, function(){pokemonCore.maps.mapLastCoord[6] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(7); }],[7, function(){pokemonCore.maps.mapLastCoord[6] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(7); }],[7, function(){pokemonCore.maps.mapLastCoord[6] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(7); }],[7, function(){pokemonCore.maps.mapLastCoord[6] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(7); }],1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,9,9,9,0,0,0,0,0,0,0,0,9,9,9,1,1,1,1,1,1],
        [1,1,1,1,9,9,9,9,0,0,0,0,0,0,9,9,9,9,1,1,1,1,1,1],
        [1,1,9,9,9,9,9,9,0,0,0,0,0,0,9,9,9,9,9,9,1,1,1,1],
        [1,1,9,9,9,9,9,0,0,0,0,0,0,0,9,9,9,9,9,9,1,1,1,1],
        [1,1,1,1,9,9,0,0,1,[2, "down"],[2, "down"],[2, "down"],[2, "down"],1,1,9,9,9,9,0,0,0,1,1],
        [1,1,1,1,[2, "down"],[2, "down"],[2, "down"],[2, "down"],1,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1],
        [1,1,1,1,1,1,0,[4, function(){ alert('hoi'); }],0,0,0,0,0,1,1,9,9,0,0,0,0,0,1,1],
        [1,1,1,1,1,1,0,0,0,0,0,0,0,9,9,9,9,9,0,0,0,0,1,1],
        [1,1,1,1,1,1,0,0,0,0,0,0,0,9,9,9,9,9,9,0,0,0,1,1],
        [1,1,1,1,1,1,0,0,0,0,0,0,0,9,9,9,9,9,9,0,0,0,1,1],
        [1,1,1,1,9,9,0,0,0,0,[2, "down"],[2, "down"],[2, "down"],[2, "down"],9,9,9,9,9,0,0,0,1,1],
        [1,1,9,9,9,9,9,0,0,0,0,0,0,0,1,1,9,9,0,0,1,1,1,1],
        [1,1,9,9,9,9,9,9,0,0,0,0,0,0,1,1,9,9,0,0,1,1,1,1],
        [1,1,1,1,9,9,9,9,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,9,9,9,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,8,0,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,[7, function(){pokemonCore.maps.mapLastCoord[6] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(0); }],[7, function(){pokemonCore.maps.mapLastCoord[6] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(0); }],1,1,1,1,1,1,1,1,1,1],
    ],
    "routes/101/main.png"
];
var npc = [
    new pokemonCore.npc(
        [
            [6, 14],
            [5, 14]
        ],
        "1",
        ["Wild POK&eacute;MON will jump out at you in tall grass.", "If you want to catch POK&eacute;MON, you have to go into the tall grass and search."],
        null,
        null,
        null,
        [6, 14],
        false,
        false
    ),
    new pokemonCore.npc(
        null,
        "2",
        ["If pokemon get tired, take them to a POK&eacute;MON CENTER.", "There's a POK&eacute;MON CENTER in OLDALE TOWN right close by."],
        null,
        null,
        null,
        [19, 9],
        false,
        true
    )
];

var pokemon = [
    {
        pokemon: new pokemonCore.pokemon.instantiate(261),
        rarity: 6.75,
        level: [2,3]
    },
    {
        pokemon: new pokemonCore.pokemon.instantiate(263),
        rarity: 8.5,
        level: [2,3]
    },
    {
        pokemon: new pokemonCore.pokemon.instantiate(265),
        rarity: 8.5,
        level: [2,3]
    }
];

//new pokemonCore.npc(
//    [
//        [19,18],
//        [16,14]
//    ],
//    "nigger",
//    ["Kapot met ou"],
//    null,
//    null,
//    null,
//    [17,14],
//    {
//        pokemon:[
//            {
//                pokemon: {
//                    pokemon: new pokemonCore.pokemon.instantiate(252),
//                    level: 3,
//                }
//            },
//            {
//                pokemon: {
//                    pokemon: new pokemonCore.pokemon.instantiate(252),
//                    level: 4,
//                }
//            }
//        ]
//    },
//    false,
//    ["Ik guj ou slopen"],
//    ["Kak"]
//),
var music = {
    ambient: "route101.mp3"
}