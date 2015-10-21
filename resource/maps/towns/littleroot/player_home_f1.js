var map = [
  [
    [1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,0,0,1,[7, function(){pokemonCore.maps.mapLastCoord[1] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(2);}],1,1],
    [0,0,0,0,0,0,0,0,8,0,0],
    [0,0,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,[7, function(){ pokemonCore.maps.mapLastCoord[1] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(0);}],[7, function(){ pokemonCore.maps.mapLastCoord[1] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(0);}],1]
  ],
  "towns/littleroot/player_home_f1.png"
];

var npc = [
    new pokemonCore.npc(
        [[3,7]],
        "mom",
        [
          //"How are you doing, " + pokemonCore.gameChar.getName() + "?<br>You look a little tired.",
          "I think you should rest a bit."
        ],
        null,
        null,
        "towns/littleroot/npc/mom.png",
        [3, 7],
        false,
        false
    )
];