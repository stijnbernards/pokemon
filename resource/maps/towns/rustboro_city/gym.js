var map = [
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1],
        [1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1],
        [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, [7, function() { pokemonCore.maps.mapLastCoord[25] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(22);}], [7, function() { pokemonCore.maps.mapLastCoord[25] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(22);}], 1, 1, 1, 1]
    ],
    "towns/rustboro_city/gym.png"
];

var npc = [
    new pokemonCore.npc(
        null,
        "YOUNGSTER_JOSH",
        ["Did you just become a TRAINER? We're both beginners!"],
        null,
        null,
        null,
        [8, 13],
        {
            pokemon:[
                {
                    pokemon: {
                        pokemon: new pokemonCore.pokemon.instantiate("074"),
                        level: 10,
                    }
                },
                {
                    pokemon: {
                        pokemon: new pokemonCore.pokemon.instantiate("074"),
                        level: 8,
                    }
                },
                {
                    pokemon: {
                        pokemon: new pokemonCore.pokemon.instantiate("074"),
                        level: 6,
                    }
                }
            ]
        },
        false,
        ["YOUNGSTER_JOSH would like to battle!"],
        ["I called you because I thought I could beat you..."],
        "left"
    ),
    new pokemonCore.npc(
        null,
        "YOUNGSTER_TOMMY",
        ["Did you just become a TRAINER? We're both beginners!"],
        null,
        null,
        null,
        [4, 8],
        {
            pokemon:[
                {
                    pokemon: {
                        pokemon: new pokemonCore.pokemon.instantiate("074"),
                        level: 11,
                    }
                },
            ]
        },
        false,
        ["YOUNGSTER_TOMMY would like to battle!"],
        ["I called you because I thought I could beat you..."],
        "right"
    ),
    new pokemonCore.npc(
        null,
        "ROXANNE",
        ["MY DICK IS ROCK HARD", "FAK YOU"],
        null,
        null,
        null,
        [6, 3],
        {
            pokemon:[
                {
                    pokemon: {
                        pokemon: new pokemonCore.pokemon.instantiate("074"),
                        level: 14,
                    }
                },
                {
                    pokemon: {
                        pokemon: new pokemonCore.pokemon.instantiate("299"),
                        level: 15,
                    }
                },
            ]
        },
        false,
        ["Challenged by GYM LEADER ROXANNE"],
        ["... ... ... ... ..."],
        "bottom",
        true
    ),
];

var pokemon = [];

var music = {
    ambient: "gym.mp3"
}