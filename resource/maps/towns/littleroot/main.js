var map = [
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,[7, function(){pokemonCore.maps.mapLastCoord[0] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(6); }],[7, function(){pokemonCore.maps.mapLastCoord[0] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(6); }],1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
    [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
    [1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1],
    [1,1,1,1,1,0,0,1,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1],
    [1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,6,1,1,1,1,1],
    [1,1,1,1,1,6,0,1,1,1,[7, function() { pokemonCore.maps.mapLastCoord[0] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(1);}],1,[4,function(){alert("test")}],0,0,0,0,[4, function(){alert("test")}],1,[7, function(){ pokemonCore.maps.mapLastCoord[0] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(3); }],1,1,1,6,0,1,1,1,1,1],
    [1,1,1,1,1,0,6,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,6,1,1,1,1,1],
    [1,1,1,1,1,6,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,6,0,6,0,1,1,1,1,1],
    [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
    [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
    [1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,[4, function(){alert("test")}],0,0,0,0,1,1,1,1,1],
    [1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
    [1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
    [1,1,1,1,1,0,0,0,1,1,1,1,[7, function(){ pokemonCore.maps.mapLastCoord[0] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(5); }],1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
    [1,1,1,1,1,0,0,0,6,6,6,[4, function(){alert("test")}],0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,0,6,6,6,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ],
  "/towns/littleroot/main.jpg"
];
var npc = [
    new pokemonCore.npc(
        [
           [19,18],
           [16,14]
        ],
        "1",
        ["If you use a PC, you can store items and POK&eacute;MON.", "The power of science is staggering!"],
        null,
        null,
        null,
        [17, 14],
        false,
        false
    ),
    new pokemonCore.npc(
        [
            [21, 21],
            [16, 19]
        ],
        "2",
        ["PROF. BIRCH spends days in his LAB studying, then he'll suddenly go out in", "the wild to do more research...", "When does PROF. BIRCH spend time at home?"],
        null,
        null,
        null,
        [21, 21],
        false,
        false
    ),
    new pokemonCore.npc(
        [
            [24, 14],
            [21, 12]
        ],
        "3",
        ["You saved PROF. BIRCH!<br>I'm so glad!"],
        null,
        null,
        null,
        [24, 14],
        false,
        false
    )
];

var music = {
    ambient: "littleroot.mp3"
}