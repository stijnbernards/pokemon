var map = [
    [
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,0,0,1,[7, function(){pokemonCore.maps.mapLastCoord[1] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(2);}],1,1],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,1,0,0,0,0,0,0],
        [0,0,0,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,8,0,0],
        [1,1,1,1,1,1,1,1,[7, function(){ pokemonCore.maps.mapLastCoord[1] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(0);}],[7, function(){ pokemonCore.maps.mapLastCoord[1] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(0);}],1]
    ],
    "/towns/littleroot/player_home_f1.png"
];

var npc = [
    new pokemonCore.npc(
        [[9,8]],
        "mom",
        [
            "How are you doing, " + pokemonCore.gameChar.getName() + "?<br>You look a little tired.",
            "I think you should rest a bit."
        ],
        null,
        null,
        "towns/littleroot/npc/mom.png",
        [9, 8],
        false,
        false
    )
];

var onEnterFunc = function(){
    var dialog = [
        "Oh, yes. One of DAD's friends lives in town.",
        "PROF.BIRCH is his name.",
        "He lives right next door, so you should go over and introduce yourself."
    ];
    var dialogIndex = 0;

    createText(dialog[dialogIndex]);
    function createText(text){
        dialogIndex++;
        pokemonCore.utils.createDialog(text, null, function(){
            if(dialogIndex <= dialog.length) {
                $(".speech").remove();
                if(dialogIndex == 3){
                    $(document).unbind("keydown");
                    pokemonCore.player.bindMovement();
                }else{
                    createText(dialog[dialogIndex]);
                }
            }
        });
    }
}