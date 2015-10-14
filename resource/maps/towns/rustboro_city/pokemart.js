var map = [
    [
        [1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,0,0,0,0,0,0,0,0,1],
        [1,1,[12, function(){pokemonCore.specialInteract.pokemart(items);}],0,0,0,0,0,0,0,1,1],
        [1,1,1,0,0,0,1,1,0,0,1,1],
        [0,0,0,0,0,0,1,1,0,0,1,1],
        [0,0,0,0,0,0,1,1,0,0,1,1],
        [0,0,0,8,0,0,0,0,0,0,0,1],
        [1,1,1,[7, function() { pokemonCore.maps.mapLastCoord[23] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(22);}],[7, function() { pokemonCore.maps.mapLastCoord[23] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(22);}],1,1,1,1,1,1,1]
    ],
    "towns/buildings/pokemart.png"
];

var npc = [
    new pokemonCore.npc(
        null,
        "cashier",
        [],
        null,
        null,
        null,
        [2, 4],
        false,
        false
    ),
];

var items = [
    pokemonCore.items.instantiate("pokeball"),
    pokemonCore.items.instantiate("potion"),
    pokemonCore.items.instantiate("superpotion"),
    pokemonCore.items.instantiate("antidote"),
    pokemonCore.items.instantiate("paralyzheal"),
    pokemonCore.items.instantiate("escaperope"),
    pokemonCore.items.instantiate("repel"),
    pokemonCore.items.instantiate("xspeed"),
    pokemonCore.items.instantiate("xattack"),
    pokemonCore.items.instantiate("xdefend")
];

var music = {
    ambient: "pokemart.mp3"
}