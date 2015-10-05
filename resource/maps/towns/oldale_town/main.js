var map = [
    [
        [1,1,1,1,1,1,1,1,[7, function() { pokemonCore.maps.mapLastCoord[7] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(9);}],[7, function() { pokemonCore.maps.mapLastCoord[7] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(9);}],[7, function() { pokemonCore.maps.mapLastCoord[7] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(9);}],[7, function() { pokemonCore.maps.mapLastCoord[7] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(9);}],1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,1,1],
        [1,1,0,6,1,1,1,1,0,0,0,0,0,1,1,1,1,0,1,1,1,1,1,1],
        [1,1,6,0,1,1,1,1,0,0,0,0,0,1,[7, function() { pokemonCore.maps.mapLastCoord[7] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(8);}],1,1,0,1,1,1,1,1,1],
        [1,1,0,6,1,[7, function() { pokemonCore.maps.mapLastCoord[7] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(11);}],1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
        [1,1,6,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,0,0,0,0,0,0,0,6,0,1,0,0,0,0,0,0,0,0,1,1,1,1],
        [[7, function() { pokemonCore.maps.mapLastCoord[7] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(10);}],0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [[7, function() { pokemonCore.maps.mapLastCoord[7] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(10);}],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
        [1,1,0,0,0,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,0,0,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,0,1,[7, function() { pokemonCore.maps.mapLastCoord[7] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(14);}],1,1,0,0,0,0,0,1,[7, function() { pokemonCore.maps.mapLastCoord[7] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(12);}],1,1,1,1,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,8,0,0,0,0,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,[7, function() { pokemonCore.maps.mapLastCoord[7] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(6);}],[7, function() { pokemonCore.maps.mapLastCoord[7] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(6);}],[7, function() { pokemonCore.maps.mapLastCoord[7] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(6);}],[7, function() { pokemonCore.maps.mapLastCoord[7] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(6);}],1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    "towns/oldale_town/main.png"
];

var npc = [
    new pokemonCore.npc(
        null,
        "1",
        ["I want to take a rest , so I'm saving my progress."],
        null,
        null,
        null,
        [17, 12],
        false,
        false
    ),
    new pokemonCore.npc(
        null,
        "w",
        ["Fak off"],
        null,
        null,
        null,
        [14, 15],
        false,
        false
    ),
    new pokemonCore.npc(
        null,
        "w",
        ["I finished sketching the footprints of a rare POK&eacute;MON.", "But it turns out they were only my own footprints..."],
        null,
        null,
        null,
        [9, 10],
        false,
        false
    ),
];

var music = {
    ambient: "oldaletown.mp3"
}