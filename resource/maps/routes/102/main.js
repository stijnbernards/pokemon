var map = [
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,9,9,9,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,9,9,9,9,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,9,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,9,9,9,9,1,0,0,1,1,1,1,1,1,1],
        [1,1,9,9,9,9,9,9,9,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,2,0,9,9,9,9,1,0,0,1,1,1,1,1,1,1],
        [1,1,9,9,9,9,9,9,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,2,0,0,9,9,9,1,0,0,0,0,1,1,1,1,1],
        [[7, function() { pokemonCore.maps.mapLastCoord[10] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(13);}],0,0,9,9,9,9,9,9,9,0,0,0,0,1,1,2,2,0,0,2,2,2,2,2,2,0,0,0,0,1,1,0,6,2,0,0,0,9,9,1,1,1,1,1,1,1,1,1,1],
        [[7, function() { pokemonCore.maps.mapLastCoord[10] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(13);}],0,0,0,9,9,9,9,0,0,0,0,0,0,1,1,0,0,0,0,9,9,9,9,9,0,1,1,1,1,1,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [[7, function() { pokemonCore.maps.mapLastCoord[10] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(13);}],0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,9,9,9,9,9,9,9,0,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [[7, function() { pokemonCore.maps.mapLastCoord[10] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(13);}],0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,9,9,9,9,9,9,9,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1],
        [1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,9,9,9,9,9,9,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,8,[7, function() { pokemonCore.maps.mapLastCoord[10] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(7);}]],
        [1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,9,9,9,9,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,[7, function() { pokemonCore.maps.mapLastCoord[10] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(7);}]],
        [1,1,1,1,1,1,9,9,0,0,1,1,1,1,1,1,9,9,9,0,0,0,0,0,0,0,1,1,1,1,9,9,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,1,1,1,1,9,9,2,2,2,2,1,1,1,1,9,9,0,0,0,1,1,0,0,0,0,0,9,9,9,9,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,1,1,1,1,9,9,9,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,0,0,0,9,9,9,9,9,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,9,9,9,0,0,0,1,1,1,1,1,1,0,0,9,9,9,1,1,0,0,0,0,9,9,9,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,9,9,9,9,1,1,1,1,1,1,1,1,0,9,9,9,9,9,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,9,9,9,9,1,1,1,1,1,1,1,1,0,9,9,9,9,9,9,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,9,9,9,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,9,9,9,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    "routes/102/main.png"
];
var npc = [
    new pokemonCore.npc(
        null,
        "YOUNGSTER-CALVIN",
        ["If you have POKeMON with you, then you're an official POKeMON TRAINER!", "You can't say no to my challenge!"],
        null,
        null,
        null,
        [34,14],
        {
            pokemon:[
                {
                    pokemon: {
                        pokemon: new pokemonCore.pokemon.instantiate(261),
                        level: 5,
                    }
                },
            ]
        },
        false,
        ["YOUNGSTER CALVIN would like to battle!"],
        ["Arrgh, I lost... I should have trained mine more..."],
        "down"
    ),
    new pokemonCore.npc(
        null,
        "BUG_CATCHER_RICK",
        ["Hahah! Our eyes met! I'll take you on with my BUG POK&eacute;MON!"],
        null,
        null,
        null,
        [26,15],
        {
            pokemon:[
                {
                    pokemon: {
                        pokemon: new pokemonCore.pokemon.instantiate(265),
                        level: 4,
                    }
                },
            ],
            pokemon:[
                {
                    pokemon: {
                        pokemon: new pokemonCore.pokemon.instantiate(265),
                        level: 4,
                    }
                },
            ]
        },
        false,
        ["BUG CATCHER RICK would like to battle!"],
        ["Ow! Down and out!"],
        "up"
    ),
    new pokemonCore.npc(
        null,
        "2",
        ["I'm... not very tall, so I sink right into tall grass.", "The grass goes up my nose and... Fwafwafwafwafwa...", "Fwatchoo!"],
        null,
        null,
        null,
        [19, 11],
        false,
        true
    ),
    new pokemonCore.npc(
        null,
        "YOUNGSTER_ALLEN",
        ["Did you just become a TRAINER? We're both beginners!"],
        null,
        null,
        null,
        [20,4],
        {
            pokemon:[
                {
                    pokemon: {
                        pokemon: new pokemonCore.pokemon.instantiate(261),
                        level: 5,
                    }
                },
            ],
            pokemon:[
                {
                    pokemon: {
                        pokemon: new pokemonCore.pokemon.instantiate(276),
                        level: 3,
                    }
                },
            ]
        },
        false,
        ["YOUNGSTER_ALLEN would like to battle!"],
        ["I called you because I thought I could beat you..."],
        "up"
    ),
    new pokemonCore.npc(
        [[37, 5],[39, 3]],
        "2",
        ["I'm going to catch a whole bunch of POK&eacute;MON!"],
        null,
        null,
        null,
        [37, 5],
        false,
        true
    ),
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

var music = {
    ambient: "route101.mp3"
}